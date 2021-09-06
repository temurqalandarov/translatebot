const translate = require('@vitalets/google-translate-api')

module.exports = () => {
  const vals = Object.values(translate.languages)
  vals.shift()
  let arr = []
  for (let i = 0; i < vals.length - 2; i++) {
    if (!(i % 3))
      arr.push([])
    arr[parseInt(i / 3)].push(vals[i])
  }
  arr.push(['Back⬅️'])
  return arr
}


