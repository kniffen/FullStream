<template>
  <i v-bind:class="iconFontClassName"></i>
</template>

<script>
  export default {
    name: 'ChannelIcon',

    props: ['name'],

    data: function() {
      return {
        iconFontClassName: 'fsif-camera',
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

    methods: {
      setIcon: function() {
        const icon = this.icons.find(icon => icon.channels.includes(this.name))
        this.iconFontClassName = icon ? `fsif-${icon.className}` : 'fsif-camera'        
      }
    },

    mounted: function() {
      this.setIcon()
    },

    watch: {
      name: function() {
        this.setIcon()
      }
    }
  }
</script>