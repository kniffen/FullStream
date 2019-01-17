export default async function fetchCategories(offset = 0) {

  const categories = []
  const res = await fetch(`https://api.twitch.tv/kraken/games/top?limit=100&offset=${offset}`, {
    headers: {
      'Client-ID': process.env.CLIENT_ID,
      'Accept': 'application/vnd.twitchtv.v5+json'
    }
  })

  if (res.status != 200) return categories

  const data = await res.json()

  data.top.forEach(category => {
    categories.push({
      id:      category.game._id,
      name:    category.game.name,
      boxArt:  category.game.box.medium,
      viewers: category.viewers,
      streams: category.channels,
    })
  })

  return categories

}