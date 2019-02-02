export default async function follow({ userID, username, channelID, categoryName }) {

  let uri = channelID ? 
    `https://api.twitch.tv/kraken/users/${userID}/follows/channels/${channelID}` :
    `https://api.twitch.tv/api/users/${username}/follows/games/follow?name=${categoryName}`

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