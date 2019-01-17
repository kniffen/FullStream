export default async function fetchTeam(username) {

  const users = []
  
  const res = await fetch(`https://api.twitch.tv/kraken/teams/${username}`, {
    headers: {
      'Client-ID': process.env.CLIENT_ID,
      'Accept': 'application/vnd.twitchtv.v5+json'
    }
  })

  if (res.status != 200) return users

  const data = await res.json()

  data.users.forEach(user => {
    users.push({
      id:          user._id,
      name:        user.name,
      displayName: user.display_name,
      avatar:      user.logo,
      isPartner:   user.partner,
      title:       user.status,
      followers:   user.followers,
      views:       user.views,
      category:    {name: user.game},
    })
  })

  return users

}