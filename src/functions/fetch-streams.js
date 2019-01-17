export default async function fetchStreams({ category, offset = 0, channels }) {

  const streams = []

  let URI =  `https://api.twitch.tv/kraken/streams/?limit=100&offset=${offset}`

  if (category) URI += `&game=${encodeURIComponent(category)}`

  if (channels) URI += `&channel=${encodeURIComponent(channels.join(','))}`

  const res = await fetch(URI, {
    headers: {
     'Client-ID': process.env.CLIENT_ID
    }
  })

  if (res.status != 200) return streams

  const data = await res.json()

  data.streams.forEach(_stream => {
    const started = new Date(_stream.created_at)

    streams.push({
      id:          _stream.channel._id,
      streamID:    _stream._id,
      name:        _stream.channel.name,
      displayName: _stream.channel.display_name,
      followers:   _stream.channel.followers,
      avatar:      _stream.channel.logo,
      isPartner:   _stream.channel.partner,
      title:       _stream.channel.status,
      streamType:  _stream.stream_type,
      thumbnail:   _stream.preview.template,
      viewers:     _stream.viewers,
      views:       _stream.channel.views,
      timestamp:   started.getTime(), 
      resolution:  Math.floor(_stream.video_height),
      fps:         Math.floor(_stream.average_fps),
      category: {
        name: _stream.game
      }
    })
  })

  return streams

}