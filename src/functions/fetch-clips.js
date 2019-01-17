import fetchChannel from './fetch-channel'

export default async function fetchClips(username) {
  const clips = []

  const res = await fetch(`https://api.twitch.tv/kraken/clips/top?channel=${username}&limit=100`, {
    headers: {
      'Client-ID': process.env.CLIENT_ID,
      'Accept': 'application/vnd.twitchtv.v5+json'
    }
  })

  if (res.status != 200) return {clips}

  const data = await res.json()

  data.clips.forEach(clip => {
    clips.push({
      slug:            clip.slug,
      title:           clip.title,
      published:       clip.created_at,
      isPublic:        true,
      length:          Math.ceil(clip.duration * 1000),
      views:           clip.views,
      thumbnail:       clip.thumbnails.medium,
      category:        {name: clip.game},
      channel: {
        id:          clip.broadcaster.id,
        name:        clip.broadcaster.name,
        displayName: clip.broadcaster.displayName,
        avatar:      clip.broadcaster.logo,
      },
      curator: {
        id:          clip.curator.id,
        name:        clip.curator.name,
        displayName: clip.curator.display_name,
        avatar:      clip.curator.logo,
      }
    })
  })

  return {cursor: data._cursor, clips}

}