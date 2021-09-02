module.exports = (object) => {
  const vals = Object.values(object)
  vals.shift()
  let arr = []
  for (let i = 0; i < vals.length - 2; i++) {
    if (!(i % 3))
      arr.push([])
    arr[parseInt(i / 3)].push(vals[i])
  }
  arr.push(['Orqaga⬅️'])
  return arr
}


