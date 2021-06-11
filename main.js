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
      status: `It has been ${formatDate()} since the @BelRedDevils won their last trophy, the 1920 Olympic Games in Antwerp, Belgium\n#BEL #DEVILTIME #EURO2020 #COMEONBELGIUM 🇧🇪`,
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
  const totalDays = now.diff(lastWin, 'days').toLocaleString('en-US')
  const y = now.diff(lastWin, 'years')
  const m = now.subtract(y, 'years').diff(lastWin, 'months')
  const d = now.subtract(y, 'years').subtract(m, 'months').diff(lastWin, 'days')

  let res = `${totalDays} days (${y} years`
  if (m) res += `, ${m} month${m > 1 ? 's' : ''}`
  if (d) res += `, ${d} day${d > 1 ? 's' : ''}`
  res += ')'

  return res
}

const getBrusselsId = async () => {
  const location = await client.get('geo/search', {
    lat: 50.846799073627025,
    long: 4.3524356783587,
    granularity: 'city',
    max_results: 10,
  })

  console.log(location.result.places)
}

main()
