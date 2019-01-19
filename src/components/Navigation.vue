<template>
  <nav>
    <router-link v-if="hasToken" v-bind:to="`/channel/${username}`"><i class="fsif-user"></i></router-link>
    <router-link v-if="hasToken" to="/following"><i class="fsif-heart"></i></router-link>
    <router-link to="/streams"><i class="fsif-camera"></i></router-link>
    <router-link to="/categories"><i class="fsif-gamepad"></i></router-link>
    <router-link to="/videos"><i class="fsif-video"></i></router-link>
    <router-link to="/search"><i class="fsif-search"></i></router-link>
    <router-link to="/settings"><i class="fsif-cogs"></i></router-link>
    <router-link to="/about"><i class="fsif-info"></i></router-link>
  </nav>  
</template>

<script>
  export default {
    name: 'Navigation',

    props: ['username'],

    data: function() {
      return {
        hasToken: localStorage.token ? true : false
      }
    }
  }
</script>

<style scoped>
  nav {
    background-color: var(--color-bg-3);
    display: grid;
    grid-template-rows: repeat(auto-fill, 50px)
  }

  nav a {
    line-height: 50px;
    text-align: center;
    transition: background-color .1s ease-in-out;
  }

  nav a:hover,
  nav a.router-link-active {
    background-color: var(--color-blue);
    color: var(--color-text);
  }

  i {
    font-size: 1.4rem;
  }
</style>