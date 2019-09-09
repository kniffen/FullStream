<template>

  <Channel v-bind:name="$route.params.name">
    <Loading v-if="isLoading" />

    <div v-else>
      <div class="video-list">
        <Video v-for="video in videos" v-if="video.isPublic" :key="video.id" v-bind="video" />
      </div>

      <button class="load-more" v-if="offset >= 0" v-on:click="fetchAndParseVideos(false)">{{isLoadingMore ? 'Loading...' : 'Load more'}}</button>
    </div>
  </Channel>

</template>

<script>
  import Loading from '../../Loading'
  import Channel from '../Channel'
  import Video   from '../../boxes/Video'

  import fetchVideos  from '../../../functions/fetch-videos'

  export default {
    name: 'ChannelArchive',

    components: {Loading, Channel, Video},

    data: function() {
      return {
        isLoading:     true,
        isLoadingMore: false,
        videos:        [],
        offset:        0,
      }
    },

    methods: {
      fetchAndParseVideos: async function(reset) {
        this.isLoadingMore = true

        if (reset) {
          this.videos    = []
          this.offset    = 0
          this.isLoading = true
        }

        const videos = await fetchVideos({
          username: this.$route.params.name,
          offset:   this.offset,
          type:     this.$route.params.type,
        })

        this.videos = this.videos.concat(videos.map(video => {
          video.channel = null
          return video
        }))

        this.offset        = videos.length >= 100 ? this.offset + videos.length : -1
        this.isLoading     = false
        this.isLoadingMore = false
      }
    },

    mounted: function() {
      this.fetchAndParseVideos()
    },

    watch: {
      $route: function(to, from) {
        this.fetchAndParseVideos(true)
      }
    }
  }
</script>