export default async function fetchVideo(videoID, userID) {
  
  const res = await fetch(`https://api.twitch.tv/kraken/videos/${videoID}`, {
    headers: {
      'Client-ID': process.env.VUE_APP_CLIENT_ID,
      'Accept': 'application/vnd.twitchtv.v5+json'
    }
  })

  if (!res.ok) return

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
    }
  }

  return video

}