<template>
  
  <header>
    
    <div v-if="current.channel || current.video || current.clip" class="header-info">
      <img class="header-image" v-bind:src="image" />
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
          <span>A simplified twitch interface</span>
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
      
      <router-link v-if="ctaPath" v-bind:to="ctaPath" class="main-toggle">
        <i class="fsif-menu"></i>
        <i class="fsif-chevron"></i>
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

  export default {
    name: 'Header',

    props: ['userID', 'current', 'chatHidden', 'settings'],

    components: {CategoryIcon, ChannelIcon},

    data: function() {
      return {
        hasToken:      localStorage.token ? true : false,
        ctaPath:       '',
        uptime:        0,
        image:         '',
        title:         '',
        name:          '',
        displayName:   '',
        category:      '',
        viewers:       0,
        views:         0,
        mediaStats:    '',
        isFollowing:   false,
        isSubscribed:  false,
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
          this.isFollowing  = channel.isFollowing
          this.isSubscribed = channel.isSubscribed
        
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
          this.isFollowing  = video.channel.isFollowing
          this.isSubscribed = video.channel.isSubscribed
        
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
          this.isFollowing  = clip.channel.isFollowing
          this.isSubscribed = clip.channel.isSubscribed
        }
      
      },

      showLogin: function() {
        document.body.classList.add('show-login')
      },

      closeMedia: function() {
        this.current.channel = null
        this.current.video   = null
        this.current.clip    = null
        
        if (!['watch', 'video', 'clip'].includes(this.ctaPath.split('/')[1])) {
          this.$router.push(this.ctaPath)
        }
      }
    },

    mounted: function() {
      this.parseCurrent()

      if (['watch', 'video', 'clip'].includes(this.$route.path.split('/')[1])) {
        this.ctaPath = '/streams'
      }

      this.setUptime()

      setInterval(() => {
        this.setUptime()
      }, 1000)
    },

    watch: {
      $route: function(to, from) {
        if (['watch', 'video', 'clip'].includes(from.path.split('/')[1])) {
          this.ctaPath = from.path
        } else if (['watch', 'video', 'clip'].includes(to.path.split('/')[1])) {
          this.ctaPath = from.path
        }
      },

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
    font-size: 1.6rem;
    margin-right: .5em;
  }

  nav > * {
    margin-left: 1em;
  }

  .chat-toggle,
  .main-toggle {
    display: block;
    position: relative;
    cursor: pointer;
    width: 1em;
    height: 1em;
    transition: all .2s ease-in-out;
  }

  .chat-toggle:hover,
  .main-toggle:hover {
    color: var(--color-text);
  }

  .chat-toggle > i,
  .main-toggle > i {
    position: absolute;
  }

  .close-media {
    cursor: pointer;
  }

  .chat-visible .chat-toggle .fsif-chat-disabled,
  .chat-visible .chat-toggle:hover .fsif-chat 
  .chat-hidden .chat-toggle .fsif-chat,
  .chat-hidden .chat-toggle:hover .fsif-chat-disabled,
  .main-toggle .fsif-chevron,
  .main-toggle:hover .fsif-menu {
    opacity: 0;
  }

  .chat-visible .chat-toggle:hover .fsif-chat-disabled,
  .chat-hidden .chat-toggle:hover .fsif-chat,
  .main-toggle:hover .fsif-chevron {
    opacity: 1;
  }
  
  .main-visible .main-toggle .fsif-chevron {
    transform: rotate(180deg);
  }

</style>