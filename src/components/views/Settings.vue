<template>

  <Loading v-if="isLoading" />

  <div id="settings" v-else>
    <h1><i class="fsif-cogs"></i>Settings</h1>

    <section>
      <h2>General</h2>
      <form id="general-settings-form" class="settings-form">

        <div class="setting">
          <span>Chat</span>
          <label for="chat-enabled" class="switch">
            <input type="checkbox" id="chat-enabled" v-model="settings.chatEnabled" />
            <span class="slider"></span>
          </label>
        </div>

        <div class="setting">
          <span>Theme</span>
          <select v-model="settings.theme">
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>

<!--         <div class="setting">
          <span>PiP location</span>
          <select v-model="settings.pipLocation">
            <option value="top-left">Top left</option>
            <option value="top-right">Top right</option>
            <option value="bottom-right">Bottom right</option>
            <option value="bottom-left">Bottom left</option>
          </select>
        </div> -->

        <div class="setting">
          <span>Chat location</span>
          <select v-model="settings.chatLocation">
            <option value="left">Left side</option>
            <option value="right">Right side</option>
          </select>
        </div>
      </form>
    </section>

    <section v-if="hasToken">
      <h2>Following</h2>
      <form id="following-settings-form" class="settings-form">
        <div class="setting">
          <span>Show premieres</span>
          <label for="show-premieres" class="switch">
            <input type="checkbox" id="show-premieres" v-model="settings.showPremieres" />
            <span class="slider"></span>
          </label>
        </div>

        <div class="setting">
          <span>Show reruns</span>
          <label for="show-reruns" class="switch">
            <input type="checkbox" id="show-reruns" v-model="settings.showReruns" />
            <span class="slider"></span>
          </label>
        </div>

        <div class="setting">
          <span>Show hosted</span>
          <label for="show-hosted" class="switch">
            <input type="checkbox" id="show-hosted" v-model="settings.showHosted" />
            <span class="slider"></span>
          </label>
        </div>

        <div class="setting">
          <span>Show categories</span>
          <label for="show-categories" class="switch">
            <input type="checkbox" id="show-categories" v-model="settings.showCategories" />
            <span class="slider"></span>
          </label>
        </div>
        
        <div class="setting">
          <span>Show offline</span>
          <label for="show-offline" class="switch">
            <input type="checkbox" id="show-offline" v-model="settings.showOffline" />
            <span class="slider"></span>
          </label>
        </div>
      </form>
    </section>

    <section>
      <h2>Stream details</h2>
      
      <form id="following-settings-form" class="settings-form">
      
        <div class="setting">
          <span>Show viewers</span>
          <label for="show-viewers" class="switch">
            <input type="checkbox" id="show-viewers" v-model="settings.showViewerCount" />
            <span class="slider"></span>
          </label>
        </div>

        <div class="setting">
          <span>Show views</span>
          <label for="show-views" class="switch">
            <input type="checkbox" id="show-views" v-model="settings.showViewCount" />
            <span class="slider"></span>
          </label>
        </div>

        <div class="setting">
          <span>Show resolution and framerate</span>
          <label for="show-mediastats" class="switch">
            <input type="checkbox" id="show-mediastats" v-model="settings.showMediaStats" />
            <span class="slider"></span>
          </label>
        </div>
        
        <div class="setting">
          <span>Show uptime counter</span>
          <label for="show-uptime" class="switch">
            <input type="checkbox" id="show-uptime" v-model="settings.showUptime" />
            <span class="slider"></span>
          </label>
        </div>
      </form>
    </section>

    <section>
      <h2>Manage channels</h2>

      <div class="channels">
        <div class="channel" v-for="channel in channels" :id="channel.id">
          <img v-bind:src="channel.avatar">
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
    </section>

    <section>
      <h2>Data</h2>

      <button class="cta" v-on:click="eraseData">Erase data</button>

      <br />
      <br />
      
      <div class="content">
        <p>To fully remove FullStream's access to your Twitch account you need to go to your <a href="https://www.twitch.tv/settings/connections" target="_blank">Twitch connections settings</a></p>
      </div>
    </section>

  </div>
</template>

<script>
  import moment from 'moment'

  import Loading from '../Loading'

  import fetchFollowingUsers from '../../functions/fetch-following-users'
  import follow              from '../../functions/follow'
  import unfollow            from '../../functions/unfollow'

  export default {
    name: 'Settings',

    components: {Loading},

    props: ['userID', 'username', 'settings'],

    data: function() {
      return {
        isLoading: true,
        hasToken:  localStorage.token ? true : false,
        channels:  [],
      }
    },

    methods: {
      formatDate: function(date, full) {
        return moment(date).format('LL')
      },

      toggleFollow: async function(id) {
        const channel = this.channels.find(channel => channel.id == id)

        if (channel.isFollowing) {
          const success = await unfollow({userID: this.userID, channelID: channel.id})
          channel.isFollowing = !success
        } else {
          const success = await follow({userID: this.userID, channelID: channel.id})
          channel.isFollowing = success
        }

      },

      eraseData: function() {
        delete localStorage.token
        delete localStorage.settings
        window.location.reload()
      }
    },

    mounted: async function() {
      if (!this.username) {
        this.isLoading = false
        return
      }

      for (let offset = 0; 0 < 1000; offset += 100) {
        const channels = await fetchFollowingUsers(this.username, offset)
        
        channels.forEach(channel => {
          if (!this.channels.find(existing => existing.id == channel.id)) {
            this.channels.push({
              avatar:        channel.avatar,
              id:            channel.id,
              name:          channel.name,
              displayName:   channel.displayName,
              followedSince: channel.followedSince,
              isFollowing:   true,
            })
          }
        })

        if (channels.length < 100) break
      }

      this.channels.sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })

      this.isLoading = false
    },

    watch: {
      settings: {
        handler: function() {
         localStorage.settings = JSON.stringify(this.settings)
       },
       deep: true
      }
    }
  }
</script>

<style scoped>
  section {
    margin-bottom: 3em;
  }

  .settings-form {
    display: grid;
    grid-gap: 1em;
  }

  .setting {
    display: grid;
    grid-gap: .5em;
    grid-template-columns: 120px minmax(0, 100px);
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 16px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-bg-3);
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 12px;
    width: 12px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: var(--color-blue);
  }

  input:focus + .slider {
    box-shadow: 0 0 1px var(--color-blue);
  }

  input:checked + .slider:before {
    transform: translateX(14px);
  }

  select {
    background-color: var(--color-bg-3);
    color: var(--color-text);
    border: 0px;
    padding: .25em;
    margin-right: .5em;
  }

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
</style>