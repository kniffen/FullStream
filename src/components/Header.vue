<template>
  
  <header>
    
    <div v-if="current.channel || current.video || current.clip" class="header-info">
      <img class="header-image" v-lazy="image" />
      <div>
        <div class="header-title">{{title}}</div>
        <div class="header-details">
          <router-link v-bind:title="displayName" v-bind:to="`/channel/${name}`">
            <ChannelIcon v-bind:name="name" />{{displayName}}
          </router-link>
          
          <router-link 
            v-if="category" 
            v-bind:title="category" 
            v-bind:to="`/category/${encodeURIComponent(category)}`"
          >
            <CategoryIcon v-bind:name="category"/>{{category}}
          </router-link>
          
          <span v-if="viewers && settings.showViewerCount" v-bind:title="`${viewers.toLocaleString()} viewers`">
            <i class="fsif-user"></i>{{viewers.toLocaleString()}}
          </span>
          
          <span v-if="views && settings.showViewCount" v-bind:title="`${views.toLocaleString()} views`">
            <i class="fsif-eye"></i>{{views.toLocaleString()}}
          </span>
          
          <span v-if="mediaStats && settings.showMediaStats" title="resolution and framerate">
            <i class="fsif-image"></i>{{mediaStats}}
          </span>

          <span v-if="uptime && settings.showUptime" v-bind:title="`uptime ${uptime}`">
            <i class="fsif-clock"></i>{{uptime}}
          </span>

          <span v-if="isFollowing" v-bind:title="`You are following ${displayName}`">
            <i class="fsif-heart"></i>Following
          </span>

          <span v-if="isSubscribed" v-bind:title="`You are subscribed to ${displayName}`">
            <i class="fsif-sub"></i>Subscribed
          </span>
        </div>
      </div>
    </div>

    <div v-else class="header-info header-info-default">
      <i class="fsif-monitor"></i>
      <div>
        <div class="header-title">FullStream</div>
        <div class="header-details">
          <span>An alternative twitch interface</span>
        </div>
      </div>
    </div>

    <nav>
      <a 
        v-if="!hasToken"
        href="#" 
        class="cta-twitch" 
        v-on:click="showLogin"
      ><i class="fsif-twitch"></i> Log in</a>

      <span v-if="settings.chatEnabled && current.channel" class="chat-toggle" v-on:click="$root.$emit('toggle-chat')">
        <i class="fsif-chat"></i>
        <i class="fsif-chat-disabled"></i>
      </span>

      <router-link v-if="current.channel && !$route.path.includes('/watch')" 
                   v-bind:to="`/watch/${current.channel.name.toLowerCase()}`"
                   class="menu-toggle"
      >
        <i class="fsif-chevron"></i>
      </router-link>

      <router-link v-if="$route.path.includes('/watch')" v-bind:to="hasToken ? '/following' : '/streams'">
        <i class="fsif-menu"></i>
      </router-link>
      
      <span 
        v-if="current.channel || current.video || current.clip" 
        v-on:click="closeMedia"
        class="close-media"
      >
        <i class="fsif-cross"></i>
      </span>
    </nav>

  </header>

</template>

<script>
  import moment from 'moment'

  import CategoryIcon from './icons/CategoryIcon'
  import ChannelIcon  from './icons/ChannelIcon'

  import checkFollowStatus       from '../functions/check-follow-status'
  import checkSubscriptionStatus from '../functions/check-subscription-status'

  export default {
    name: 'Header',

    props: ['userID', 'current', 'chatHidden', 'settings'],

    components: {CategoryIcon, ChannelIcon},

    data: function() {
      return {
        image:        '',
        title:        '',
        name:         '',
        displayName:  '',
        category:     '',
        mediaStats:   '',
        uptime:       0,
        viewers:      0,
        views:        0,
        isFollowing:  false,
        isSubscribed: false,
      }
    },

    computed: {
      hasToken: function() {
        return localStorage.token ? true : false
      }
    },

    methods: {
      setUptime: function() {
        if (this.current.channel && this.current.channel.started) {
          this.uptime = moment.utc(moment() - moment(this.current.channel.started)).format('H:mm:ss')
        } else {
          this.uptime = 0
        }
      },

      parseCurrent: function() {
        const { channel, video, clip } = this.current

        if (channel) {
          this.id           = channel.id
          this.image        = channel.avatar
          this.title        = channel.title
          this.name         = channel.name
          this.displayName  = channel.displayName
          this.category     = channel.category.name || ''
          this.views        = channel.views
          this.viewers      = channel.viewers
          this.mediaStats   = channel.resolution && channel.fps ? `${channel.resolution}p${channel.fps}` : ''

          checkFollowStatus(this.userID, channel.id)
            .then(success => this.isFollowing = success)
        
          checkSubscriptionStatus(this.userID, channel.id)
            .then(success => this.isSubscribed = success)
        
        } else if (video) {
          this.id           = video.channel.id
          this.image        = video.channel.avatar
          this.title        = video.title
          this.name         = video.channel.name
          this.displayName  = video.channel.displayName
          this.category     = video.category.name || ''
          this.views        = video.views
          this.viewers      = 0
          this.mediaStats   = ''

          checkFollowStatus(this.userID, video.channel.id)
            .then(success => this.isFollowing = success)
            
          checkSubscriptionStatus(this.userID, video.channel.id)
            .then(success => this.isSubscribed = success)
        
        } else if (clip) {
          this.id           = clip.channel.id
          this.image        = clip.channel.avatar
          this.title        = clip.title
          this.name         = clip.channel.name
          this.displayName  = clip.channel.displayName
          this.category     = clip.category.name || '',
          this.views        = clip.views
          this.viewers      = 0
          this.mediaStats   = ''

          checkFollowStatus(this.userID, clip.channel.id)
            .then(success => this.isFollowing = success)
            
          checkSubscriptionStatus(this.userID, clip.channel.id)
            .then(success => this.isSubscribed = success)
        }
      },

      showLogin: function() {
        document.body.classList.add('show-login')
      },

      closeMedia: function() {
        this.current.channel = null
        this.current.video   = null
        this.current.clip    = null

        this.$router.push(this.hasToken ? "/following" : "/streams")
      }
    },

    mounted: function() {
      this.parseCurrent()
      this.setUptime()
      setInterval(this.setUptime, 1000)
    },

    watch: {
      current: {
        handler: function() {
          this.parseCurrent()
        },
        deep: true
      }
    }
  }
</script>

<style scoped>
  header {
    background-color: var(--color-bg-3);
    border-bottom: 1px solid var(--color-bg);
    padding: .5em;
    height: 40px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, auto);
    grid-gap: 1em;
  }

  .header-info {
    display: grid;
    grid-template-rows: minmax(0, 100%);
    grid-template-columns: minmax(0, auto) minmax(0, 1fr);
    grid-gap: .5em;
    font-size: 1.2rem;
  }

  .header-info-default i {
    font-size: 30px;  
  }

  .header-image {
    max-height: 40px;
    margin: auto 0;
  }

  .header-info > div {
    display: grid;
  }

  .header-details {
    font-size: .9rem;
  }

  .header-details > * {
    margin-right: .5em;
  }

  nav {
    display: flex;
    align-items: center;    
    font-size: 1.8rem;
  }

  nav > * {
    margin-right: .5em;
    cursor: pointer;
  }

  .close-media:hover i,
  .chat-toggle:hover i {
    color: var(--color-blue);
  }

  .chat-visible .chat-toggle i:nth-child(2),
  .chat-visible .chat-toggle:hover i:nth-child(1) {
    display: none;
  }

  .chat-visible .chat-toggle:hover i:nth-child(2) {
    display: block;
  }

  .menu-toggle {
    transform: rotate(180deg);
  }

  nav > *:not(.cta-twitch) {
    position: relative;
    width: 1em;
    height: 1em;
  }

  nav > *:not(.cta-twitch) i {
    position: absolute;
  }
</style>