const VIBER_BOT = require('viber-bot').Bot
const BOT_EVENTS = require('viber-bot').Events

const PICTURE_MESSAGE = require('viber-bot').Message.Picture
const AXIOS = require('axios')

const winston = require('winston')
const TO_YAML = require('winston-console-formatter')

const TEXT_MESSAGE = require('viber-bot').Message.Text
const REQUESTS = require('request')

const express = require('express')
const app = express()

const BOT = new VIBER_BOT({
	authToken: '4cf0545fb9a7d192-d48b65bda73602de-e4117b39415ac59e',
	name: 'quikkkk',
	avatar: 'https://images.pexels.com/videos/3045163/free-video-3045163.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500'
})

const https = require('https')
const PORT = process.env.PORT || 8080

const WEB_HOOK_URL = 'https://ef6479c63d1c.ngrok.io'
const KEY = '3ed655ba1ee90098297376ea7d45c2e8'

const COUNTRY = 'Kiev'
const CUSTOM_REGEXP = new RegExp(COUNTRY)

AXIOS.get(`http://api.openweathermap.org/data/2.5/weather?q=${COUNTRY},uk&APPID=${KEY}`).then(data => {
	BOT.onTextMessage(CUSTOM_REGEXP, (message, response) => {
		return Promise.resolve(response.send(new TEXT_MESSAGE(data)))
	})
})


app.use('/viber/webhook', BOT.middleware())

app.listen(PORT, () => {
	console.log(`Application running on port: ${PORT}`)

	BOT.setWebhook(`${WEB_HOOK_URL}/viber/webhook`).catch(e => {
		console.log('Can not set webhook on following server. Is it running?')

		process.exit(1)
	})
})