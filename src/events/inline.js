const
  translate = require('@vitalets/google-translate-api'),
  bot = require('../core/bot'),
  User = require('../models/user')

bot.on('inline_query', async ctx => {
  const user = await User.findOne({ id: ctx.from.id })
  let str
  if (user && ctx.inlineQuery.query) {
    str = "Tarjima tilini o'zgartirish"
    const tr = await translate(ctx.inlineQuery.query, { to: translate.languages.getCode(user.lang) })
      .then(res => { return res }).catch(err => console.log(err))
    var result = [{
      type: 'article',
      id: ctx.inlineQuery.id,
      title: user.lang,
      input_message_content: {
        message_text: tr.text
      },
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Translator Bot',
              url: 'https://t.me/tranlatebot'
            }
          ]
        ]
      },
      description: tr.text
    }]
  }
  await ctx.answerInlineQuery(result, {
    switch_pm_text: str || "Kirish",
    switch_pm_parameter: 'test'
  })
})