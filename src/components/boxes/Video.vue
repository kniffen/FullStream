<template>
  <div class="video">
    
    <div class="video-preview">
      <router-link class="video-link" v-bind:to="slug ? `/clip/${slug}` : `/video/${id}`">
        <i class="fsif-play"></i>
      </router-link>

      <img v-lazy="thumbnail.replace('{width}', '240').replace('{height}', '135')" />
      
      <img v-if="animatedPreview" v-lazy="animatedPreview" class="video-animated-preview" />

      <div v-if="channel" class="channel-identity">
        <img v-lazy="channel.avatar">
        <router-link v-bind:to="`/channel/${channel.name}/videos/archive`">{{channel.displayName}}</router-link>
      </div>
    </div>

    <div class="video-details">
      <span>{{title}}</span>

      <router-link v-if="category.name" v-bind:to="`/category/${encodeURIComponent(category.name)}`">
        <CategoryIcon v-bind:name="category.name" />{{category.name}}
      </router-link>

      <span v-bind:title="`Published ${date}`">
        <i class="fsif-calendar"></i>{{date}}
      </span>

      <div class="video-meta">
        <span v-bind:title="`${views.toLocaleString()} views`">
          <i class="fsif-eye"></i>{{views.toLocaleString()}}
        </span>
        <span v-bind:title="`Duration ${duration}`">
          <i class="fsif-clock"></i>{{duration}}
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
      'published',
      'animatedPreview'
    ],

    components: {CategoryIcon},

    computed: {
      date: function() {
        return moment(this.published).calendar()
      },

      duration: function() {
        return moment.utc(this.length).format('H:mm:ss')
      }
    }
  }
</script>

<style scoped>
  .video-preview {
    background-color: var(--color-bg-3);
    position: relative;
    display: grid;
    align-content: center;
    width: 240px;
    height: 135px;
    overflow: hidden;
  }

  .video-link {
    background-color: rgba(0,0,0,0.1);
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
    z-index: 1;
    color: var(--color-text);
    transition: opacity .1s ease-in-out;
  }

  .video-preview:hover .video-link {
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
    justify-items: start;
  }

  .video-meta {
    display: flex;
    flex-wrap: wrap;
  }

  .video-meta span {
    margin-right: .5em;
  }

  .video-animated-preview {
    display: none;
    position: absolute;
    top: 0px;
    left: 0;
    animation: animate 10s infinite step-end;
  }

  .video-preview:hover .video-animated-preview {
    display: block;
  }

  @keyframes animate {
    0%   { top: 0px;     }
    10%  { top: -135px;  }
    20%  { top: -270px;  }
    30%  { top: -405px;  }
    40%  { top: -540px;  }
    50%  { top: -675px;  }
    60%  { top: -810px;  }
    70%  { top: -945px;  }
    80%  { top: -1080px; }
    90%  { top: -1215px; }
    100% { top: -1350px; }
  }
</style>