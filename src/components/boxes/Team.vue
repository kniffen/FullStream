<template>
  <router-link v-bind:class="`team${banner ? '' : ' no-banner'}`" v-bind:to="`/team/${name}`">
    <img v-if="banner" class="banner" v-bind:src="banner">
    <span class="team-name">{{displayName}}</span>
  </router-link>
</template>

<script>
  export default {
    name: 'Team',

    props: ['name', 'displayName', 'banner', 'logo', 'info']
  }
</script>

<style scoped>
  .team {
    background-color: var(--color-bg-3);
    position: relative;
    display: block;
    min-height: 85px;
    overflow-y: hidden;
  }

  .team:hover {
    color: var(--color-text);
  }

  .team-name {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    align-content: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 600;
    opacity: 0;
  }

  .team.no-banner .team-name {
    background-color: transparent;
    opacity: 1;
  }

  .team:hover .team-name {
    background-color: var(--color-blue);
  }

  .team:not(.no-banner):hover .team-name {
    opacity: .9;
  }
</style>