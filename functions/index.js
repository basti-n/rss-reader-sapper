const functions = require('firebase-functions')
const express = require('express')

const { sapper, apiRouter } = require('./__sapper__/build/server/server')

const app = express().use(express.json()).use('/api', apiRouter).use(sapper.middleware())

exports.ssr = functions.https.onRequest(app)
