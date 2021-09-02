const
  bot = require('../core/bot'),
  User = require('../models/user'),
  keyboard = require('../lib/keyboard')

bot.start(async ctx => {
  if (!ctx.session.user) {
    const user = await User.findOne({ id: ctx.message.chat.id })
    ctx.session.user = user
  }
  if (ctx.session.user) {
    ctx.replyWithHTML(`Qaysi tilga tarjima qilamiz❓\n\nHozirgi til: <b>${ctx.session.user.lang}</b>`, keyboard)
  }
  else
    ctx.replyWithHTML(`Salom👋 <a href="tg://user?id=${ctx.message.from.id}">${ctx.message.from.first_name}</a>\n\nQaysi tilga tarjima qilamiz❓`, keyboard)
  return ctx.scene.enter('tolang')
})