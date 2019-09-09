export default async function fetchEvents(username, offset = 0) {

  const _events = []

  const res = await fetch(`https://api.twitch.tv/v5/channels/${username}/events`, {
    headers: {
      'Client-ID': process.env.CLIENT_ID,
    }
  })

  if (res.status != 200) return _events

  const data = await res.json()

  data.events.forEach(event => {
    _events.push({
      id:          event._id,
      title:       event.title,
      description: event.description,
      image:       event.cover_image_url,
      start:       event.start_time,
      end:         event.end_time,
      timezone:    event.time_zone_id,
      category: {
        id:   event.game._id,
        name: event.game.name
      }
    })
  })

  return _events

}