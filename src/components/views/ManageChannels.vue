<template>
  <Loading v-if="isLoading" />

  <div id="manageChannels" v-else>
    <h1>Manage following channels</h1>

    <div class="channels">
      <div class="channel" v-for="channel in channels" :id="channel.id">
        <img v-lazy="channel.avatar">
        <div>
          <router-link v-bind:to="`/channel/${channel.name}`">{{channel.displayName}}</router-link>
          <span>Followed since<br>{{formatDate(channel.followedSince.toLocaleString())}}</span>
          <button 
            class="cta" 
            v-on:click="toggleFollow(channel.id)"
          >{{channel.isFollowing ? 'Unfollow' : 'Follow'}}</button>
        </div>
      </div>
    </div>

    <div class="pagination">
      <router-link
        v-for="n in pages" 
        :to="n > 1 ? `/settings/manage-channels/page/${n}` : `/settings/manage-channels`"
      >{{n}}</router-link>
    </div>    
  </div>
</template>

<script>
  import moment from 'moment'

  import Loading from '../Loading'

  import fetchFollowingUsers from '../../functions/fetch-following-users'
  import follow              from '../../functions/follow'
  import unfollow            from '../../functions/unfollow'

  export default {
    name: 'ManageChannels',

    components: {Loading},

    props: ['userID'],

    data: function() {
      return {
        isLoading: true,
        channelID: null,
        pages:     0,
        channels:  []
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
      formatDate: function(date, full) {
        return moment(date).format('LL')
      },

      setChannels: async function() {
        this.isLoading = true
  
        const channels = await fetchFollowingUsers(this.userID, this.page * 100)
      
        this.pages = channels.pages
        this.channels = channels.items.map(channel => {
          channel.isFollowing = true
          return channel
        })
        this.isLoading = false
      },

      toggleFollow: async function(id) {
        const channel = this.channels.find(channel => channel.id == id)

        if (channel.isFollowing) {
          const success = await unfollow(this.userID, channel.id)
          channel.isFollowing = !success
        } else {
          const success = await follow(this.userID, channel.id)
          channel.isFollowing = success
        }

      },
    },

    mounted: async function() {
      this.setChannels()
    },

    watch: {
      $route: function() {
        this.setChannels()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .channels {
    display: grid;
    grid-template-columns: repeat(auto-fill, 250px);
    grid-gap: 1em;
  }

  .channel {
    display: grid;
    grid-template-columns: 100px minmax(0, 1fr);
    grid-gap: .5em;
  }

  .channel img {
    background-color: var(--color-bg-2);
    width: 100px;
    height: 100px;
  }

  .channel > div {
    display: grid;
    grid-gap: .25em;
    align-content: start;
    justify-items: start;
  }

  .pagination {
    display: flex;
    margin: 2em 0;
    justify-content: center;

    a {
      background-color: var(--color-blue);
      padding: 5px;

      &:not(:last-child) {
        margin-right: 10px;
      }

      &:hover {
        color: var(--color-white);
      }
    }
  }
</style>