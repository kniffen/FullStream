<template>
  
  <Channel v-bind:name="$route.params.name">
    <Loading v-if="isLoading" />

    <div v-else>
      <div class="user-list">
        <User v-for="user in users" :key="user.id" v-bind="user" />
      </div>

      <button class="load-more" v-if="offset >= 0" v-on:click="fetchUsers">{{isLoadingMore ? 'Loading...' : 'Load more'}}</button>
    </div>
  </Channel>

</template>

<script>
  import Loading from '../../Loading'
  import Channel from '../Channel'
  import User    from '../../boxes/User'

  import fetchChannelFollowers from '../../../functions/fetch-channel-followers'

  export default {
    name: 'ChannelFollowers',

    components: {Loading, Channel, User},

    data: function() {
      return {
        isLoading:     true,
        isLoadingMore: false,
        users:         [],
        offset:        0
      }
    },

    methods: {
      fetchUsers: async function() {
        this.isLoadingMore = true
        const users = await fetchChannelFollowers(this.$route.params.name, this.offset)
        this.users  = this.users.concat(users)
        this.offset = users.length >= 100 ? this.offset + users.length : -1
        this.isLoadingMore = false
      }
    },

    mounted: async function() {
      await this.fetchUsers()
      this.isLoading = false
    }

  }
</script>