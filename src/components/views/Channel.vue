<template>
  <div class="channel">
    <header>
      <span class="title">
        <ChannelIcon :name="name" />{{name}}
      </span>
    
      <div class="channel-menu">
        <router-link v-bind:to="`/channel/${name}/videos/archive`">Archive</router-link>
        <router-link v-bind:to="`/channel/${name}/videos/highlight`">Highlights</router-link>
        <router-link v-bind:to="`/channel/${name}/videos/upload`">Uploads</router-link>
        <router-link v-bind:to="`/channel/${name}/clips`">Clips</router-link>
        <router-link v-bind:to="`/channel/${name}/followers`">Followers</router-link>
        <router-link v-bind:to="`/channel/${name}/following`">Following</router-link>
      </div>
    </header>

    <ChannelInfo v-bind="{name, userID}"></ChannelInfo>

    <div class="contents">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import ChannelIcon from '../icons/ChannelIcon'

  import ChannelInfo from  './channel/Info'

  export default {
    name: 'Channel',

    components: {ChannelIcon, ChannelInfo},

    props: ['name', 'userID'],
  }
</script>

<style scoped>
  .channel {
    display: grid;
    grid-gap: 2em;
    align-content: start;
  }

  header {
    display: flex;
    align-items: flex-end;
    border-bottom: 1px solid var(--color-border);
  }

  .title {
    font-size: 2rem;
    text-transform: uppercase;
  }

  .channel-menu {
    margin: 0 0 .25em 1em;
  }

  .channel-menu a {
    margin-right: .5em;
  }

  .channel-menu .router-link-exact-active {
    color: var(--color-blue);
  }

  @media (min-width: 768px) {
    .channel {
      grid-template-columns: 320px 1fr;
    }

    header {
      display: grid;
      grid-template-columns: 320px 1fr;
      grid-gap: 2em;
      grid-column: 1 / 3;
    }

    .channel-menu {
      margin: 0 0 .25em;
    }

    .contents {
      grid-column: 2 / 3;
    }
  }
</style>