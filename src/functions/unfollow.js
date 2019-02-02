export default async function unfollow({ userID, username, channelID, categoryName }) {

  let uri = channelID ? 
    `https://api.twitch.tv/kraken/users/${userID}/follows/channels/${channelID}` :
    `https://api.twitch.tv/api/users/${username}/follows/games/unfollow?name=${categoryName}`

  const res = await fetch(uri, {
    method: 'DELETE',
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