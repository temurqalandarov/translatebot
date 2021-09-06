const
  bot = require('../core/bot'),
  User = require('../models/user')

bot.on('my_chat_member', async ctx => {
  if (ctx.update.my_chat_member.new_chat_member.status === 'kicked')
    await User.updateOne({ id: ctx.update.my_chat_member.from.id }, { status: 'kicked' })
})