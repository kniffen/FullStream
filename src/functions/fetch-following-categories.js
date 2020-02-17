export default async function fetchFollowingCategories(channelID) {

  const categories = []
  const res = await fetch(`https://api.twitch.tv/kraken/users/${channelID}/follows/games?limit=100`, {
    headers: {
      'Client-ID': process.env.VUE_APP_CLIENT_ID,
      'Accept': 'application/vnd.twitchtv.v5+json'
    }
  })

  if (res.status != 200) return categories

  const data = await res.json()

  data.follows.forEach(category => {
    categories.push({
      id:      category.game._id,
      name:    category.game.name,
      boxArt:  category.game.box.medium
    })
  })

  return categories

}