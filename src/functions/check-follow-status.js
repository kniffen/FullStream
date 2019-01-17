export default async function checkFollowStatus(userID, channelID) {
  
  const res = await fetch(`https://api.twitch.tv/kraken/users/${userID}/follows/channels/${channelID}`, {
    headers: {
      'Client-ID': process.env.CLIENT_ID,
      'Accept': 'application/vnd.twitchtv.v5+json'
    }
  })

  return res.status == 200 ? true : false

}