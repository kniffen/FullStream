<template>
  <i v-bind:class="iconFontClassName"></i>
</template>

<script>
  export default {
    name: 'ChannelIcon',

    props: ['name'],

    data: function() {
      return {
        icons: [
          {
            className: 'bwana',
            channels: ['bwana']
          },
          {
            className: 'discord',
            channels: ['discordapp']
          },
          {
            className: 'categories-elitedangerous',
            channels: ['elitedangerous']
          },
          {
            className: 'twitch',
            channels: [
              'twitch',
              'twitchconcharitystage',
              'twitchconcoolcat',
              'twitchconexpostage',
              'twitchconfrankerz',
              'twitchcongiveplz',
              'twitchconheyguys',
              'twitchconindieworkshop',
              'twitchconpjsugar',
              'twitchdev',
              'twitchpresents',
              'twitchpresents2',
            ]
          },
        ]
      }
    },

    computed: {
      iconFontClassName: function() {
        const icon = this.icons.find(icon => icon.channels.includes(this.name))
        return icon ? `fsif-${icon.className}` : 'fsif-camera' 
      }
    }
  }
</script>