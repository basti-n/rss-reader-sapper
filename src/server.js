import sirv from 'sirv'
import express from 'express'
import compression from 'compression'
import * as sapper from '@sapper/server'
import apiRouter from './server/api'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

if (dev) {
	const server = express()

	server.use(express.json())

	server.use(compression({ threshold: 0 })).use(sirv('static', { dev }))

	server.use('/api', apiRouter())
	server.use(sapper.middleware())

	server.listen(PORT, (err) => {
		if (err) {
			console.error(err)
		}
		console.log(`Listening on Port ${PORT}`)
	})
}

export { sapper, apiRouter }
