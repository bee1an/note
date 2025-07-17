import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'

const payload = {
	iss: 'admin',
	sub: '1234567890'
}

const privateKey = 'privateKey'

let token = jwt.sign(payload, privateKey)

const [baseHeader, basePayload] = token.split('.')

console.log(atob(baseHeader), atob(basePayload)) // 这里可以看出明文信息

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/login', (req, res) => {
	token = jwt.sign(payload, privateKey)
	const { username, password } = req.body
	if (username === 'admin' && password === '123456') {
		res.send({ token })
	} else {
		res.status(401).send({ code: 401, message: 'Unauthorized' })
	}
})

app.get('/api/verify', (req, res) => {
	const token = req.headers.authorization
	if (!token) {
		res.status(401).send({ code: 401, message: 'Unauthorized' })
		return
	}

	jwt.verify(token, privateKey, (err, decoded) => {
		if (err) {
			res.status(401).send({ code: 401, message: 'Unauthorized' })
			return
		}
		res.send('ok')
	})
})

app.listen(3000, () => {
	console.log('server is running')
})
