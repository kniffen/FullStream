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

    <Pagination :page="page" :pages="pages" :path="`/streams/${type}`"/>
  </div>
</template>

<script>
  import Loading    from '../Loading'
  import Stream     from '../boxes/Stream'
  import Pagination from '../elements/Pagination'

  import fetchStreams from '../../functions/fetch-streams'

  export default {
    name: 'Streams',

    components: {Loading, Stream, Pagination},

    data: function() {
      return {
        isLoading: true,
        streams:   [],
        pages:     0,
      }
    },

    methods: {
      setStreams: async function() {
        this.isLoading = true

        fetchStreams({
          offset:   this.page > 0 ? this.page * 100 : 0,
          featured: this.type == 'featured'
        })
          .then(streams => {
            this.pages     = streams.pages
            this.streams   = streams.items
            this.isLoading = false
          })
      }
    },

    mounted: function() {
      this.setStreams()
    },

    computed: {
      type: function() {
        return this.$route.params.type
      },
      page: function() {
        return this.$route.params.page - 1 || 0
      }
    },

    watch: {
      $route: function() {
        this.setStreams()
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