export default async function fetchStream(username) {

  const res = await fetch(
    `https://api.twitch.tv/kraken/streams/${username}`, {
    headers: {
      'Authorization': `OAuth ${localStorage.token}`,
    }
  })

  if (res.status == 400) {
    window.location.reload()
  } else if (res.status != 200) {
    return
  }
  
  const data = await res.json()
  
  if (!data.stream) return

  return {
    id:          data.stream.channel._id,
    streamID:    data.stream._id,
    name:        data.stream.channel.name,
    displayName: data.stream.channel.display_name,
    followers:   data.stream.channel.followers,
    avatar:      data.stream.channel.logo,
    isPartner:   data.stream.channel.partner,
    title:       data.stream.channel.status,
    streamType:  data.stream.stream_type,
    thumbnail:   data.stream.preview.template,
    viewers:     data.stream.viewers,
    views:       data.stream.channel.views,
    created:     data.stream.channel.created_at,
    started:     data.stream.created_at, 
    resolution:  Math.floor(data.stream.video_height),
    fps:         Math.ceil(Math.floor(data.stream.average_fps) / 2) * 2 ,
    category:    {name: data.stream.game}
  }

}