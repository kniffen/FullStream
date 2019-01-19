export default async function followChannel(userID, channelID) {

    const res = await fetch(`https://api.twitch.tv/kraken/users/${userID}/follows/channels/${channelID}`, {
    method: 'PUT',
    headers: {  
      'Client-ID': process.env.CLIENT_ID,
      'Authorization': `OAuth ${localStorage.token}`,
      'Accept': 'application/vnd.twitchtv.v5+json'
    }
  })

  if ([400, 401].includes(res.status)) {
    delete localStorage.token
    document.body.classList.add('show-login')
    return false
  } else if (!res.ok) {
    return false
  }

  return true

}