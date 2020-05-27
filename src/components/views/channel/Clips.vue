<template>
  <Loading v-if="isLoading" />
  
  <Channel v-bind="{name, userID}" v-else>
    <div class="video-list" v-if="clips && clips.length">
      <Video v-for="clip in clips" :key="clip.slug" v-bind="clip" />
    </div>

    <h3 v-else>No clips available</h3>
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

    props: ['username', 'userID'],

    data: function() {
      return {
        isLoading:     true,
        isLoadingMore: false,
      }
    },

    computed: {
      name: function() {
        return this.$route.params.name
      }
    },

    asyncComputed: {
      clips: async function() {
        const { cursor, clips } = await fetchClips(this.$route.params.name)
      
        return clips.map(clip => {
          clip.channel = clip.curator
          return clip
        })
      }
    },

    mounted: async function() {
      this.isLoading = false
    }
  }
</script>