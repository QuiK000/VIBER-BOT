const VIBER_BOT = require('viber-bot').Bot
const BOT_EVENTS = require('viber-bot').Events

const PICTURE_MESSAGE = require('viber-bot').Message.Picture

const winston = require('winston')
const TO_YAML = require('winston-console-formatter')

const TEXT_MESSAGE = require('viber-bot').Message.Text

const express = require('express')
const app = express()

const BOT = new VIBER_BOT({
	authToken: '4cf0545fb9a7d192-d48b65bda73602de-e4117b39415ac59e',
	name: 'quikkkk',
	avatar: 'https://images.pexels.com/videos/3045163/free-video-3045163.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500'
})

const https = require('https')
const PORT = process.env.PORT || 8080

const WEB_HOOK_URL = 'https://webhook.site/d7b3e962-5e70-4e91-8abb-7f5586dbd4be'

BOT.on(BOT_EVENTS.MESSAGE_RECEIVED, (message, response) => {
	response.send(new PICTURE_MESSAGE('http://i.imgur.com/hAUIxtB.gif'))
})

app.use('/viber/webhook', BOT.middleware())

app.listen(PORT, () => {
	console.log(`Application running on port: ${PORT}`)

	BOT.setWebhook(`https://9776721dbed0.ngrok.io/viber/webhook`).catch(e => {
		console.log('Can not set webhook on following server. Is it running?')
		console.log(e)

		process.exit(1)
	})
})