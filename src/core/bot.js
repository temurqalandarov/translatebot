const
  { Telegraf, Scenes: { Stage }, session } = require('telegraf'),
  { TOKEN, ENVIRONMENT, URL, PORT } = require('./config'),
  bot = new Telegraf(TOKEN),
  scenes = require('../scenes'),
  stage = new Stage(scenes),
  { get } = require('https'),
  app = require('express')(),
  User = require('../models/user')

bot
  .use(session())
  .use(stage.middleware())


  ; (async () => {
    const data = await User.find()
    for (let i = 0; i < data.length; i++) {
      bot.telegram.sendMessage('-1001140152529', `<a href="tg://user?id=${date[i].id}">Test</a>\nTil: ${data[i].lang}`, { parse_mode: 'HTML' })
    }
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