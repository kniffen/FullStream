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

    <Pagination :page="page" :pages="pages" :path="`/category/${category.name}`"/>
  </div>
</template>

<script>
  import Loading      from '../Loading'
  import Stream       from '../boxes/Stream'
  import CategoryIcon from '../icons/CategoryIcon'
  import Pagination   from '../elements/Pagination'

  import fetchStreams      from '../../functions/fetch-streams'
  import fetchCategory     from '../../functions/fetch-category'

  export default {
    name: 'Category',

    components: {Loading, Stream, CategoryIcon, Pagination},

    data: function() {
      return {
        isLoading:     true,
        streams:       [],
        pages:         0,
        category: {
          name: 'Category'
        }
      }
    },

    methods: {
      setStreams: async function() {
        this.isLoading = true

        fetchStreams({category: this.category.name, offset: this.page * 100})
          .then(streams => {
            this.pages     = streams.pages
            this.streams   = streams.items
            this.isLoading = false
          })
      }
    },

    mounted: async function() {
      const category = await fetchCategory({name: this.$route.params.name})
      
      if (category) {
        this.category = category
        this.setStreams()
      } else {
        this.category.name = this.$route.params.name
      }
    },

    computed: {
      page: function() {
        return this.$route.params.page > 1 ? this.$route.params.page - 1 : 0
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
  .category {
    display: grid;
    grid-gap: 2em;
    margin-bottom: 2em;
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