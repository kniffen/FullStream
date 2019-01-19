export default async function fetchFollowingStreams() {

  const streams = []
  let offset    = 0

  for (let i = 0; i < 5; i++) { // a max of 5 requests (500 streams)
    const res = await fetch(
      `https://api.twitch.tv/kraken/streams/followed?stream_type=all&limit=100&offset=${offset}`, {
       headers: {
        'Authorization': `OAuth ${localStorage.token}`,
        'Accept': 'application/vnd.twitchtv.v5+json'
      }
    })

    if ([400, 401].includes(res.status)) {
      delete localStorage.token
      document.body.classList.add('show-login')
      break
    } else if (res.status != 200) {
      break
    }

    const data = await res.json()

    data.streams.forEach(_stream => {
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
        started:     _stream.created_at, 
        resolution:  Math.floor(_stream.video_height),
        fps:         Math.ceil(Math.floor(_stream.average_fps) / 2) * 2,
        category: {
          name: _stream.game
        }
      })
    })

    if (data.streams.length < 100) break

    offset += 100
  }

  return streams

}