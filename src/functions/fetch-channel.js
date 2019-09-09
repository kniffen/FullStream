import checkFollowStatus       from './check-follow-status'
import checkSubscriptionStatus from './check-subscription-status'

export default async function fetchChannel(channelName, userID) {

  const res = await fetch(
    `https://api.twitch.tv/kraken/channels/${channelName}`,
    {
      headers: {
        'Client-ID': process.env.CLIENT_ID
      }
    })

  if (!res.ok) return

  const data = await res.json()

  const channel = {
    id:          data._id,
    name:        data.name,
    displayName: data.display_name,
    followers:   data.followers,
    avatar:      data.logo,
    isPartner:   data.partner,
    title:       data.status,
    views:       data.views,
    created:     data.created_at,
    category:    {name: data.game},
    isFollowing: false,
    isSubscribed: false,
  }

  if (userID) {
    channel.isFollowing  = await checkFollowStatus({userID, channelID:channel.id})
  }

  if (userID && localStorage.token) {
    channel.isSubscribed = await checkSubscriptionStatus(userID, channel.id)
  }

  return channel

}