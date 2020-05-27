import Vue    from 'vue'
import Router from 'vue-router'

import Loading from '@/components/Loading'

import Following      from '@/components/views/Following'
import Categories     from '@/components/views/Categories'
import Category       from '@/components/views/Category'
import Streams        from '@/components/views/Streams'
import Teams          from '@/components/views/Teams'
import Team           from '@/components/views/Team'
import Videos         from '@/components/views/Videos'
import Search         from '@/components/views/Search'
import Settings       from '@/components/views/Settings'
import ManageChannels from '@/components/views/ManageChannels'
import About          from '@/components/views/About'

import ChannelInfo      from '@/components/views/channel/Info'
import ChannelVideos    from '@/components/views/channel/Videos'
import ChannelClips     from '@/components/views/channel/Clips'
import ChannelFollowers from '@/components/views/channel/Followers'
import ChannelFollowing from '@/components/views/channel/Following'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path:     '/',
      name:     'Home',
      redirect: '/streams',
    },
    {
      path:     '/watch/:name',
      name:     'Watch',
      component: Loading,
    },
    {
      path:     '/video/:id',
      name:     'Video',
      component: Loading,
    },
    {
      path:     '/clip/:slug',
      name:     'Clip',
      component: Loading,
    },
    {
      path:      '/following',
      name:      'Following',
      component: Following,
      meta: { title: 'Following' }
    },
    {
      path:      '/categories',
      name:      'Categories',
      component: Categories,
      meta: { title: 'Categories' }
    },
    {
      path:      '/categories/page/:page',
      name:      'CategoriesPage',
      component: Categories,
      meta: { title: 'Categories' }
    },
    {
      path:     '/streams',
      name:     'StreamsRedirect',
      redirect: '/streams/featured',
      meta: { title: 'Streams' }
    },
    {
      path:      '/streams/:type',
      name:      'Streams',
      component: Streams,
      meta: { title: 'Streams' }
    },
    {
      path:      '/streams/:type/page/:page',
      name:      'StreamsPage',
      component: Streams,
      meta: { title: 'Streams' }
    },
    {
      path:      '/teams',
      name:      'Teams',
      component: Teams,
      meta: { title: 'Teams' }
    },
    {
      path:      '/videos',
      name:      'Videos',
      component: Videos,
      meta: { title: 'Videos' }
    },
    {
      path:      '/videos/page/:page',
      name:      'VideosPage',
      component: Videos,
      meta: { title: 'Videos' }
    },
    {
      path:      '/search',
      name:      'Search',
      component: Search,
      meta: { title: 'Search' }
    },
    {
      path:      '/settings',
      name:      'Settings',
      component: Settings,
      meta: { title: 'Settings' }
    },
    {
      path:      '/settings/manage-channels',
      name:      'ManageChannels',
      component: ManageChannels,
      meta: { title: 'Manage channels' }
    },
    {
      path:      '/settings/manage-channels/page/:page',
      name:      'ManageChannels',
      component: ManageChannels,
      meta: { title: 'Manage channels' }
    },
    {
      path:      '/about',
      name:      'About',
      component: About,
      meta: { title: 'About' }
    },
    {
      path:      '/category/:name',
      name:      'Category',
      component: Category,
    },
    {
      path:      '/category/:name/page/:page',
      name:      'CategoryPage',
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
      path:      '/channel/:name/videos/:type/page/:page',
      name:      'ChannelVideosPage',
      component: ChannelVideos,
    },
    {
      path:      '/channel/:name/clips',
      name:      'ChannelClips',
      component: ChannelClips,
    },
    {
      path:      '/channel/:name/followers',
      name:      'ChannelFollowers',
      component: ChannelFollowers,
    },
    {
      path:      '/channel/:name/followers/page/:page',
      name:      'ChannelFollowersPage',
      component: ChannelFollowers,
    },
    {
      path:      '/channel/:name/following',
      name:      'ChannelFollowing',
      component: ChannelFollowing,
    },
    {
      path:      '/channel/:name/following/page/:page',
      name:      'ChannelFollowingPage',
      component: ChannelFollowing,
    }
  ]
})

router.beforeEach((to, from, next) => {
  let title = 'FullStream'

  if (to.meta.title) {
    title += ` - ${to.meta.title}`
  } else if (to.params.name) {
    title += ` - ${to.params.name}`
  }

  document.title = title
  next()
})

export default router