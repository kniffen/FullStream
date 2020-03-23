<template>
  
  <Loading v-if="isLoading" />

  <Channel v-bind:name="name" v-else-if="user" v-bind:class="user.streamType" >
    <section class="channel-info">
      <router-link v-bind:to="`/watch/${name}`">
        <img  v-lazy="user.avatar" />
      </router-link>

      <ul>
        <li v-if="user.streamType">{{user.title}}</li>

        <li v-if="user.streamType" v-bind:title="`Category: ${user.category.name}`">
          <CategoryIcon v-bind:name="user.category.name" />{{user.category.name}}
        </li>

        <li v-bind:title="`Joined Twitch ${formatDate(user.created, true)}`">
          <i class="fsif-calendar"></i> {{formatDate(user.created)}}
        </li>

        <li v-bind:title="`${user.followers.toLocaleString()} Followers`">
          <i class="fsif-heart"></i> {{user.followers.toLocaleString()}}
        </li>
        
        <li v-bind:title="`${user.views.toLocaleString()} Views`">
          <i class="fsif-eye"></i> {{user.views.toLocaleString()}}
        </li>

        <li v-if="user.isPartner" v-bind:title="`${user.displayName} is partnered with Twitch.TV`">
          <i class="fsif-twitch"></i> Twitch partner
        </li>

        <li v-if="isSubscribed" v-bind:title="`You are subscribed to ${user.displayName}`">
          <i class="fsif-sub"></i> Subscribed
        </li>
      
        <li v-if="teams.length > 0" class="channel-teams">
          <i class="fsif-users" title="Teams"></i>
          <router-link v-for="team in teams" :key="team.id" v-bind:to="`/team/${team.name}`">{{team.displayName}}</router-link>
        </li>

        <li class="channel-buttons">
          <button 
            class="cta" 
            v-if="userID && userID != user.id"
            @click="toggleFollow"
            @mouseover="mouseOver"
            @mouseout="mouseOut"
          >{{followBtnText}}</button>

          <a class="cta-twitch" v-bind:href="`https://www.twitch.tv/${user.name}`" target="_blank"><i class="fsif-twitch"></i> View on twitch</a>
        </li>

        <li>
          <div class="channel-thumbnail">
            <router-link class="channel-link" v-bind:to="`/watch/${name}`">
              <i class="fsif-play"></i>
            </router-link>

            <img v-if="user.thumbnail" v-lazy="user.thumbnail.replace('{width}', '1280').replace('{height}', '720')">
          </div>
        </li>
      
      </ul>
    </section>
  </Channel>

  <div v-else>
    <p>Could not find channel "{{name}}"</p>
  </div>

</template>

<script>
  import moment from 'moment'

  import Loading      from '../../Loading'
  import Channel      from '../Channel'
  import CategoryIcon from '../../icons/CategoryIcon'

  import fetchChannel from '../../../functions/fetch-channel'
  import fetchStream  from '../../../functions/fetch-stream'
  import fetchTeams   from '../../../functions/fetch-teams'
  import fetchSearch  from '../../../functions/fetch-search'

  import checkFollowStatus       from '../../../functions/check-follow-status'
  import checkSubscriptionStatus from '../../../functions/check-subscription-status'
  
  import follow   from '../../../functions/follow'
  import unfollow from '../../../functions/unfollow'

  export default {
    name: 'ChannelInfo',

    components: {Channel, Loading, CategoryIcon},

    props: ['userID'],

    data: function() {
      return {
        name:          this.$route.params.name,
        isLoading:     true,
        user:          null,
        teams:         [],
        isFollowing:   false,
        isSubscribed:  false,
        followBtnText: 'Follow',
      }
    },

    methods: {
      formatDate: function(date, verbose) {
        return verbose ? moment(date).format('LLLL') : moment(date).format('LL')
      },

      toggleFollow: async function() {
        this.followBtnText = 'Loading...'

        if (this.isFollowing) {
          const success = await unfollow(this.userID, this.user.id)
          this.isFollowing = !success
          this.followBtnText = 'Follow'
        } else {
          const success = await follow(this.userID, this.user.id)
          this.isFollowing = success
          this.followBtnText = 'Following'
        }
      },

      mouseOver: function() {
        this.followBtnText = this.isFollowing ? 'Unfollow' : 'Follow'
      },

      mouseOut: function() {
        this.followBtnText  = this.isFollowing ? 'Following' : 'Follow'
      },

      fetchData: async function() {
        const name   = this.$route.params.name
        
        const searchResults = await fetchSearch("users", name.toLowerCase())
        const id = searchResults.find(entry => entry.name.toLowerCase() == name.toLowerCase()).id
        
        let user = await fetchStream(id, this.userID)

        if (!user) user = await fetchChannel(id, this.userID)
        
        this.name = name
        this.user = user

        fetchTeams({username: user.id}).then(teams  => this.teams = teams)
      
        checkFollowStatus(this.userID, this.user.id).then(success => {
          this.isFollowing   = success
          this.followBtnText = success ? 'Following' : 'Follow'
        })

        checkSubscriptionStatus(this.userID, this.user.id).then(success => {
          this.isSubscribed = success
        })
      }
    },

    mounted: async function() {
      await this.fetchData()
      this.isLoading = false
    },

    watch: {
      $route: async function() {
        this.isLoading = true
        await this.fetchData()
        this.isLoading = false
      }
    }
  }
</script>

<style scoped>
  .channel-info {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: repeat(minmax(0, auto));
    grid-gap: 1em;
    font-size: 1.2rem;
  }
  
  .channel-info ul {
    list-style: none;
    display: grid;
    grid-gap: 1em;
    align-content: start;
    grid-column: 2 / 3;
    grid-row: 1 / 3;
  }

  .channel-thumbnail {
    background-color: var(--color-bg-2);
    position: relative;
  }

  .channel-info img {
    display: block;
    width: 100%;
    height: auto;
  }

  .channel-link {
    background-color: rgba(0,0,0,0.5);
    position: absolute;
    width: 100%;
    height: 100%;
    display: grid;
    align-content: center;
    justify-content: center;
    font-size: 3rem;
    opacity: 0;
    color: var(--color-text);
    transition: opacity .1s ease-in-out;
  }

  .channel-link:hover {
    opacity: 1;
  }

  .channel-teams > a:not(:last-child):after {
    content: ', ';
  }

  .channel-buttons {
    display: flex;
    flex-wrap: wrap;
  }
  
  .cta{
    width: 100px;
    margin-right: 1em;
  }
</style>