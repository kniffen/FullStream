<template>

  <Loading v-if="isLoading" />

  <div class="category" v-else>
  
    <header>
      <span class="title">
        <CategoryIcon v-bind:name="category.name" />{{category.name}}
      </span>
    </header>

    <div v-if="streams.length > 0" class="stream-list">
      <Stream v-for="_stream in streams" :key="_stream.id" v-bind="_stream" />
    </div>

    <button 
      class="load-more" 
      v-if="streams.length > 0 && offset >= 0" 
      v-on:click="getStreams"
    >{{isLoadingMore ? 'Loading...' : 'Load more'}}</button>
  
  </div>
</template>

<script>
  import Loading      from '../Loading'
  import Stream       from '../boxes/Stream'
  import CategoryIcon from '../icons/CategoryIcon'

  import fetchStreams      from '../../functions/fetch-streams'
  import fetchCategory     from '../../functions/fetch-category'

  export default {
    name: 'Category',

    components: {Loading, Stream, CategoryIcon},

    data: function() {
      return {
        isLoading:     true,
        isLoadingMore: false,
        streams:       [],
        offset:        0,
        category: {
          name: 'Category'
        }
      }
    },

    methods: {
      getStreams: async function() {
        this.isLoadingMore = true

        const streams = 
          await fetchStreams({category: this.category.name, offset: this.offset})
            .then(streams => streams.filter(_stream => !this.streams.find(existing => existing.id == _stream.id)))

        this.streams       = this.streams.concat(streams)
        this.offset        = streams.length >= 100 ? this.offset + 100 : -1
        this.isLoadingMore = false
      }
    },

    mounted: async function() {
      if (!this.$route.params.name) {
        this.isLoading = false
        return
      }

      const category = await fetchCategory({name: this.$route.params.name})
      
      if (category) {
        this.category = category
        await this.getStreams()
      } else {
        this.category.name = this.$route.params.name
      }

      this.isLoading = false
    }
  }
</script>

<style scoped>
  .category {
    display: grid;
    grid-gap: 2em;
    align-content: start;
  }

  header {
    display: flex;
    align-items: flex-end;
    border-bottom: 1px solid var(--color-border);
  }

  .title {
    font-size: 2rem;
    text-transform: uppercase;
  }

  .category-menu {
    margin: 0 0 .25em 1em;
  }

  .cta {
    width: 86px;
  }
</style>