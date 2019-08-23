export default async function fetchPanels(username) {

  const panels = []

  const res = await fetch(`https://api.twitch.tv/api/channels/${username}/panels?limit=100`, {
    headers: {
      'Client-ID': process.env.CLIENT_ID
    }
  })

  if (res.status != 200) return panels

  const data = await res.json()

  data.forEach(panel => {
    panels.push({
      id:      panel._id,
      title:   panel.data.title,
      link:    panel.data.link,
      image:   panel.data.image,
      html:    panel.html_description.replace(/\n\n/g, '<br />').replace(/\n/g, '<br />'),
    })
  })

  return panels

}