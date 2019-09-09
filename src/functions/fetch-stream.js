import checkFollowStatus from './check-follow-status'
import checkSubscriptionStatus from './check-subscription-status'

export default async function fetchStream(channelName, userID) {

  const res = await fetch(
    `https://api.twitch.tv/kraken/streams/${channelName}`, {
    headers: {
      'Client-ID': process.env.CLIENT_ID
    }
  })

  if (!res.ok) return
  
  const data = await res.json()
  
  if (!data.stream) return

  const stream = {
    id:           data.stream.channel._id,
    streamID:     data.stream._id,
    name:         data.stream.channel.name,
    displayName:  data.stream.channel.display_name,
    followers:    data.stream.channel.followers,
    avatar:       data.stream.channel.logo,
    isPartner:    data.stream.channel.partner,
    title:        data.stream.channel.status,
    streamType:   data.stream.stream_type,
    thumbnail:    data.stream.preview.template,
    viewers:      data.stream.viewers,
    views:        data.stream.channel.views,
    created:      data.stream.channel.created_at,
    started:      data.stream.created_at, 
    isFollowing:  false,
    isSubscribed: false,
    resolution:   Math.floor(data.stream.video_height),
    fps:          Math.ceil(Math.floor(data.stream.average_fps) / 2) * 2 ,
    category:     {name: data.stream.game}
  }

  if (userID) {
    stream.isFollowing = await checkFollowStatus({userID, channelID: stream.id})
  }

  if (userID && localStorage.token) {
    stream.isSubscribed = await checkSubscriptionStatus(userID, stream.id)
  }

  return stream

}