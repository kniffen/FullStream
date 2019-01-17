<template>

  <div id="login" v-if="!token">
    <img src="./assets/images/logo.png">
    <p>A simplified interface for watching Twitch.TV</p>
    <a v-bind:href="`https://id.twitch.tv/oauth2/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token&scope=${scopes}`">Log in with Twitch</a>
  </div>

  <Loading v-else-if="isLoading" />

  <div id="app" v-bind:class="`theme-${settings.theme} ${mainHidden ? 'main-hidden' : 'main-visible'} ${chatHidden ? 'chat-hidden' : 'chat-visible'} chat-location-${settings.chatLocation}`" v-else>
    <Header v-bind="{current, chatHidden, settings}" />
    <Media v-bind="{settings, current}" />
    <main>
      <Navigation v-bind="{username}" />
      <router-view id="view" v-bind="{settings, username, userID}" />
    </main>
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

  export default {
    name: 'App',

    components: {Loading, Header, Media, Navigation},

    data: function() {
      return {
        isLoading:   true,
        clientID:    process.env.CLIENT_ID,
        scopes:      process.env.SCOPES,
        redirectURI: window.location.origin,
        token:       localStorage.token,
        username:    '',
        userID:      '',
        mainHidden:  false,
        chatHidden:  false,
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
      checkRoute: async function() {
        const params = this.$route.path.split('/')

        if (params[1] == 'watch') {
          let channel = await fetchStream(params[2]) 
          
          if (!channel) channel = await fetchChannel(params[2])
          
          if (!channel) return 

          this.current.channel = channel

        } else if (params[1] == 'video') {
          const video = await fetchVideo(params[2])

          if (!video) return
          this.current.video = video
        
        } else if (params[1] == 'clip') {
          const clip = await fetchClip(params[2])

          if (!clip) return
          this.current.clip = clip
        }

        this.mainHidden = ['watch', 'video', 'clip'].includes(params[1])
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
        this.token         = tokenStr[1]
        localStorage.token = tokenStr[1]
        this.$router.push('following')
      }

      if (this.token) {
        const data = await fetch(
          'https://id.twitch.tv/oauth2/validate', {
            headers: {
              'Authorization': `OAuth ${this.token}`
            }
          }).then(res => res.json())

        if (data.status && data.status != 200) {
          this.token = null
          delete localStorage.token

        } else {
          this.username = data.login
          this.userID   = data.user_id
          this.checkRoute()
        }
      }

      setInterval(async () => {
        if (this.current.channel) {
          let channel = await fetchStream(this.current.channel.name) 
          
          if (!channel) channel = await fetchChannel(this.current.channel.name)
          
          if (channel) this.current.channel = channel
        }
      }, 60000)

      this.isLoading = false
    },

    watch: {
      $route: function(to, from) {
        this.checkRoute()
      }
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  :root {
    --color-bg:       #17181D;
    --color-bg-2:     #1C1D22;
    --color-bg-3:     #303136;
    --color-text:     #DEDDDD;
    --color-text-2:   #DEDDDD;
    --color-border:   #303136;
    --color-green:    #69B02E;
    --color-blue:     #468BAA;
    --color-purple:   #7E629A;
    font-size: 12px;
  }

  .theme-light{
    --color-bg:       #FAF9FA;
    --color-bg-2:     #DEDDDD;
    --color-bg-3:     #DCDCDC;
    --color-text:     #000000;
    --color-border:   #DEDDDD;
  }

  html,
  body,
  #app {
    height: 100%;
  }

  body {
    background-color: var(--color-bg);
    color: var(--color-text); 
    font-family: 'Roboto', Arial, sans-serif;
    word-wrap: break-word;
    overflow: hidden;
  }

  #app,
  #login {
    background-color: var(--color-bg);
    color: var(--color-text);    
  }

  a {
    color: var(--color-text);
    text-decoration: none;
  }

  a:hover {
    color: var(--color-blue);
  }

  .content a {
    color: var(--color-blue);
  }

  .content a:hover {
    text-decoration: underline;
  }

  h1,
  h2,
  h3 {
    font-weight: 400;
  }

  h1,
  h2 {
    margin-bottom: .5em;
  }

  h1 {
    text-transform: uppercase;
  }

  .content h1,
  .content h2 {
    margin: 0;
    border: 0;
  }

  img {
    max-width: 100%;
    height: auto;
    vertical-align: top;
  }

  ul,
  ol {
    margin-left: 1.5em;
  }

  i {
    font-weight: normal;
    margin-right: .25em;
  }

  .cta,
  .cta-twitch,
  .load-more {
    display: inline-block;
    border: 0;
    background-color: var(--color-blue);
    color: var(--color-text-2);
    padding: .25em .5em;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    vertical-align: bottom;
  }

  .cta-twitch {
    background-color: var(--color-purple);
  }

  .cta:hover,
  .cta-twitch:hover {
    color: var(--color-text);
  }

  .load-more {
    display: block;
    margin: 2em auto;
  }

  #login {
    display: grid;
    height: 100%;
    justify-content: center;
    align-content: center;
    grid-gap: 2em;
  }

  #login img {
    width: 400px;
    height: auto;
  }

  #login p {
    text-align: center;
  }

  #login a {
    background-color: var(--color-purple);
    border-radius: 2px;
    padding: .3em .5em;
    color: var(--color-text);
    text-decoration: none;
    font-weight: 600;
    margin: auto;
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

  .stream-list,
  .category-list,
  .user-list,
  .video-list,
  .team-list,
  .event-list {
    display: grid;
    grid-gap: 1em;
  }

  .stream-list,
  .video-list {
    grid-template-columns: repeat(auto-fill, 240px);
  }

  .category-list {
    grid-template-columns: repeat(auto-fill, 136px);
  }

  .user-list {
    grid-template-columns: repeat(auto-fill, calc(140px - 1em));
  }

  .team-list {
    grid-template-columns: repeat(3, 434px);
  }

  .event-list {
    grid-template-columns: repeat(auto-fill, calc(320px - 1em));
  }

  ::-webkit-scrollbar {
    background-color: var(--color-bg-2);
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--color-bg-3);
  }
</style>