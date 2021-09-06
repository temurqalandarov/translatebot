const
  { Telegraf, Scenes: { Stage }, session } = require('telegraf'),
  { TOKEN, ENVIRONMENT, URL, PORT, CHANNEL_ID } = require('./config'),
  bot = new Telegraf(TOKEN),
  scenes = require('../scenes'),
  stage = new Stage(scenes),
  { get } = require('https'),
  app = require('express')()

bot
  .use(session())
  .use(stage.middleware())

bot.catch((err) => {
  const message = err.stack || err
  console.log(message, err)
  bot.telegram.sendMessage(CHANNEL_ID, message)
})

  ; (async () => {
    await require('./db')()
    if (ENVIRONMENT === 'prod') {
      bot.telegram.setWebhook(URL + '/bot' + TOKEN)
      app.use(bot.webhookCallback('/bot' + TOKEN))

      setInterval(() => {
        get(URL)
      }, 1500000)

      app.listen(PORT, () => console.log(`App listening at ${PORT}...`))
    }
    else if (ENVIRONMENT === 'dev')
      await bot.launch().then(() => console.log('App working...')).catch(e => console.log(e))
  })()

module.exports = bot