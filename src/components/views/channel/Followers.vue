<template>
  
  <Channel v-bind:name="channelName">
    <Loading v-if="isLoading" />

    <div v-else>
      <div class="user-list">
        <User v-for="user in users" :key="user.id" v-bind="user" />
      </div>

      <Pagination :page="page" :pages="pages" :path="`/channel/${channelName}/followers`" />
    </div>
  </Channel>

</template>

<script>
  import Loading    from '../../Loading'
  import Channel    from '../Channel'
  import User       from '../../boxes/User'
  import Pagination from '../../elements/Pagination'

  import fetchChannelFollowers from '../../../functions/fetch-channel-followers'
  import fetchSearch  from '../../../functions/fetch-search'

  export default {
    name: 'ChannelFollowers',

    components: {Loading, Channel, User, Pagination},

    data: function() {
      return {
        isLoading:     true,
        users:         [],
        pages:         0
      }
    },

    computed: {
      channelName: function() {
        return this.$route.params.name
      },
      page: function() {
        return this.$route.params.page > 1 ? this.$route.params.page - 1 : 0
      }
    },

    methods: {
      setUsers: async function() {
        this.isLoading = true

        const searchResults = await fetchSearch("users", this.channelName.toLowerCase())
        const user          = searchResults.find(entry => entry.name.toLowerCase() == this.channelName.toLowerCase())
        const users         = await fetchChannelFollowers(user.id, this.page * 100)
        
        this.pages     = users.pages
        this.users     = users.items
        this.isLoading = false
      }
    },

    mounted: function() {
      this.setUsers()
    },

    watch: {
      $route: function() {
        this.setUsers()
      }
    }

  }
</script>