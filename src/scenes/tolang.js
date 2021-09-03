const bot = require('../core/bot')
const
  User = require('../models/user'),
  { Markup, Scenes: { BaseScene } } = require('telegraf'),
  keyboard = require('../lib/keyboard'),
  translate = require('@vitalets/google-translate-api'),
  langs = require('../lib/langs')

module.exports = new BaseScene('tolang')
  .hears('Barcha tillar🌍', ctx => {
    ctx.reply('Qaysi tilga tarjima qilamiz❓', Markup.keyboard(langs(translate.languages)))
  })
  .hears('Orqaga⬅️', ctx => {
    ctx.reply('Qaysi tilga tarjima qilamiz❓', keyboard)
  })
  .hears('Chiqish↩️', async ctx => {
    const user = await User.findOne({ id: ctx.message.chat.id })
    if (user) {
      ctx.reply('Tarjima qilmoqchi bo\'lgan matningizni kiriting📝', Markup.removeKeyboard())
      return ctx.scene.leave()
    }
    ctx.reply('Qaysi tilga tarjima qilamiz❓', keyboard)
  })
  .on('text', async ctx => {
    if (translate.languages.isSupported(ctx.message.text)) {
      const user = await User.findOne({ id: ctx.message.chat.id })
      if (user)
        ctx.session.user = await User.updateOne({ id: ctx.message.chat.id }, { lang: ctx.message.text })
      else {
        ctx.session.user = await User.create({ id: ctx.message.chat.id, lang: ctx.message.text })
<<<<<<< HEAD
        ctx.telegram.sendMessage('-1001140152529', `<a href="tg://user?id=${ctx.message.from.id}">${ctx.message.from.first_name}</a>\nTil: ${ctx.message.text}`, { parse_mode: 'HTML' })
=======
        bot.telegram.sendMessage('-1001140152529', `<a href="tg://user?id=${ctx.message.chat.id}">${ctx.message.from.first_name}</a>\nTil: ${ctx.message.text}`, { parse_mode: 'HTML' })
>>>>>>> 49604445d2de044c1750ebff12b080257fcd70ba
      }
      ctx.reply('Saqlandi✅\n\nTarjima qilmoqchi bo\'lgan matningizni kiriting📝', Markup.removeKeyboard())
      return ctx.scene.leave()
    }
    ctx.reply('Bunday til topilmadi❌\n\nTilni to\'g\'riligini tekshiring yoki tugmalardan foydalaning👇', keyboard)
    return ctx.scene.enter('tolang')
  })

