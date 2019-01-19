export default async function checkFollowStatus(userID, channelID) {
  
  const res = await fetch(`https://api.twitch.tv/kraken/users/${userID}/follows/channels/${channelID}`, {
    headers: {
      'Client-ID': process.env.CLIENT_ID,
      'Accept': 'application/vnd.twitchtv.v5+json'
    }
  })

  if ([400, 401].includes(res.status)) {
    delete localStorage.token
    document.body.classList.add('show-login')
    return false
  
  } else if (res.status == 200) {
    return true
  }

  return false

}