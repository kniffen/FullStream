<template>

  <Loading v-if="isLoading" />

  <div id="following" v-else>
    <h1><i class="fsif-heart"></i>Following</h1>

    <section v-if="live.length > 0">
      <h2>Live</h2>
      <div class="stream-list">
        <Stream v-for="_stream in live" :key="_stream.id" v-bind="_stream" />
      </div>
    </section>

    <section v-if="reruns.length > 0">
      <h2>Reruns</h2>
      <div class="stream-list">
        <Stream v-for="_stream in reruns" :key="_stream.id" v-bind="_stream" />
      </div>
    </section>

    <section v-if="categories.length > 0">
      <h2>Categories</h2>
      <div class="category-list">
        <Category v-for="category in categories" :key="categories.id" v-bind="category" />
      </div>
    </section>

    <section v-if="offline.length > 0">
      <h2>Offline</h2>
      <div class="user-list">
        <User v-for="user in offline" :key="user.id" v-bind="user" />
      </div>
    </section>

  </div>
</template>

<script>
  import Loading  from '../Loading'
  import Stream   from '../boxes/Stream'
  import Category from '../boxes/Category'
  import User     from '../boxes/User'

  import fetchFollowingStreams    from '../../functions/fetch-following-streams'
  import fetchFollowingCategories from '../../functions/fetch-following-categories'
  import fetchFollowingUsers      from '../../functions/fetch-following-users'

  export default {
    name: 'Following',

    props: ['settings', 'userID', 'username'],

    components: {Loading, Stream, Category, User},

    data: function() {
      return {
        isLoading:  true,
        live:       [],
        reruns:     [],
        categories: [],
        offline:    []
      }
    },

    methods: {
      parseChannels: function() {
        fetchFollowingStreams().then(streams => {
          // Live streams
          const live = streams.filter(_stream => _stream.streamType == 'live')
          live.sort((a, b) => b.viewers - a.viewers)
          this.live = live

          // Reruns
          if (this.settings.showReruns) {
            const reruns = streams.filter(_stream => _stream.streamType == 'rerun')
            reruns.sort((a, b) => b.viewers - a.viewers)
            this.reruns = reruns
          }
        })

        // Categories
        if (this.settings.showCategories) {
          fetchFollowingCategories(this.userID).then(categories => {
            categories.sort((a, b) => b.viewers - a.viewers)
            this.categories = categories.filter(cat => cat.viewers > 0)
          })
        }

        // Offline
        if (this.settings.showOffline) {
          this.offline = []
          const parseUsers = (users, offset) => {
            this.offline = this.offline.concat(users.filter(user => !this.offline.find(existing => existing.id == user.id)))
            
            this.offline.sort((a, b) => {
              if (a.name < b.name) return -1
              if (a.name > b.name) return 1
              return 0
            })

            if (users.length <= 0) return

            fetchFollowingUsers(this.userID, offset+users.length).then(users => parseUsers(users, offset+users.length))
          }

          fetchFollowingUsers(this.userID, 0).then(users => parseUsers(users, 0))
        }
      }
    },

    mounted: function() {
      this.parseChannels()
      this.isLoading  = false

      setInterval(() => {
        this.parseChannels()
      }, 60000)
    },
  }
</script>

<style scoped>
  h1 {
    margin-bottom: 1em;
  }

  section {
    margin-bottom: 2em;
  }
</style>