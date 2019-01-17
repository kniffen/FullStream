<template>
  <i v-bind:class="iconFontClassName"></i>
</template>

<script>
  export default {
    name: 'CategoryIcon',

    props: ['name'],

    data: function() {
      return {
        iconFontClassName: 'fsif-gamepad',
        icons: [
          {
            className: 'headphones',
            categories: [
              'Music & Performing Arts'
            ]
          },
          {
            className: 'microphone',
            categories: [
              'Just Chatting',
              'Talk Shows & Podcasts'
            ]
          },
          {
            className: 'brush',
            categories: [
              'Art',
              'Creative',
            ]
          },
          {
            className: 'soccer',
            categories: [
              'FIFA 19',
              'FIFA 18',
              'FIFA 17',
              'FIFA 16',
              'FIFA 15',
              'FIFA 14',
              'FIFA Online 4',
            ]
          },
          {
            className: 'truck',
            categories: [
              'Euro Truck Simulator',
              'Euro Truck Simulator 2'
            ]
          },
          {
            className: 'truck-2',
            categories: [
              'American Truck Simulator',
            ]
          },
          {
            className: 'pawn',
            categories: [
              'Chess',
            ]
          },
          {
            className: 'tv',
            categories: [
              'Always On',
            ]
          },
          {
            className: 'counterstrike',
            categories: [
              'Counter-Strike: Global Offensive',
              'Counter-Strike Online 2',
              'Counter-Strike: Source',
              'Counter-Strike Neo',
              'Counter-Strike Online',
              'Counter-Strike: Condition Zero',
              'Counter-Strike 2D',
              'Counter-Strike Nexon: Zombies',
            ]
          },
          {
            className: 'dota',
            categories: [
              'Dota 2',
            ]
          },
          {
            className: 'elitedangerous',
            categories: [
              'Elite: Dangerous',
              'Elite Dangerous: Arena',
            ]
          },
          {
            className: 'fortnite',
            categories: [
              'Fortnite',
            ]
          },
          {
            className: 'hearthstone',
            categories: [
              'Hearthstone',
            ]
          },
          {
            className: 'leagueoflegends',
            categories: ['League of Legends']
          },
          {
            className: 'minecraft',
            categories: [
              'Minecraft', 
              'Minecraft: Dungeons', 
              'Minecraft: Story Mode', 
              'Minecraft: Story Mode - Season Two']
          },
          {
            className: 'overwatch',
            categories: ['Overwatch']
          },
        ]
      }
    },

    methods: {
      setIcon: function() {
        const icon = this.icons.find(icon => icon.categories.includes(this.name))
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

