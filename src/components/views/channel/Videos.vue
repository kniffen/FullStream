<template>
<Loading v-if="isLoading" />

  <Channel v-bind="{name, userID}" v-else>
    <div class="video-list" v-if="videos.length">
      <Video v-for="video in videos" v-if="video.isPublic" :key="video.id" v-bind="video" />
    </div>

    <h3 v-else>No videos available</h3>

    <Pagination :page="page" :hasMore="videos.length > 95" :path="`/channel/${name}/videos/${type}`"/>
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

    props: ['username', 'userID'],

    data: function() {
      return {
        isLoading: true,
        videos:    []
      }
    },

    methods: {
      setVideos: async function() {
        this.isLoading = true

        const searchResults = await fetchSearch("users", this.name.toLowerCase())
        const user = searchResults.find(entry => entry.name.toLowerCase() == this.name.toLowerCase())

        if (!user) {
          this.isLoading = false
          return
        }

        const videos = await fetchVideos({
          channelID: user.id,
          offset:    this.page * 100,
          type:      this.$route.params.type,
        })

        this.videos    = videos.items
        this.isLoading = false
      }
    },

    computed: {
      type: function() {
        return this.$route.params.type
      },
      name: function() {
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