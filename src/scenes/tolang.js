const
  User = require('../models/user'),
  { Markup, Scenes: { BaseScene } } = require('telegraf'),
  keyboard = require('../lib/keyboard'),
  translate = require('@vitalets/google-translate-api'),
  langs = require('../lib/langs')

module.exports = new BaseScene('tolang')
  .hears('All languages🌍', ctx => {
    ctx.reply('Choose translation language👇', Markup.keyboard(langs()).oneTime().resize())
  })
  .hears('Close menu✖️', async ctx => {
    const user = await User.findOne({ id: ctx.message.chat.id })
    if (user?.lang) {
      ctx.reply('Enter the text to be translated📝', Markup.removeKeyboard())
      return ctx.scene.leave()
    }
    ctx.reply('Please choose translation language👇', keyboard)
  })
  .hears('Back⬅️', ctx => {
    ctx.reply('Choose translation language👇', keyboard)
  })
  .start(ctx => {
    ctx.reply('Choose translation language👇', keyboard)
    return ctx.scene.reenter()
  })
  .on('text', async ctx => {
    if (translate.languages.isSupported(ctx.message.text)) {
      const user = await User.findOne({ id: ctx.message.chat.id })
      if (user?.lang)
        await User.updateOne({ id: ctx.message.chat.id }, { lang: ctx.message.text })
      else
        await User.updateOne({ id: ctx.message.chat.id }, { $set: { lang: ctx.message.text } })
      ctx.session.lang = ctx.message.text
      ctx.reply('Saved✅\n\nEnter the text to be translated📝', Markup.removeKeyboard())
      return ctx.scene.leave()
    }
    ctx.reply('Not found❌\n\nUse the buttons to choose translation language👇', keyboard)
    return ctx.scene.reenter()
  })

