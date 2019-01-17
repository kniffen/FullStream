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
        if (icon) this.iconFontClassName = `fsif-${icon.className}`        
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