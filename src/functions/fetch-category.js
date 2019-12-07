export default async function fetchCategory({ id, name }) {

  let uri = 'https://api.twitch.tv/helix/games'

  if (id) {
    uri += `?id=${id}`
  } else if (name) {
    uri += `?name=${encodeURIComponent(name)}`
  }

  const res = await fetch(uri, {
    headers: {
      'Client-ID': process.env.VUE_APP_CLIENT_ID,
    }
  })

  if (!res.ok) return

  const category = await res.json()

  if(category.data.length <= 0) return

  return {
    id:     category.data[0].id,
    name:   category.data[0].name,
    boxArt: category.data[0].box_art_url,
  }

}