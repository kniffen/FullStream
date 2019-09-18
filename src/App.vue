<template>

  <Loading v-if="isLoading" />

  <div id="app" v-else>
    <Header v-bind="{userID, current, chatHidden, settings}" />
    <Media v-bind="{settings, current}" />
    <main>
      <Navigation v-bind="{username}" />
      <router-view id="view" v-bind="{settings, username, userID}" />
    </main>

    <div id="login">
      <div id="login-inner">
        <i id="close-login" class="fsif-cross" v-on:click="closeLogin"></i>

        <img src="./assets/images/logo.png">
        
        <div class="content">
          <p>Get the full benefit of FullStream by loging in with your Twitch account and enjoy features like.</p>
        
          <ul>
            <li>View following channels</li>
            <li>View hosted channels</li>
            <li>View following games</li>
            <li>Follow/Unfollow channels</li>
            <li>View subscription status for channels</li>
          </ul>
        </div>
        
        <a 
          class="cta-twitch"
          v-bind:href="`https://id.twitch.tv/oauth2/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token&scope=${scopes}`"
          ><i class="fsif-twitch"></i>Log in with Twitch</a>
      </div>
    </div>

  </div>

</template>

<script>
  import Loading    from './components/Loading'
  import Header     from './components/Header'
  import Media      from './components/Media'
  import Navigation from './components/Navigation'

  import fetchFollowingStreams  from './functions/fetch-following-streams'
  import fetchStream            from './functions/fetch-stream'
  import fetchChannel           from './functions/fetch-channel'
  import fetchVideo             from './functions/fetch-video'
  import fetchClip              from './functions/fetch-clip'
  import fetchSearch            from './functions/fetch-search'

  export default {
    name: 'App',

    components: {Loading, Header, Media, Navigation},

    data: function() {
      return {
        isLoading:       true,
        clientID:        process.env.CLIENT_ID,
        scopes:          process.env.SCOPES,
        redirectURI:     window.location.origin,
        username:        '',
        userID:          '',
        mainHidden:      false,
        chatHidden:      false,
        current: {
          channel: null,
          video:   null,
          clip:    null,
          pip:     null,
        },
        settings:    {
          chatEnabled:        true,
          animationsEnabled:  true,
          theme:              'dark',
          pipLocation:        'top-right',
          chatLocation:       'right',
          showPremieres:      true,
          showReruns:         true,
          showHosted:         true,
          showCategories:     true,
          showOffline:        false,
          switcherChannels:   [],
          showViewerCount:    true,
          showViewCount:      false,
          showMediaStats:     false,
          showUptime:         true,
        }
      }
    },

    methods: {
      setBodyClasses: function() {
        const classes = [
          `theme-${this.settings.theme}`,
          this.mainHidden ? 'main-hidden' : 'main-visible',
          this.chatHidden ? 'chat-hidden' : 'chat-visible',
          `chat-location-${this.settings.chatLocation}`
        ]

        document.body.classList.value = classes.join(' ')
      },

      checkRoute: async function() {
        const params = this.$route.path.split('/')

        if (params[1] == 'watch') {
          const searchResults = await fetchSearch("users", params[2].toLowerCase())
          const id = searchResults.find(entry => entry.name.toLowerCase() == params[2].toLowerCase()).id
          let channel = await fetchStream(id, this.userID) 
          
          if (!channel) channel = await fetchChannel(id, this.userID)
          
          if (!channel) return 

          this.current.video   = null
          this.current.clip    = null
          this.current.channel = channel

        } else if (params[1] == 'video') {
          const video = await fetchVideo(params[2], this.userID)

          if (!video) return
          this.current.channel = null
          this.current.clip    = null
          this.current.video   = video
        
        } else if (params[1] == 'clip') {
          const clip = await fetchClip(params[2], this.userID)

          if (!clip) return

          this.current.channel = null
          this.current.video   = null
          this.current.clip    = clip
        }

        this.mainHidden = ['watch', 'video', 'clip'].includes(params[1])
      },

      closeLogin: function() {
        document.body.classList.remove('show-login')
      }
    },

    created: function() {
      this.$root.$on('toggle-chat', () => {
        this.chatHidden = !this.chatHidden
      })
    },

    mounted: async function() {
      if (localStorage.settings) {
        const settings = JSON.parse(localStorage.settings)
      
        Object.keys(settings).forEach(key => {
          this.settings[key] = settings[key]
        })
      }

      const tokenStr = /access_token=([^&]+)/.exec(window.location.hash.substring(1))

      if (tokenStr) {
        localStorage.token = tokenStr[1]
        this.$router.push('/following')
      }

      if (localStorage.token) {
        const data = await fetch(
          'https://id.twitch.tv/oauth2/validate', {
            headers: {
              'Authorization': `OAuth ${localStorage.token}`
            }
          }).then(res => res.json())

        if (data.status && data.status != 200) {
          delete localStorage.token
          this.$router.push('/streams')

        } else {
          this.username = data.login
          this.userID   = data.user_id
        }
      }
      
      setInterval(async () => {
        if (this.current.channel) {
          let channel = await fetchStream(this.current.channel.id, this.userID) 
          
          if (!channel) channel = await fetchChannel(this.current.channel.id, this.userID)
          
          if (channel) this.current.channel = channel
        }
      }, 60000)

      this.checkRoute()
      this.setBodyClasses()
      this.isLoading = false
    },

    watch: {
      $route: function(to, from) {
        this.checkRoute()
      },
      mainHidden: function() {
        this.setBodyClasses()
      },
      chatHidden: function() {
        this.setBodyClasses()
      },
      settings: {
        handler:function() {
          this.setBodyClasses()
        },
        deep: true
      }
    }
  }
</script>

<style scoped>
  #app {
    background-color: var(--color-bg);
    color: var(--color-text);
    height: 100%;
  }
  
  #login {
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    display: none;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    justify-content: center;
    align-content: center;
    z-index: 100;
  }

  .show-login #login {
    display: grid;
  }

  #login-inner {
    position: relative;
    background-color: var(--color-bg);
    padding: 2em;
    display: grid;
    justify-content: center;
    align-content: center;
    grid-gap: 1em;
    max-width: 400px;
  }

  
  #login-inner img {
    width: 400px;
    height: auto;
    margin: 0 auto;
  }

  #login-inner p {
    text-align: center;
  }

  #login-inner ul {
    margin-top: 1em;
  }

  #login-inner .cta-twitch {
    margin: 0 auto;
  }

  #close-login {
    position: absolute;
    top: 1em;
    right: 1em;
    cursor: pointer;
  }

  #app {
    display: grid;
    grid-template-rows: minmax(50px, auto) minmax(0, 1fr);
    overflow: hidden;
  }

  main {
    position: absolute;
    background-color: var(--color-bg);
    width: 100%;
    height: calc(100vh - 41px - 1em);
    z-index: 100;
    margin-top: 200vh;
    display: grid;
    grid-template-columns: 50px minmax(0, 1fr);
    transition: margin .5s ease-in-out;
    overflow: hidden;
  }

  .main-visible main {
    margin-top: calc(41px + 1em);
  }

  #view {
    overflow-y: auto;
    padding: 1.5em;
  }

  
</style>