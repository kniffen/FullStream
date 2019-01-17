<template>

  <Loading v-if="isLoading" />

  <div id="streams" v-else>
    <h1><i class="fsif-camera"></i>Top Streams</h1>

    <div v-if="streams.length > 0" class="stream-list">
      <Stream v-for="_stream in streams" :key="_stream.id" v-bind="_stream" />
    </div>

    <button 
      v-if="offset >= 0" 
      v-on:click="getStreams"
      class="load-more"
    >{{isLoadingMore ? 'Loading...': 'Load more'}}</button>
  
  </div>
</template>

<script>
  import Loading from '../Loading'
  import Stream  from '../boxes/Stream'

  import fetchStreams from '../../functions/fetch-streams'

  export default {
    name: 'TopStreams',

    components: {Loading, Stream},

    data: function() {
      return {
        isLoading:     true,
        isLoadingMore: false,
        streams:       [],
        offset:        0,
      }
    },

    methods: {
      getStreams: async function() {
        this.isLoadingMore = true

        const streams = await fetchStreams({offset: this.offset}).then(streams => 
          streams.filter(_stream => !this.streams.find(existing => existing.id == _stream.id))
        )

        this.streams       = this.streams.concat(streams)
        this.offset        = streams.length > 0 ? this.offset + streams.length : -1
        this.isLoadingMore = false
      }
    },

    mounted: async function() {
      await this.getStreams()
      this.isLoading = false
    }
  }
</script>