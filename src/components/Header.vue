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

    <nav v-if="ctaPath">
      <span v-if="settings.chatEnabled" class="chat-toggle" v-on:click="$root.$emit('toggle-chat')">
        <i class="fsif-chat"></i>
        <i class="fsif-chat-disabled"></i>
      </span>
      
      <router-link v-bind:to="ctaPath" class="main-toggle">
        <i class="fsif-menu"></i>
        <i class="fsif-chevron"></i>
      </router-link>
    </nav>

  </header>

</template>

<script>
  import moment from 'moment'

  import CategoryIcon from './icons/CategoryIcon'
  import ChannelIcon  from './icons/ChannelIcon'

  export default {
    name: 'Header',

    props: ['current', 'chatHidden', 'settings'],

    components: {CategoryIcon, ChannelIcon},

    data: function() {
      return {
        isMainToggled: true,
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
          this.image       = channel.avatar
          this.title       = channel.title
          this.name        = channel.name
          this.displayName = channel.displayName
          this.category    = channel.category.name || ''
          this.views       = channel.views
          this.viewers     = channel.viewers
          this.mediaStats  = channel.resolution && channel.fps ? `${channel.resolution}p${channel.fps}` : ''
        
        } else if (video) {
          this.image       = video.channel.avatar
          this.title       = video.title
          this.name        = video.channel.name
          this.displayName = video.channel.displayName
          this.category    = video.category.name || ''
          this.views       = video.views
          this.viewers     = 0
          this.mediaStats  = ''
        
        } else if (clip) {
          this.image       = clip.channel.avatar
          this.title       = clip.title
          this.name        = clip.channel.name
          this.displayName = clip.channel.displayName
          this.category    = clip.category.name || '',
          this.views       = clip.views
          this. viewers    = 0
          this.mediaStats  = ''
        }
      }
    },

    mounted: function() {
      this.parseCurrent()

      if (['watch', 'video', 'clip'].includes(this.$route.path.split('/')[1])) {
        this.isMainToggled = false
        this.ctaPath       = '/following'
      }

      this.setUptime()

      setInterval(() => {
        this.setUptime()
      }, 1000)
    },

    watch: {
      $route: function(to, from) {
        if (['watch', 'video', 'clip'].includes(from.path.split('/')[1])) {
          this.isMainToggled = true
          this.ctaPath       = from.path
        } else if (['watch', 'video', 'clip'].includes(to.path.split('/')[1])) {
          this.isMainToggled = false
          this.ctaPath       = from.path
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
    max-height: 100%;
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
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-gap: 1em;
    align-content: center;
    font-size: 1.6rem;
    margin-right: .5em;
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
    transition: all .3s ease-in-out;
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