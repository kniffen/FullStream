<template>

  <Loading v-if="isLoading" />

  <div id="category" v-else>
  
    <h1><CategoryIcon v-bind:name="title" />{{title}}</h1>

    <div v-if="streams.length > 0" class="stream-list">
      <Stream v-for="_stream in streams" :key="_stream.id" v-bind="_stream" />
    </div>

    <button 
      class="load-more" 
      v-if="offset >= 0" 
      v-on:click="getStreams"
    >{{isLoadingMore ? 'Loading...' : 'Load more'}}</button>
  
  </div>
</template>

<script>
  import Loading      from '../Loading'
  import Stream       from '../boxes/Stream'
  import CategoryIcon from '../icons/CategoryIcon'

  import fetchStreams from '../../functions/fetch-streams'

  export default {
    name: 'Category',

    components: {Loading, Stream, CategoryIcon},

    data: function() {
      return {
        title:         'Category',
        isLoading:     true,
        isLoadingMore: false,
        streams:       [],
        offset:        0,
      }
    },

    methods: {
      getStreams: async function() {
        this.isLoadingMore = true

        const category = this.$route.params.name.toLowerCase()
        const { offset } = this

        const streams = 
          await fetchStreams({category, offset})
            .then(streams => streams.filter(_stream => !this.streams.find(existing => existing.id == _stream.id)))

        this.streams       = this.streams.concat(streams)
        this.offset        = streams.length >= 100 ? this.offset + 100 : -1
        this.isLoadingMore = false
      }
    },

    mounted: async function() {
      if (this.$route.params.name) {
        await this.getStreams()

        this.title     = this.$route.params.name
        this.isLoading = false
      }
    }
  }
</script>