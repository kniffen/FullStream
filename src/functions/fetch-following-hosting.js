export default async function fetchFollowingHosting(username) {

  const channels = []

  const res = await fetch(`https://api.twitch.tv/api/users/${username}/followed/hosting?limit=100`, {
    headers: {
      'Client-ID': process.env.CLIENT_ID,
      'Accept': 'application/vnd.twitchtv.v5+json'
    }
  })

  if (res.status != 200) return channels

  const data = await res.json()

  data.hosts.forEach(host => {
    const index = channels.findIndex(channel => channel.id == host.target.channel.id)

    if (index >= 0) {
      channels[index].hosts.push({
        id:          host.id,
        name:        host.name,
        displayName: host.display_name,
        avatar:      host.logo
      })
    } else {
      channels.push({
        id:          host.target.channel.id,
        name:        host.target.channel.name,
        displayName: host.target.channel.display_name,
        avatar:      host.target.channel.logo,
        thumbnail:   host.target.preview_urls.template,
        title:       host.target.title,
        viewers:     host.target.viewers,
        category: {
          name: host.target.meta_game
        },
        hosts: [
          {
            id:          host.id,
            name:        host.name,
            displayName: host.display_name,
            avatar:      host.logo
          }
        ]
      })
    }
  })

  return channels

}