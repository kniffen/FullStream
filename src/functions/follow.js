export default async function follow(userID, channelID) {

  let uri = `https://api.twitch.tv/kraken/users/${userID}/follows/channels/${channelID}`

  const res = await fetch(uri, {
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
  }

  return res.ok

}