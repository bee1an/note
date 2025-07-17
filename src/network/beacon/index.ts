import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/api/post', (req, res) => {
	res.send('hi')
})

app.listen(3000, () => {
	console.log('server is running')
})
