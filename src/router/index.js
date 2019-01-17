import Vue    from 'vue'
import Router from 'vue-router'

import Following   from '@/components/views/Following'
import Categories  from '@/components/views/Categories'
import Category    from '@/components/views/Category'
import Streams     from '@/components/views/Streams'
import Teams       from '@/components/views/Teams'
import Team        from '@/components/views/Team'
import Videos      from '@/components/views/Videos'
import Search      from '@/components/views/Search'
import Settings    from '@/components/views/Settings'
import About       from '@/components/views/About'

import ChannelInfo      from '@/components/views/channel/Info'
import ChannelVideos    from '@/components/views/channel/Videos'
import ChannelClips     from '@/components/views/channel/Clips'
import ChannelEvents    from '@/components/views/channel/Events'
import ChannelFollowers from '@/components/views/channel/Followers'
import ChannelFollowing from '@/components/views/channel/Following'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:     '/',
      name:     'Home',
      redirect: '/following'
    },
    {
      path:      '/following',
      name:      'Following',
      component: Following,
    },
    {
      path:      '/categories',
      name:      'Categories',
      component: Categories,
    },
    {
      path:      '/streams',
      name:      'Streams',
      component: Streams,
    },
    {
      path:      '/teams',
      name:      'Teams',
      component: Teams,
    },
    {
      path:      '/videos',
      name:      'Videos',
      component: Videos,
    },
    {
      path:      '/search',
      name:      'Search',
      component: Search,
    },
    {
      path:      '/settings',
      name:      'Settings',
      component: Settings,
    },
    {
      path:      '/about',
      name:      'About',
      component: About,
    },
    {
      path:      '/category/:name',
      name:      'Category',
      component: Category,
    },
    {
      path:      '/team/:name',
      name:      'Team',
      component: Team,
    },
    {
      path:      '/channel/:name',
      name:      'ChannelInfo',
      component: ChannelInfo,
    },
    {
      path:      '/channel/:name/videos/:type',
      name:      'ChannelVideos',
      component: ChannelVideos,
    },
    {
      path:      '/channel/:name/clips',
      name:      'ChannelClips',
      component: ChannelClips,
    },
    {
      path:      '/channel/:name/events',
      name:      'ChannelEvents',
      component: ChannelEvents,
    },
    {
      path:      '/channel/:name/followers',
      name:      'ChannelFollowers',
      component: ChannelFollowers,
    },
    {
      path:      '/channel/:name/following',
      name:      'ChannelFollowing',
      component: ChannelFollowing,
    },
  ]
})