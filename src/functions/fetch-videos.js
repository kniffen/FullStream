export default async function fetchVideos({channelID, offset = 0, type = 'archive'} = {offset: 0}) {

  const videos = {pages: 0, items: []}
  let res

  if (channelID) {
    res = await fetch(`https://api.twitch.tv/kraken/channels/${channelID}/videos?limit=100&offset=${offset}&broadcast_type=${type}`, {
      headers: {
        'Client-ID': process.env.VUE_APP_CLIENT_ID,
        'Accept': 'application/vnd.twitchtv.v5+json'
      }
    })

  } else {
    res = await fetch(`https://api.twitch.tv/kraken/videos/top?limit=100&offset=${offset}`, {
      headers: {
        'Client-ID': process.env.VUE_APP_CLIENT_ID,
        'Accept': 'application/vnd.twitchtv.v5+json'
      }
    })
  }

  if (res.status != 200) return videos

  const data = await res.json()
  const vods = channelID ? data.videos : data.vods

  videos.pages = Math.ceil(data._total / 100) || 0

  videos.items = vods.map(vod => ({
    id:              vod._id,
    title:           vod.title,
    description:     vod.description,
    published:       vod.published_at,
    isPublic:        channelID ? true : vod.viewable == 'public',
    length:          parseInt(vod.length) * 1000,
    views:           vod.views,
    thumbnail:       vod.preview.template || vod.preview,
    animatedPreview: vod.animated_preview_url,
    category:        {name: vod.game},
    channel: {
      id:          vod.channel._id,
      name:        vod.channel.name,
      displayName: vod.channel.display_name,
      followers:   vod.channel.followers,
      avatar:      vod.channel.logo,
      isPartner:   vod.channel.partner,
      title:       vod.channel.status,
      views:       vod.channel.views,
      category:    {name: vod.channel.game},
    }
  }))

  return videos

}