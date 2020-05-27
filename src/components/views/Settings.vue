<template>

  <div id="settings">
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
          <span>Show reruns</span>
          <label for="show-reruns" class="switch">
            <input type="checkbox" id="show-reruns" v-model="settings.showReruns" />
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

      <br />

      <router-link class="cta" to="/settings/manage-channels" :userID="userID">Manage channels</router-link>
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
  export default {
    name: 'Settings',

    props: ['userID', 'username', 'settings'],

    data: function() {
      return {
        hasToken: localStorage.token ? true : false,
      }
    },

    methods: {
      eraseData: function() {
        delete localStorage.token
        delete localStorage.settings
        window.location.reload()
      }
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
</style>