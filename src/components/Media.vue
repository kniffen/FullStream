<template>
  
  <div id="media" v-if="current.channel || current.video || current.clip">
    
    <iframe
      id="video"
      v-bind:src="videoURL"
      frameborder="0" 
      allowfullscreen="false" 
      scrolling="no">
    </iframe>

    <iframe
      v-if="current.channel && settings.chatEnabled"
      id="chat"
      frameborder="0" 
      scrolling="no" 
      v-bind:src="chatURL">
    </iframe>

  </div>

</template>

<script>
  export default {
    name: 'Media',

    props: ['settings', 'current'],

    computed: {
      videoURL: function() {
        const {channel, video, clip} = this.current
        let url

        if (channel) {
          url = `https://player.twitch.tv/?channel=${channel.name}&parent=${process.env.VUE_APP_HOST}`
        } else if (video) {
          url = `https://player.twitch.tv/?video=${video.id}&parent=${process.env.VUE_APP_HOST}`
        } else if (clip) {
          url = `https://clips.twitch.tv/embed?clip=${clip.slug}&tt_medium=clips_api&tt_content=embed&parent=${process.env.VUE_APP_HOST}`
        }

        return url
      },

      chatURL: function() {
        return `https://www.twitch.tv/embed/${this.current.channel.name}/chat?${this.settings.theme == 'dark' ? 'darkpopout' : ''}&parent=${process.env.VUE_APP_HOST}`
      }
    }
  }
</script>

<style scoped>
  #media {
    display: flex;
    transition: 1s ease-in-out;
  }

  .chat-location-left #media {
    flex-direction: row-reverse;
  }

  #video {
    width: 100%;
    height: 100%;
  }

  #chat {
    min-width: 340px;
    height: 100%;
    transition: margin .3s ease-in-out;
  }

  .chat-hidden #chat {
    margin-right: -340px;
  }

  .chat-location-left.chat-hidden #chat {
    margin-right: 0;
    margin-left: -340px;
  }
</style>