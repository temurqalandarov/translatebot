const
  bot = require('../core/bot'),
  User = require('../models/user'),
  keyboard = require('../lib/keyboard'),
  { CHANNEL_ID } = require('../core/config')

bot.start(async ctx => {
  const user = await User.findOne({ id: ctx.message.chat.id })
  if (user?.lang) {
    ctx.replyWithHTML(`Choose to change the translation language👇\n\nCurrent language: <b>${user.lang}</b>`, keyboard)
  }
  else if (user) {
    ctx.reply(`Choose translation language👇`, keyboard)
  }
  else {
    ctx.replyWithHTML(`Hi👋 <a href="tg://user?id=${ctx.message.chat.id}">${ctx.message.from.first_name}</a>\n\nChoose translation language👇`, keyboard)
    await User.create({ id: ctx.message.chat.id, status: 'member' })
    ctx.telegram.sendMessage(`${CHANNEL_ID}`, `${await User.countDocuments()}. <a href="tg://user?id=${ctx.message.chat.id}">New user</a>`, { parse_mode: 'HTML' })
  }
  if (user?.status === "kicked")
    await User.updateOne({ id: ctx.message.chat.id }, { status: 'member' })
  return ctx.scene.enter('tolang')
})