export default async function fetchChannelFollowers(username, offset) {

  const users = []

  const res = await fetch(`https://api.twitch.tv/kraken/channels/${username}/follows?limit=100&offset=${offset}`, {
    headers: {
      'Client-ID': process.env.CLIENT_ID,
      'Accept': 'application/vnd.twitchtv.v5+json'
    }
  })

  if (res.status != 200) return users
  
  const data = await res.json()

  data.follows.forEach(follower => {
    users.push({
      id:          follower.user._id,
      name:        follower.user.name,
      displayName: follower.user.display_name,
      followers:   follower.user.followers,
      avatar:      follower.user.logo,
      isPartner:   follower.user.partner,
      title:       follower.user.status,
      views:       follower.user.views,
      category: {
        name: follower.user.game
      }
    })
  })
  
  return users
}