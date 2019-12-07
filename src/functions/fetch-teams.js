export default async function fetchTeams({ username, offset = 0 }) {

  const teams = []

  const URI = username ?
    `https://api.twitch.tv/kraken/channels/${username}/teams?limit=100&offset=${offset}` :
    `https://api.twitch.tv/kraken/teams?limit=100&offset=${offset}`

  const res = await fetch(URI, {
    headers: {
      'Client-ID': process.env.VUE_APP_CLIENT_ID,
      'Accept': 'application/vnd.twitchtv.v5+json'
    }
  })

  if (res.status != 200) return teams

  const data = await res.json()

  data.teams.forEach(team => {
    if (username && team._id == 1) return // skip test team

    const createdAt = new Date(team.created_at)

    teams.push({
      id:          team._id,
      name:        team.name,
      displayName: team.display_name,
      created:     team.created_at,
      logo:        team.logo,
      banner:      team.banner,
      background:  team.background,
      info:        team.info,
    })
  })

  return teams

}