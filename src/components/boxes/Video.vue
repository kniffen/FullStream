<template>
  <div class="video">
    
    <div class="video-preview">
      <router-link class="video-link" v-bind:to="slug ? `/clip/${slug}` : `/video/${id}`">
        <i class="fsif-play"></i>
      </router-link>

      <img v-bind:src="thumbnail.replace('{width}', '240').replace('{height}', '135')" />

      <div v-if="channel" class="channel-identity">
        <img v-bind:src="channel.avatar">
        <router-link v-bind:to="`/channel/${channel.name}`">{{channel.displayName}}</router-link>
      </div>
    </div>

    <div class="video-details">
      <span>{{title}}</span>

      <router-link v-if="category.name" v-bind:to="`/category/${encodeURIComponent(category.name)}`">
        <CategoryIcon v-bind:name="category.name" />{{category.name}}
      </router-link>

      <span v-bind:title="`Published ${formatDate(published)}`">
        <i class="fsif-calendar"></i>{{formatDate(published)}}
      </span>

      <div class="video-meta">
        <span v-bind:title="`${views.toLocaleString()} views`">
          <i class="fsif-eye"></i>{{views.toLocaleString()}}
        </span>
        <span v-bind:title="`Duration ${formatLength(length)}`">
          <i class="fsif-clock"></i>{{formatLength(length)}}
        </span>
      </div>
    </div>

  </div>
</template>

<script>
  import moment from 'moment'

  import CategoryIcon from '../icons/CategoryIcon'

  export default {
    name: 'Video',

    props: [
      'id', 
      'slug',
      'type',
      'thumbnail', 
      'channel', 
      'title', 
      'views', 
      'length', 
      'category', 
      'published'
    ],

    components: {CategoryIcon},

    methods: {
      formatDate: function(date) {
        return moment(date).calendar()
      },
      formatLength: function(length) {
        return moment.utc(length).format('H:mm:ss')
      }
    }
  }
</script>

<style scoped>
  .video-preview {
    background-color: var(--color-bg-2);
    position: relative;
    display: grid;
    align-content: center;
    width: 240px;
    height: 135px;
    overflow: hidden;
  }

  .video-link {
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

  .video-link:hover {
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

  .video-details {
    padding: .5em 0;
    display: grid;
    grid-template-columns: minmax(0, 100%);
    grid-gap: .5em;
  }

  .video-meta {
    display: flex;
    flex-wrap: wrap;
  }

  .video-meta span {
    margin-right: .5em;
  }
</style>