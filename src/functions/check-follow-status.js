export default async function checkFollowStatus(userID, channelID) {
  
  const uri = `https://api.twitch.tv/kraken/users/${userID}/follows/channels/${channelID}`

  const res = await fetch(uri, {
    headers: {
      'Client-ID': process.env.VUE_APP_CLIENT_ID,
      'Accept': 'application/vnd.twitchtv.v5+json'
    }
  })

  return res.ok
}