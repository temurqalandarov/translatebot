const
  translate = require('@vitalets/google-translate-api'),
  bot = require('../core/bot'),
  User = require('../models/user'),
  keyboard = require('../lib/keyboard')

bot.on('text', async ctx => {
  if (!ctx.session.user) {
    const user = await User.findOne({ id: ctx.message.chat.id })
    if (!user) {
      ctx.replyWithHTML(`Salom👋 <a href="tg://user?id=${ctx.message.from.id}">${ctx.message.from.first_name}</a>\n\nQaysi tilga tarjima qilamiz❓`, keyboard)
      return ctx.scene.enter('tolang')
    }
    ctx.session.user = user
  }
  translate(ctx.message.text, { to: translate.languages.getCode(ctx.session.user.lang) })
    .then(res => { return ctx.reply(res.text) })
    .catch(err => console.log(err))
})