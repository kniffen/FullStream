<template>

  <Loading v-if="isLoading" />

  <div id="videos" v-else>
    <h1><i class="fsif-video"></i>Top Videos</h1>

    <div v-if="videos.length > 0" class="video-list">
      <Video v-for="video in videos" :key="video.id" v-bind="video" />
    </div>

    <Pagination :page="page" :pages="videos.length >= 100 ? 2 : 1" path="/videos" :simple="true"/>
  </div>

</template>

<script>
  import Loading    from '../Loading'
  import Video      from '../boxes/Video'
  import Pagination from '../elements/Pagination'

  import fetchVideos from '../../functions/fetch-videos'

  export default {
    name: 'Top-Videos',

    components: {Loading, Video, Pagination},

    data: function() {
      return {
        isLoading:     true,
        videos:        [],
      }
    },

    methods: {
      setVideos: async function() {
        this.isLoading = true
        
        const videos = await fetchVideos({offset: this.page * 100})
        
        this.videos    = videos.items
        this.isLoading = false
      }
    },

    computed: {
      page: function() {
        return this.$route.params.page > 1 ? this.$route.params.page - 1 : 0
      }
    },

    mounted: async function() {
      this.setVideos()
    },

    watch: {
      $route: function() {
        this.setVideos()
      }
    }
  }
</script>