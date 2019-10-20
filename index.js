const data = require('./phrases.json')
const colors = require('colors')
//SUCC = SUCC.sort((a, b) => (a.count < b.count) ? 1 : -1)
//FAIL = FAIL.sort((a, b) => (a.count < b.count) ? 1 : -1)

TOTAL = 0
for (let k in data) {
  TOTAL += data[k].Town + data[k].Mafia + data[k].Neutral
}
console.log(TOTAL); process.exit()

let phrases = []
for (let phrase in data) {
  let entry = data[phrase]
  let Town = entry.Town
  let Mafia = entry.Mafia 
  let Neutral = entry.Neutral
  let Total = Town + Mafia + Neutral
  if (Total < 100 || phrase == '') { continue }
  let percTown = parseFloat(((Town / Total) * 100).toFixed(0))
  let percMafia = parseFloat(((Mafia / Total) * 100).toFixed(0))
  let percNeutral = parseFloat(((Neutral / Total) * 100).toFixed(0))
  let obj = {
    phrase: phrase,
    Total: Total,
    Town: Town,
    Mafia: Mafia,
    Neutral: Neutral,
    NotTown: Mafia + Neutral,
    percTown: percTown,
    percMafia: percMafia,
    percNeutral: percNeutral,
    percNotTown: percMafia + percNeutral
  }
  phrases.push(obj)
}

function print(obj) {
  console.log(`${obj.phrase}`.yellow, `${obj.percTown}`.cyan, `${obj.percNotTown}`.magenta)
  console.log(`(${obj.Total})`.white, `${obj.percTown}`.green, `${obj.percMafia}`.red, `${obj.percNeutral}`.white)
}

function maxes(prop) {
  return phrases.sort((a, b) => (a[prop] < b[prop]) ? 1 : -1)
}

let arr = maxes('percTown') // sorted by likelihood of coming from Town
for (let i = 0; i < arr.length; i++) {
  print(arr[i])
}