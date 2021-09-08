const
  translate = require('@vitalets/google-translate-api'),
  bot = require('../core/bot'),
  User = require('../models/user')

let
  lang,
  str

bot.on('inline_query', async ctx => {
  if (!lang) {
    const user = await User.findOne({ id: ctx.from.id })
    lang = user?.lang
  }
  if (lang)
    str = "Click to change the translation language"
  if (lang && ctx.inlineQuery.query) {
    const tr = await translate(ctx.inlineQuery.query, { to: translate.languages.getCode(lang) })

    var result = [{
      type: 'article',
      id: ctx.inlineQuery.id,
      title: 'from ' + translate.languages[tr.from.language.iso] + ' to ' + lang,
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
      description: tr.text,
      thumb_url: "https://i.pinimg.com/originals/15/ef/2f/15ef2f2fa24e59c44cec1204692104fd.jpg",
      thumb_width: 100,
      thumb_height: 100
    }]
  }
  await ctx.answerInlineQuery(result, {
    switch_pm_text: str || "Click to choose translation language",
    switch_pm_parameter: 'test'
  })
})