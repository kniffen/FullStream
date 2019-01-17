export default async function followChannel(userID, channelID) {

    const res = await fetch(`https://api.twitch.tv/kraken/users/${userID}/follows/channels/${channelID}`, {
    method: 'PUT',
    headers: {  
      'Client-ID': process.env.CLIENT_ID,
      'Authorization': `OAuth ${localStorage.token}`,
      'Accept': 'application/vnd.twitchtv.v5+json'
    }
  })

  if (res.status == 401) {
    delete localStorage.token
    window.location.reload()
  } else if (!res.ok) {
    return false
  }

  return true

}