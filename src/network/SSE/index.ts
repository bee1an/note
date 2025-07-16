import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

const text = Array.from({ length: 100 }, () =>
	String.fromCharCode(Math.floor(Math.random() * 26) + 97)
).join('')

app.get('/api/getText', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Content-Type', 'text/event-stream')

	let i = 0
	const interval = setInterval(() => {
		res.write(`data: ${text.slice(i, i + 1)}\n\n`)
		i += 1
		if (i >= text.length) {
			clearInterval(interval)
			res.end()
		}
	}, 200)
})

app.listen(3000, () => {
	console.log('server is running')
})
