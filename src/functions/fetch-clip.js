export default async function fetchClip(slug) {

  const res = await fetch(`https://api.twitch.tv/kraken/clips/${slug}`, {
    headers: {
      'Client-ID': process.env.CLIENT_ID,
      'Accept': 'application/vnd.twitchtv.v5+json'
    }
  })

  if (res.status != 200) return

  const clip = await res.json()

  return {
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
      displayName: clip.broadcaster.display_name,
      avatar:      clip.broadcaster.logo,
    },
    curator: {
      id:          clip.curator.id,
      name:        clip.curator.name,
      displayName: clip.curator.display_name,
      avatar:      clip.curator.logo,
    }
  }
}