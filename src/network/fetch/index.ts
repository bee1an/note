import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/getText', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.send('bee '.padEnd(10000000, 'bee '))
})

app.post('/api/postApi', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.send({ hi: 'hello world ' + req.body.name })
})

app.listen(3000, () => {
	console.log('server is running')
})
