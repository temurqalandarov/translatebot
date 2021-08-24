const
  { Telegraf, session } = require('telegraf'),
  { TOKEN, ENVIRONMENT, URL, PORT } = require('./config'),
  bot = new Telegraf(TOKEN),
  https = require('https'),
  app = require('express')(),
  translate = require('@vitalets/google-translate-api')

bot
  .use(session())

  .start(ctx => ctx.reply('Salom'))

  .on('text', ctx => {
    translate(ctx.message.text, { to: 'uz' }).then(res => {
      ctx.reply(res.text)
      console.log(res.from.language.iso)
    }).catch(err => {
      ctx.reply(err)
    })
  })

  .on('inline_query', async ctx => {
    if (ctx.inlineQuery.query[ctx.inlineQuery.query.length - 1] === '@' && ctx.inlineQuery.query.length) {
      let i = 1
      console.log(ctx.inlineQuery.from)
      const tr = await translate(ctx.inlineQuery.query.slice(0, ctx.inlineQuery.query.length - 1), { to: 'uz' }).then(res => {
        return res
      }).catch(err => {
        console.log(err)
      })

      var result = [{
        type: 'article',
        id: i++,
        title: translate.languages[tr.from.language.iso],
        input_message_content: {
          message_text: tr.text + '\n\n@beta_newbot'
        },
        // reply_markup: {
        //   inline_keyboard: [
        //     [
        //       {
        //         text: 'Translate',
        //         url: 'https://t.me/beta_newbot'
        //       }
        //     ]
        //   ]
        // },
        description: tr.text
      }]
    }
    await ctx.answerInlineQuery(result, {
      cache_time: 10 ** 9,
      switch_pm_text: "Ko'proq imkoniyatlar",
      switch_pm_parameter: 'test'
    })
  })

if (ENVIRONMENT === 'prod') {

  bot.telegram.setWebhook(`${URL}/bot${TOKEN}`)
  app.use(bot.webhookCallback(`/bot${TOKEN}`))

  setInterval(() => {
    https.get(URL)
  }, 1500000)

  app.listen(PORT, () => console.log(`I am listening on port ${PORT}...`))
}
else if (ENVIRONMENT === 'dev')
  bot.launch().then(() => console.log('I am working...')).catch(e => console.log(e))

module.exports = bot