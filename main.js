require('dotenv').config()
const Twitter = require('twitter-lite')
const dayjs = require('dayjs')

const client = new Twitter({
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

const main = async () => {
  try {
    const body = {
      status: `Cela fait ${formatDate()} que les @BelRedDevils ont gagné leur dernier trophée, les Jeux Olympiques 1920 d'Anvers, en Belgique\n#BEL #DEVILTIME #COMEONBELGIUM 🇧🇪`,
      place_id: '0653bb913c88c1ea',
    }
    await client.post('statuses/update', body)
  } catch (e) {
    console.log(e)
  }
}

const formatDate = () => {
  const now = dayjs()
  const lastWin = dayjs('1920-09-02')
  const totalDays = now.diff(lastWin, 'days').toLocaleString('fr-FR')
  const y = now.diff(lastWin, 'years')
  const m = now.subtract(y, 'years').diff(lastWin, 'months')
  const d = now.subtract(y, 'years').subtract(m, 'months').diff(lastWin, 'days')

  let res = `${totalDays} jours (${y} ans`
  if (m) res += `, ${m} mois`
  if (d) res += `, ${d} jour${d > 1 ? 's' : ''}`
  res += ')'

  return res
}

main()
