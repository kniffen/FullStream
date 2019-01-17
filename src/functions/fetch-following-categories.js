export default async function fetchFollowingCategories(username) {

  const categories = []
  const res = await fetch(`https://api.twitch.tv/api/users/${username}/follows/games?limit=100`, {
    headers: {
      'Client-ID': process.env.CLIENT_ID,
      'Accept': 'application/vnd.twitchtv.v5+json'
    }
  })

  if (res.status != 200) return categories

  const data = await res.json()

  data.follows.forEach(category => {
    categories.push({
      id:      category._id,
      name:    category.name,
      boxArt:  category.box.medium,
      viewers: category.popularity,
    })
  })

  return categories

}