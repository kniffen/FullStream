<template>
  
  <Channel v-bind:name="$route.params.name">
    <Loading v-if="isLoading" />

    <div v-else>
      <div class="user-list">
        <User v-for="user in users" :key="user.id" v-bind="user" />
      </div>

      <button class="load-more" v-if="offset >= 0" v-on:click="getUsers">{{isLoadingMore ? 'Loading...' : 'Load more'}}</button>
    </div>
  </Channel>

</template>

<script>
  import Loading from '../../Loading'
  import Channel from '../Channel'
  import User    from '../../boxes/User'

  import fetchFollowingUsers from '../../../functions/fetch-following-users'
  import fetchSearch  from '../../../functions/fetch-search'

  export default {
    name: 'ChannelFollowing',

    components: {Loading, Channel, User},

    data: function() {
      return {
        isLoading:     true,
        isLoadingMore: true,
        users:         [],
        offset:        0
      }
    },

    methods: {
      getUsers: async function() {
        this.isLoadingMore = true
        
        const searchResults = await fetchSearch("users", this.$route.params.name.toLowerCase())
        const user = searchResults.find(entry => entry.name.toLowerCase() == this.$route.params.name.toLowerCase())
        const users = await fetchFollowingUsers(user.id, this.offset)

        this.users         = this.users.concat(users)
        this.offset        = users.length >= 100 ? this.offset + users.length : -1
        this.isLoadingMore = false
      }
    },

    mounted: async function() {
      await this.getUsers()
      this.isLoading = false
    }
  }
</script>