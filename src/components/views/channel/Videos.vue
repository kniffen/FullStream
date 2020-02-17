<template>

  <Channel v-bind:name="$route.params.name">
    <Loading v-if="isLoading" />

    <div v-else>
      <div class="video-list">
        <Video v-for="video in videos" v-if="video.isPublic" :key="video.id" v-bind="video" />
      </div>

      <Pagination :page="page" :pages="pages" :path="`/channel/${channelName}/videos/${type}`" />
    </div>

  </Channel>

</template>

<script>
  import Loading    from '../../Loading'
  import Channel    from '../Channel'
  import Video      from '../../boxes/Video'
  import Pagination from '../../elements/Pagination'

  import fetchVideos from '../../../functions/fetch-videos'
  import fetchSearch from '../../../functions/fetch-search'

  export default {
    name: 'ChannelArchive',

    components: {Loading, Channel, Video, Pagination},

    data: function() {
      return {
        isLoading: true,
        videos:    [],
        pages:     0,
      }
    },

    methods: {
      setVideos: async function() {
        this.isLoading = true

        const searchResults = await fetchSearch("users", this.channelName.toLowerCase())
        const user = searchResults.find(entry => entry.name.toLowerCase() == this.channelName.toLowerCase())

        const videos = await fetchVideos({
          channelID: user.id,
          offset:    this.page * 100,
          type:      this.$route.params.type,
        })

        this.pages     = videos.pages
        this.videos    = videos.items
        this.isLoading = false
      }
    },

    computed: {
      type: function() {
        return this.$route.params.type
      },
      channelName: function() {
        return this.$route.params.name
      },
      page: function() {
        return this.$route.params.page > 1 ? this.$route.params.page - 1 : 0
      }
    },

    mounted: function() {
      this.setVideos()
    },

    watch: {
      $route: function() {
        this.setVideos()
      }
    }
  }
</script>