<template>
  <div class="stream">

    <div class="stream-preview">
      <router-link class="stream-link" v-bind:to="`/watch/${name}`">
        <i class="fsif-play"></i>
      </router-link>

      <img
        v-if="isLazy" 
        class="stream-thumbnail" 
        v-lazy="`${thumbnail.replace('{width}', '240').replace('{height}', '135')}?timestamp=${Date.now()}`" />

      <img
        v-if="!isLazy" 
        class="stream-thumbnail" 
        :src="`${thumbnail.replace('{width}', '240').replace('{height}', '135')}?timestamp=${Date.now()}`" />


      <div class="channel-identity">
        <img :src="avatar">
        <router-link v-bind:to="`/channel/${name}`">{{displayName}}</router-link>
      </div>
    </div>
  
    <div class="stream-details">
      <span>{{title}}</span>

      <router-link v-if="category.name" v-bind:to="`/category/${encodeURIComponent(category.name)}`">
        <CategoryIcon v-bind:name="category.name" />{{category.name}}
      </router-link>
    
      <div class="stream-meta">
        <span v-bind:title="`${viewers.toLocaleString()} Viewers`">
          <i class="fsif-user"></i>{{viewers.toLocaleString()}}
        </span>
        <span v-if="uptime" v-bind:title="`uptime: ${uptime}`">
          <i class="fsif-clock"></i>{{uptime}}
        </span>
      </div>

      <div v-if="hosts" class="stream-hosts">
        <span>Hosted by:</span>
        <router-link 
          v-for="host in hosts" 
          :key="host.id" v-bind:to="`/channel/${host.name}`"
        >{{host.displayName}}</router-link>
      </div>
    </div>
  
  </div>
</template>

<script>
  import moment from 'moment'

  import CategoryIcon from '../icons/CategoryIcon'
  
  export default {
    name: 'StreamBox',

    components: {CategoryIcon},

    props: [
      'name',
      'displayName',
      'avatar',
      'thumbnail',
      'title',
      'category',
      'viewers',
      'hosts',
      'started',
      'lazy'
    ],

    data: function() {
      return {
        uptime: '',
        isLazy: this.lazy !== undefined ? this.lazy : true
      }
    },

    methods: {
      setUptime: function() {
        if (this.started) this.uptime = moment(this.started).fromNow(true)
      }
    },

    mounted: function() {
      this.setUptime()
      setInterval(() => this.setUptime(), 60000)
    }

  }
</script>

<style scoped>
  .stream-preview {
    background-color: var(--color-bg-3);
    position: relative;
    display: block;
    height: 135px;
    overflow: hidden;
  }

  .stream-thumbnail {
    width: 100%;
  }

  .stream-link {
    background-color: rgba(0,0,0,0.5);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: grid;
    align-content: center;
    justify-content: center;
    font-size: 2rem;
    opacity: 0;
    color: var(--color-text);
    transition: opacity .1s ease-in-out;
  }

  .stream-link:hover {
    opacity: 1;
  }

  .channel-identity {
    position: absolute;
    background-color: var(--color-bg);
    left: .5em;
    bottom: .5em;
    display: grid;
    grid-template-columns: 30px minmax(0, auto);
    line-height: 30px;
  }

  .channel-identity a {
    padding: 0 .5em;
  }

  .stream-details {
    padding: .5em 0 0;
    display: grid;
    grid-template-columns: minmax(0, 100%);
    grid-gap: .5em;
  }

  .stream-meta > span {
    margin-right: .5em;
  }

  .stream-hosts {
    display: flex;
    flex-wrap: wrap;
  }

  .stream-hosts span,
  .stream-hosts a:not(:last-child) {
    margin-right: .5em;
  }

  .stream-hosts a:not(:last-child):after {
    content: ',';
  }
</style>