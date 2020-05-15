<template>
  <div class="channel">
    <header>
      <span class="title">
        <ChannelIcon v-bind:name="name" />{{name}}
      </span>
    
      <div class="channel-menu">
        <router-link v-bind:to="`/channel/${name}`">Info</router-link>
        <router-link v-bind:to="`/channel/${name}/videos/archive`">Archive</router-link>
        <router-link v-bind:to="`/channel/${name}/videos/highlight`">Highlights</router-link>
        <router-link v-bind:to="`/channel/${name}/videos/upload`">Uploads</router-link>
        <router-link v-bind:to="`/channel/${name}/clips`">Clips</router-link>
        <router-link v-bind:to="`/channel/${name}/followers`">Followers</router-link>
        <router-link v-bind:to="`/channel/${name}/following`">Following</router-link>
      </div>
    </header>

    <slot></slot>
  </div>
</template>

<script>
  import ChannelIcon from '../icons/ChannelIcon'

  export default {
    name: 'Channel',

    components: {ChannelIcon},

    props: ['name'],
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
</style>