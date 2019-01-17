<template>
  <div class="user">
    <router-link class="user-avatar" v-bind:to="`/channel/${name}`">
      <img v-bind:src="avatar" />
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

  .user span {
    padding: .5em 0;
  }
</style>