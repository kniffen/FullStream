export default async function fetchFollowingUsers(username, offset = 0) {

  const users = []

  const res = await fetch(
    `https://api.twitch.tv/kraken/users/${username}/follows/channels?limit=100&offset=${offset}`,
    {
      headers: {
        'Client-ID': process.env.CLIENT_ID
      }
    })

  if (res.status != 200) return users

  const data = await res.json()

  data.follows.forEach(user => {
    users.push({
      id:            user.channel._id,
      name:          user.channel.name,
      displayName:   user.channel.display_name,
      followers:     user.channel.followers,
      avatar:        user.channel.logo,
      isPartner:     user.channel.partner,
      title:         user.channel.status,
      views:         user.channel.views,
      followedSince: user.created_at,
      category: {
        name: user.channel.game
      }
    })
  })

  return users
  
}