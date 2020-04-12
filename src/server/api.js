import express from 'express'
import Parser from 'rss-parser'

const rssList = new Set()

const parser = new Parser()

export default (server) => {
	const router = express.Router()

	router.post('/add', (req, res) => {
		const { url } = req.body

		if (rssList.has(url)) {
			return res.send({ added: false, rssList: [...rssList] })
		}

		rssList.add(url)
		return res.send({ added: true, rssList: [...rssList] })
	})

	router.post('/delete', (req, res) => {
		const { url } = req.body

		if (rssList.has(url)) {
			rssList.delete(url)
			return res.send({ deleted: true, rssList: [...rssList] })
		}

		return res.send({ deleted: false, rssList: [...rssList] })
	})

	router.get('/list', (_, res) => {
		res.send({ rssList: [...rssList] })
	})

	router.get('/refresh', async (req, res, next) => {
		try {
			let result = []
			for (const url of rssList) {
				const feed = await parser.parseURL(url)
				result.push(...feed.items)
			}

            result = result.sort((a, b) => (a.isoDate > b.isoDate ? 1 : 0))
            
			res.send({ result })
		} catch (err) {
			console.log(err)
			next(err)
		}
	})

	return router
}
