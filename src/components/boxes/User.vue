<template>
  <div class="user">
    <router-link class="user-avatar" v-bind:to="`/channel/${name}`">
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
    background-color: var(--color-bg-2);
    width: 128px;
    height: 128px;
  }

  .user span {
    padding: .5em 0;
  }
</style>