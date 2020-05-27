<template>
  <div class="user">
    <router-link class="user-avatar" v-bind:to="`/channel/${name}/videos/archive`">
      <img v-lazy="avatar" />
    </router-link>

    <span>{{displayName}}</span>
  </div>
</template>

<script>
  export default {
    name: 'User',

    props: ['name', 'displayName', 'avatar']
  }
</script>

<style scoped>
  .user {
    display: grid;
    grid-template-columns: minmax(0, 100%);
    text-decoration: none;
  }

  .user-avatar {
    background-color: var(--color-bg-3);
    width: 100%;
    height: auto;
  }

  .user span {
    padding: .5em 0;
  }
</style>