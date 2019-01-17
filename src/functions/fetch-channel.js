export default async function fetchChannel(username) {

  const res = await fetch(
    `https://api.twitch.tv/kraken/channels/${username}`,
    {
      headers: {
        'Authorization': `OAuth ${localStorage.token}`
    }
  })

  if (res.status == 400) {
    window.location.reload()
  } else if (res.status != 200) {
    return
  }

  const data = await res.json()

  return {
    id:          data._id,
    name:        data.name,
    displayName: data.display_name,
    followers:   data.followers,
    avatar:      data.logo,
    isPartner:   data.partner,
    title:       data.status,
    views:       data.views,
    created:     data.created_at,
    category:    {name: data.game},
  }

}