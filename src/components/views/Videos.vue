<template>

  <Loading v-if="isLoading" />

  <div id="videos" v-else>
    <h1><i class="fsif-video"></i>Top Videos</h1>

    <div v-if="videos.length > 0" class="video-list">
      <Video v-for="video in videos" :key="video.id" v-bind="video" />
    </div>
  
    <button v-if="nextOffset >= 0" v-on:click="fetchMoreVideos" class="load-more">
      {{isLoadingMore ? 'Loading...' : 'Load more'}}
    </button>
  </div>

</template>

<script>
  import Loading from '../Loading'
  import Video   from '../boxes/Video'

  import fetchVideos from '../../functions/fetch-videos'

  export default {
    name: 'Top-Videos',

    components: {Loading, Video},

    data: function() {
      return {
        isLoading:     true,
        isLoadingMore: false,
        videos:        [],
        nextOffset:    0,
      }
    },

    methods: {
      fetchMoreVideos: async function() {
        this.isLoadingMore = true
        const vods   = await fetchVideos({offset: this.videos.length})
        const videos = vods.filter(vod => !this.videos.find(video => video.id == vod.id))
      
        this.videos        = this.videos.concat(videos)
        this.nextOffset    = vods.length > 0 ? this.nextOffset + 100 : -1
        this.isLoadingMore = false
      }
    },

    mounted: async function() {
      this.videos     = await fetchVideos()
      this.nextOffset += 100
      this.isLoading  = false
    }
  }
</script>

<style scoped>
  button {
    display: block;
    margin: 2em auto;
  }
</style>