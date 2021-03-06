export default async function fetchClip(slug, userID) {

  const res = await fetch(`https://api.twitch.tv/kraken/clips/${slug}`, {
    headers: {
      'Client-ID': process.env.VUE_APP_CLIENT_ID,
      'Accept': 'application/vnd.twitchtv.v5+json'
    }
  })

  if (!res.ok) return

  const data = await res.json()

  const clip = {
    slug:            data.slug,
    title:           data.title,
    published:       data.created_at,
    isPublic:        true,
    length:          Math.ceil(data.duration * 1000),
    views:           data.views,
    thumbnail:       data.thumbnails.medium,
    category:        {name: data.game},
    channel: {
      id:           data.broadcaster.id,
      name:         data.broadcaster.name,
      displayName:  data.broadcaster.display_name,
      avatar:       data.broadcaster.logo,
      isFollowing:  false,
      isSubscribed: false
    },
    curator: {
      id:          data.curator.id,
      name:        data.curator.name,
      displayName: data.curator.display_name,
      avatar:      data.curator.logo,
    }
  }

  return clip
}