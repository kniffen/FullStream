export default async function fetchFollowingUsers(channelID, offset = 0) {

  const users = {pages: 0, items: []}

  const res = await fetch(
    `https://api.twitch.tv/kraken/users/${channelID}/follows/channels?limit=100&offset=${offset}`,
    {
      headers: {
        'Client-ID': process.env.VUE_APP_CLIENT_ID,
        'Accept': 'application/vnd.twitchtv.v5+json'
      }
    })

  if (res.status != 200) return users

  const data = await res.json()

  users.pages = Math.ceil(data._total / 100) || 0

  users.items = data.follows.map(user => ({
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
  }))

  return users
  
}