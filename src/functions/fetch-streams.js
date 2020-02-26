export default async function fetchStreams({ category, offset = 0, channels, featured }) {

  let streams = []

  let URI =  'https://api.twitch.tv/kraken/streams'

  if (featured) URI += '/featured'

  URI += `/?limit=100&offset=${offset}`

  if (category) URI += `&game=${encodeURIComponent(category)}`

  if (channels) URI += `&channel=${encodeURIComponent(channels.join(','))}`


  const res = await fetch(URI, {
    headers: {
     'Client-ID': process.env.VUE_APP_CLIENT_ID,
     'Accept': 'application/vnd.twitchtv.v5+json'
    }
  })

  if (res.status != 200) return streams

  const data = await res.json()
  const arr  = data.streams || data.featured

  streams = arr.map((item) => {
    const channel = featured ? item.stream.channel : item.channel
    const stream  = featured ? item.stream         : item

    return {
      id:          channel._id,
      streamID:    stream._id,
      name:        channel.name,
      displayName: channel.display_name,
      followers:   channel.followers,
      avatar:      channel.logo,
      isPartner:   channel.partner,
      title:       channel.status,
      streamType:  stream.stream_type,
      thumbnail:   featured ? item.image : stream.preview.template,
      viewers:     stream.viewers,
      views:       channel.views,
      started:     stream.created_at, 
      resolution:  Math.floor(stream.video_height),
      fps:         Math.floor(stream.average_fps),
      category: {
        name: stream.game
      }
    }
  })

  return streams

}