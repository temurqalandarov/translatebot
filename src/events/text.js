const
  translate = require('@vitalets/google-translate-api'),
  bot = require('../core/bot'),
  User = require('../models/user')

bot.on('text', async ctx => {
  if (!ctx.session?.lang) {
    const user = await User.findOne({ id: ctx.message.chat.id })
    if (!user || !user?.lang) {
      return ctx.reply('Restart the bot👉 /start')
    }
    ctx.session.lang = user?.lang
  }
  const result = await translate(ctx.message.text, { to: translate.languages.getCode(ctx.session?.lang) })
  ctx.reply(result.text, {
    reply_markup: {
      inline_keyboard: [[{
        text: 'Share',
        url: `https://t.me/share/url?url=${ctx.message.text}`
        // switch_inline_query: ctx.message.text
      }]]
    }
  })
})