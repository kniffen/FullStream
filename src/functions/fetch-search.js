export default async function(type, query) {

  const results = []
  const res = await fetch(`https://api.twitch.tv/kraken/search/${type}?query=${encodeURIComponent(query)}&limit=100&type=suggest`, {
    headers: {
      'Client-ID': process.env.VUE_APP_CLIENT_ID,
      'Accept': 'application/vnd.twitchtv.v5+json'
    }
  })

  if (res.status != 200) return results

  const data = await res.json()

  switch (type) {
    case 'streams':
      data.streams.forEach(_stream => {
        if (!_stream) return

        results.push({
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
          fps:         Math.floor(_stream.average_fps),
          category: {
            name: _stream.game
          }
        })
      })
      break

    case 'users':
      data.users.forEach(user => {
        if (!user) return
        
        results.push({
          id:          user._id,
          name:        user.name,
          displayName: user.display_name,
          avatar:      user.logo,
        })
      })
      break

    case 'games':
      data.games.forEach(category => {
        if (!category) return

        results.push({
          id:      category._id,
          name:    category.name,
          boxArt:  category.box.medium,
          viewers: category.popularity,
        })
      })
      break
  }

  return results

}