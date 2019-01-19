<template>

  <Loading v-if="isLoading" />

  <div id="following" v-else>
    <h1><i class="fsif-heart"></i>Following</h1>

    <section v-if="premieres.length > 0">
      <h2>Premieres</h2>
      <div class="stream-list">
        <Stream v-for="_stream in premieres" :key="_stream.id" v-bind="_stream" />
      </div>
    </section>

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

    <section v-if="hosted.length > 0">
      <h2>Hosted</h2>
      <div class="stream-list">
        <Stream v-for="_stream in hosted" :key="_stream.id" v-bind="_stream" />
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
  import fetchFollowingHosting    from '../../functions/fetch-following-hosting'
  import fetchFollowingCategories from '../../functions/fetch-following-categories'
  import fetchFollowingUsers      from '../../functions/fetch-following-users'

  export default {
    name: 'Following',

    props: ['settings', 'username'],

    components: {Loading, Stream, Category, User},

    data: function() {
      return {
        isLoading:  true,
        premieres:  [],
        live:       [],
        reruns:     [],
        hosted:     [],
        categories: [],
        offline:    []
      }
    },

    methods: {
      parseChannels: async function() {
        const streams = await fetchFollowingStreams()
        const live = streams.filter(_stream => _stream.streamType == 'live')
        live.sort((a, b) => b.viewers - a.viewers)
        this.live = live

        if (this.settings.showPremieres) {
          const premieres = streams.filter(_stream => _stream.streamType == 'premiere')
          premieres.sort((a, b) => b.viewers - a.viewers)
          this.premieres = premieres
        }

        if (this.settings.showReruns) {
          const reruns = streams.filter(_stream => _stream.streamType == 'rerun')
          reruns.sort((a, b) => b.viewers - a.viewers)
          this.reruns = reruns
        }

        if (this.settings.showHosted) {
          const hosted = await fetchFollowingHosting(this.username)
          hosted.sort((a, b) => b.viewers - a.viewers)
          this.hosted = hosted
        }

        if (this.settings.showCategories) {
          const categories = await fetchFollowingCategories(this.username)
          categories.sort((a, b) => b.viewers - a.viewers)
          this.categories = categories.filter(cat => cat.viewers > 0)
        }

        if (this.settings.showOffline) {
          let offline = []
          let offset  = 0

          for (let i = 0; i < 10; i++) { // a max of 1000 streams
            const users = await fetchFollowingUsers(this.username, offset)
            offline = offline.concat(users)
            if (users.length <= 0 ) break
            offset += users.length
          }

          offline.sort((a, b) => {
            if (a.name < b.name) return -1
            if (a.name > b.name) return 1
            return 0
          })

          this.offline = offline.filter(user => !this.live.find(_stream => _stream.id == user.id))
        }
      }
    },

    mounted: async function() {
      await this.parseChannels()
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