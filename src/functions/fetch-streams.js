export default async function fetchStreams({ category, offset = 0, channels, featured }) {

  const streams = []

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

  const arr = data.streams || data.featured

  arr.forEach(item => {
    const channel = featured ? item.stream.channel : item.channel
    const _stream  = featured ? item.stream         : item

    streams.push({
      id:          channel._id,
      streamID:    _stream._id,
      name:        channel.name,
      displayName: channel.display_name,
      followers:   channel.followers,
      avatar:      channel.logo,
      isPartner:   channel.partner,
      title:       channel.status,
      streamType:  _stream.stream_type,
      thumbnail:   featured ? item.image : _stream.preview.template,
      viewers:     _stream.viewers,
      views:       channel.views,
      started:     _stream.created_at, 
      resolution:  Math.floor(_stream.video_height),
      fps:         Math.floor(_stream.average_fps),
      category: {
        name: _stream.game
      }
    })
  })

  return streams

}