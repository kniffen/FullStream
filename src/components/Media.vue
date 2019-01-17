<template>
  
  <div id="media" v-if="current.channel || current.video || current.clip">
    
    <iframe
      id="video"
      v-bind:src="videoURL()"
      frameborder="0" 
      allowfullscreen="false" 
      scrolling="no">
    </iframe>

    <iframe
      v-if="current.channel && settings.chatEnabled"
      id="chat"
      frameborder="0" 
      scrolling="no" 
      v-bind:src="`https://www.twitch.tv/embed/${current.channel.name}/chat?${settings.theme == 'dark' ? 'darkpopout' : ''}`">
    </iframe>

  </div>

</template>

<script>
  export default {
    name: 'Media',

    props: ['settings', 'current'],

    methods: {
      videoURL: function() {
        const {channel, video, clip} = this.current
        let url

        if (channel) {
          url = `https://player.twitch.tv/?channel=${channel.name}`
        } else if (video) {
          url = `https://player.twitch.tv/?video=${video.id}`
        } else if (clip) {
          url = `https://clips.twitch.tv/embed?clip=${clip.slug}&tt_medium=clips_api&tt_content=embed`
        }

        return url
      }
    },
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