<template>
  
  <Channel v-bind:name="$route.params.name">
    
    <Loading v-if="isLoading" />

    <div v-else>
      <div class="video-list">
        <Video v-for="clip in clips" :key="clip.slug" v-bind="clip" />
      </div>
    </div>
  </Channel>

</template>

<script>
  import Loading from '../../Loading'
  import Channel from '../Channel'
  import Video   from '../../boxes/Video'

  import fetchClips  from '../../../functions/fetch-clips'

  export default {
    name: 'ChannelClips',

    components: {Loading, Channel, Video},

    data: function() {
      return {
        isLoading:     true,
        isLoadingMore: false,
        clips:         [],
      }
    },

    mounted: async function() {
      const { cursor, clips } = await fetchClips(this.$route.params.name)
      
      this.clips = clips.map(clip => {
        clip.channel = clip.curator
        return clip
      })

      this.isLoading = false
    }
  }
</script>