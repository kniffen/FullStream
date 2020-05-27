<template>
  <Loading v-if="isLoading" />
  
  <Channel v-bind="{name, userID}" v-else>
    <div class="user-list" v-if="users && users.length">
      <User v-for="user in users" :key="user.id" v-bind="user" />
    </div>

    <h3 v-else>No users available</h3>

    <Pagination :page="page" :hasMore="users.length > 95" :path="`/channel/${name}/following`"/>
  </Channel>

</template>

<script>
  import Loading    from '../../Loading'
  import Channel    from '../Channel'
  import User       from '../../boxes/User'
  import Pagination from '../../elements/Pagination'

  import fetchFollowingUsers from '../../../functions/fetch-following-users'
  import fetchSearch         from '../../../functions/fetch-search'

  export default {
    name: 'ChannelFollowing',

    components: {Loading, Channel, User, Pagination},

    props: ['username', 'userID'],

    data: function() {
      return {
        isLoading: true,
        users:     []
      }
    },

    computed: {
      name: function() {
        return this.$route.params.name
      },
      page: function() {
        return this.$route.params.page > 1 ? this.$route.params.page - 1 : 0
      }
    },

    methods: {
      setUsers: async function() {
        this.isLoading = true

        const searchResults = await fetchSearch("users", this.name.toLowerCase())
        const user          = searchResults.find(entry => entry.name.toLowerCase() == this.name.toLowerCase())

        if (!user) {
          this.isLoading = false
          return
        }

        const users         = await fetchFollowingUsers(user.id, this.page * 100)

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