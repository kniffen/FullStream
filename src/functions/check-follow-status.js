export default async function checkFollowStatus({ userID, username, channelID, categoryName }) {
  
  const uri = channelID ?
    `https://api.twitch.tv/kraken/users/${userID}/follows/channels/${channelID}` :
    `https://api.twitch.tv/api/users/${username}/follows/games/isFollowing?name=${categoryName}`

  const res = await fetch(uri, {
    headers: {
      'Client-ID': process.env.CLIENT_ID,
      'Accept': 'application/vnd.twitchtv.v5+json'
    }
  })

  return res.ok
}