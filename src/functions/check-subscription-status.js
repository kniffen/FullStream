export default async function checkSubscriptionStatus(userID, channelID) {

  const res = await fetch(`https://api.twitch.tv/kraken/users/${userID}/subscriptions/${channelID}`, {
    headers: {
      'Client-ID': process.env.CLIENT_ID,
      'Authorization': `OAuth ${localStorage.token}`,
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