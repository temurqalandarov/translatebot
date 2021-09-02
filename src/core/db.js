const
  { connect } = require('mongoose'),
  { DB_USER, DB_PASS } = require('./config')

module.exports = async () => {
  await connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.njuat.mongodb.net/tranlate?retryWrites=true&w=majority`)
    .then(() => console.log('Connected to the database...'))
    .catch(err => console.log(err))
}