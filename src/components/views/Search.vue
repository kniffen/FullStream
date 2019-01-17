<template>
  <div id="search">
    <h1><i class="fsif-search"></i>Search</h1>

    <form id="search-form">
      <input id="search-query" v-model="query" placeholder="query" />
      <select id="search-type" v-model="type">
        <option value="streams">Streams</option>
        <option value="users">Users</option>
        <option value="games">Categories</option>
      </select>
    </form>

    <Loading v-if="isLoading" />

    <div class="stream-list" v-else-if="type == 'streams'">
      <Stream v-for="_stream in streams" :key="_stream.id" v-bind="_stream" />
    </div>

    <div class="user-list" v-else-if="type == 'users'">
      <User v-for="user in users" :key="user.id" v-bind="user" />
    </div>

    <div class="category-list" v-else-if="type == 'games'">
      <Category v-for="game in games" :key="game.id" v-bind="game" />
    </div>

  </div>
</template>

<script>
  import Loading  from '../Loading'
  import Stream   from '../boxes/Stream'
  import User     from '../boxes/User'
  import Category from '../boxes/Category'

  import fetchSearch from '../../functions/fetch-search'

  export default {
    name: 'Search',

    components: {Loading, Stream, User, Category},

    data: function() {
      return {
        isLoading:  false,
        query:      '',
        type:       'streams',
        streams:    [],
        users:      [],
        games:      [],
      }
    },

    watch: {
      query: async function() {

        const query = this.query

        setTimeout(async () => {
          this.streams  = []
          this.users    = []
          this.games    = []

          if (this.query.length < 3 || query != this.query) return

          this.isLoading = true
          const data = await fetchSearch(this.type, this.query)

          this[this.type] = data
          this.isLoading  = false
        }, 500)
      
      },

      type: function() {
        this.query = ''
      }
    }
  }
</script>

<style scoped>
  #search-form {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, auto);
    margin-bottom: 2em;
  }

  #search-query,
  #search-type {
    background-color: var(--color-bg-3);
    border: 1px solid var(--color-border);
    padding: .5em;
    color: var(--color-text);
    font-size: 1.4rem;
  }
</style>