<template>

  <Loading v-if="isLoading" />

  <div id="streams" v-else>
    <header>
      <h1><i class="fsif-camera"></i>streams</h1>

      <nav>
        <router-link to='/streams/featured'>Featured</router-link>
        <router-link to='/streams/top'>Top</router-link>
      </nav>
    </header>

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
    name: 'Streams',

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

        const streams = await fetchStreams({offset: this.offset, featured: this.$route.params.type == 'featured'}).then(streams => 
          streams.filter(_stream => !this.streams.find(existing => existing.id == _stream.id))
        )

        this.streams       = this.streams.concat(streams)
        this.offset        = streams.length >= 100 ? this.offset + streams.length : -1
        this.isLoadingMore = false
      }
    },

    mounted: async function() {
      await this.getStreams()
      this.isLoading = false
    },

    watch: {
      $route: async function() {
        this.isLoading = true
        this.streams   = []
        this.offset    = 0
        
        await this.getStreams()
        
        this.isLoading = false
      }
    }
  }
</script>

<style scoped>
  header {
    display: flex;
    align-items: flex-end;
    margin-bottom: 1em;
  }

  h1 {
    margin: 0;
  }

  nav {
    margin: 0 0 .25em 1em;
  }

  nav a {
    margin-right: .5em;
  }

  nav .router-link-exact-active {
    color: var(--color-blue);
  }
</style>