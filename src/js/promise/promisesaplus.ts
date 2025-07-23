// 构造器参数
type ConstructorParam<T> = (resolve: (value: T) => any, reject: (reason?: any) => void) => void

// promise 状态
enum PromiseState {
	PENDING = 'pending',
	FULFILLED = 'fulfilled',
	REJECTED = 'rejected'
}

// 运行微任务, 兼容性考虑
const runMicrotask = (callback: Function) => {
	if (typeof queueMicrotask === 'function') {
		queueMicrotask(() => callback())
	}
	// 判断是不是在node环境
	else if (typeof process === 'object' && typeof process.nextTick === 'function') {
		process.nextTick(() => callback())
	}
	// 借用兼容性更好的 MutationObserver 的特性
	else if (typeof MutationObserver === 'function') {
		const text = document.createTextNode('')
		const observer = new MutationObserver(() => {
			callback()
			observer.disconnect()
		})
		observer.observe(text, { characterData: true })
		text.data = '1' // 触发 MutationObserver
	}
	// 最后使用 setTimeout 作为兜底
	else {
		setTimeout(() => callback())
	}
}

// 判断是否是 Promise-like 对象
const isPromiseLike = (value: any): value is PromiseLike<any> => {
	return typeof value?.then === 'function'
}

class ToyPromise<T = any> {
	static all(...args: any[]) {
		return new ToyPromise((resolve, reject) => {
			args = [...args] // 将可迭代对象装换为数组

			if (args.length === 0) {
				resolve([])
				return
			}

			const values: any[] = []
			let count = 0

			let rejected = false
			for (let i = 0; i < args.length; i++) {
				const p = ToyPromise.resolve(args[i])
				p.then(
					(res) => {
						if (rejected) return
						count++
						values[i] = res // 这里不能使用 push, 异步完成顺序可能不一致
						if (count === args.length) {
							resolve(values)
						}
					},
					(err) => {
						reject(err)
						rejected = true
					}
				)
			}
		})
	}

	static allSettled(...args: any[]) {
		return new ToyPromise((resolve) => {
			args = [...args] // 将可迭代对象装换为数组

			if (args.length === 0) {
				resolve([])
				return
			}

			const values: any[] = []
			let count = 0

			for (let i = 0; i < args.length; i++) {
				const p = ToyPromise.resolve(args[i])
				p.then(
					(res) => {
						values[i] = { status: PromiseState.FULFILLED, value: res }
					},
					(err) => {
						values[i] = { status: PromiseState.REJECTED, reason: err }
					}
				).finally(() => {
					count++
					if (count === args.length) {
						resolve(values)
					}
				})
			}
		})
	}

	static any(...args: any[]) {
		return new ToyPromise((resolve, reject) => {
			args = [...args] // 将可迭代对象装换为数组

			if (args.length === 0) {
				reject(new Error('The iterable passed is empty'))
				return
			}

			let count = 0

			let fulfilled = false
			for (let i = 0; i < args.length; i++) {
				const p = ToyPromise.resolve(args[i])
				p.then(
					(res) => {
						resolve(res)
						fulfilled = true
					},
					() => {
						if (fulfilled) return
						count++
						if (count === args.length) {
							reject(new AggregateError('All promises were rejected'))
						}
					}
				)
			}
		})
	}

	static race(...args: any[]) {
		return new ToyPromise((resolve, reject) => {
			args = [...args] // 将可迭代对象装换为数组

			for (let i = 0; i < args.length; i++) {
				const p = ToyPromise.resolve(args[i])
				p.then(resolve, reject)
			}
		})
	}

	static reject(reason: any) {
		return new ToyPromise((resolve, reject) => reject(reason))
	}

	static resolve(value: any) {
		if (value instanceof ToyPromise || value instanceof Promise) return value

		return new ToyPromise((resolve, reject) => {
			if (isPromiseLike(value)) {
				return value.then(resolve, reject)
			}

			resolve(value)
		})
	}

	static try(fn: Function, ...args: any[]) {
		return new ToyPromise((resolve) => resolve(fn(...args)))
	}

	static withResolver() {
		let resolve, reject
		const promise = new Promise((res, rej) => {
			resolve = res
			reject = rej
		})

		return { promise, resolve, reject }
	}

	/** promise 状态 */
	private _state: PromiseState = PromiseState.PENDING

	/** promise 完成时的值 */
	private _value: any

	/** 收集回调 */
	private _callbacks: Function[] = []

	constructor(executor: ConstructorParam<T>) {
		const resolve = (value: T) => {
			this._value = value
			this._setState(PromiseState.FULFILLED)
		}

		const reject = (reason?: any) => {
			this._value = reason
			this._setState(PromiseState.REJECTED)
		}

		try {
			executor(resolve, reject)
		} catch (error) {
			reject(error)
		}
	}

	/** 切换状态 */
	private _setState(state: PromiseState) {
		if (this._state !== PromiseState.PENDING) return

		this._state = state

		this._executeCallbacks()
	}

	/** 执行任务 */
	private _executeCallbacks() {
		// 到微队列去执行
		runMicrotask(() => {
			this._callbacks.forEach((callback) => callback())
			this._callbacks = [] // 清空回调
		})
	}

	private _hasCatch = false
	then(onFulfilled?: (value: any) => void, onRejected?: (reason: any) => void): ToyPromise {
		if (typeof onRejected === 'function') {
			this._hasCatch = true
		}

		const promise = new ToyPromise((resolve, reject) => {
			this._callbacks.push(() => {
				try {
					const cb = this._state === PromiseState.FULFILLED ? onFulfilled : onRejected

					if (this._state === PromiseState.REJECTED && !cb) {
						// 如果是 rejected 状态, 且没有 onRejected 回调, 直接抛出错误
						throw this._value
					}

					const value = typeof cb === 'function' ? cb(this._value) : this._value

					if (isPromiseLike(value)) {
						// 到微任务去吸收状态, 不知道为什么要到微任务, promise A+ 规范并没有要求, 放入微队列是v8做的处理
						runMicrotask(() => value.then(resolve, reject))
					} else {
						resolve(value)
					}
				} catch (error) {
					reject(error)

					// 如果是 rejected 状态, 需要检查是否有 catch
					if (!promise._hasCatch) {
						throw new Error('without catch block')
					}
				}
			})

			// 如果promise已经同步完成或者拒绝, 需要立即执行回调
			this._state !== PromiseState.PENDING && this._executeCallbacks()
		})

		return promise
	}

	catch(onRejected: (reason: any) => void): ToyPromise {
		return this.then(undefined, onRejected)
	}

	finally(onFinally: () => void): ToyPromise {
		return this.then(
			(res) => {
				onFinally()
				// 保持返回值一致
				return res
			},
			(rea) => {
				onFinally()
				// 保持返回值并且状态一致
				throw rea
			}
		)
	}
}

const p1 = new ToyPromise<void>((resolve) => {
	console.log(1)
	resolve()
})
	.then((res) => {
		console.log(3)
		return new ToyPromise<void>((resolve) => {
			resolve()
		})
	})
	.then(() => {
		console.log(7)
	})

const p2 = new ToyPromise<void>((resolve) => {
	console.log(2)
	resolve()
})
	.then((res) => {
		console.log(4)
	})
	.then(() => {
		console.log(5)
	})
	.then(() => {
		console.log(6)
	})
	.then(() => {
		console.log(8)
	})

const p3 = new ToyPromise<void>((resolve, reject) => {
	reject()
}).then(() => {
	console.log('success')
})
