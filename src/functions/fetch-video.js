import checkFollowStatus from './check-follow-status'
import checkSubscriptionStatus from './check-subscription-status'

export default async function fetchVideo(videoID, userID) {
  
  const res = await fetch(`https://api.twitch.tv/kraken/videos/${videoID}`, {
    headers: {
      'Client-ID': process.env.CLIENT_ID,
      'Accept': 'application/vnd.twitchtv.v5+json'
    }
  })

  if (res.status != 200) return

  const data = await res.json()

  const video = {
    id:                 data._id,
    title:              data.title,
    description:        data.description,
    published:          data.published_at,
    isPublic:           data.viewable == 'public',
    length:             data.length*1000,
    views:              data.views,
    twitchURL:          data.url,
    thumbnail:          data.preview.template,
    animatedPreview:    data.animated_preview_url,
    category:           {name: data.game},
    channel: {
      id:           data.channel._id,
      name:         data.channel.name,
      displayName:  data.channel.display_name,
      followers:    data.channel.followers,
      avatar:       data.channel.logo,
      isPartner:    data.channel.partner,
      title:        data.channel.status,
      views:        data.channel.views,
      category:     {name: data.channel.game},
      isFollowing:  false,
      isSubscribed: false,
    }
  }

  if (userID) {
    video.channel.isFollowing = await checkFollowStatus(userID, video.channel.id)
  }

  if (userID && localStorage.token) {
    video.channel.isSubscribed = await checkSubscriptionStatus(userID, video.channel.id)
  }

  return video

}