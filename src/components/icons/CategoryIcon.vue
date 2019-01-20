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
            className: 'deadbydaylight',
            categories: [
              'Dead by Daylight'
            ]
          },
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
              'Talk Shows & Podcasts',
              'ASMR'
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
          {
            className: 'warframe',
            categories: [
              'Warframe',
            ]
          },
          {
            className: 'star',
            categories: [
              'Special Events',
            ]
          },
          {
            className: 'spade',
            categories: [
              'Poker',
              'Blackjack',
            ]
          },
          {
            className: 'artifact',
            categories: [
              'Artifact',
            ]
          },
          {
            className: 'kingdomhearts',
            categories: [
              'Kingdom Hearts HD I.5 + II.5 Remix',
              'Kingdom Hearts HD II.8: Final Chapter Prologue',
              'Kingdom Hearts – The Story So Far',
              'Kingdom Hearts II',
              'Kingdom Hearts 3D: Dream Drop Distance',
              'Kingdom Hearts: Birth by Sleep',
              'Kingdom Hearts',
              'Kingdom Hearts Union χ[Cross]',
              'Kingdom Hearts HD 1.5 + 2.5 Remix',
              'Kingdom Hearts Re:coded',
              'Kingdom Hearts HD 1.5 ReMIX',
              'Kingdom Hearts: Chain of Memories',
              'Kingdom Hearts III',
              'Kingdom Hearts Re:Chain of Memories',
            ]
          },
          {
            className: 'pokemon',
            categories: [
              'Pokemon: Let\'s Go, Pikachu!/Eevee!',
              'Pokémon Trading Card Game',
              'Pokémon Go',
              'Pokémon Trading Card Game Online',
              'Pokémon Snap',
              'Pokémon Rumble',
              'Pokémon Omega Ruby/Alpha Sapphire',
              'Pokémon Mystery Dungeon: Blue/Red Rescue Team',
              'Pokémon Mystery Dungeon: Explorers of Sky',
              'Pokémon Black/White Version 2',
              'Pokémon HeartGold/SoulSilver',
              'Pokémon Platinum',
              'Pokémon XD: Gale of Darkness',
              'Pokémon Emerald',
              'Pokémon Crystal',
              'Pokémon Black/White',
              'Pokémon Stadium',
              'Pokémon Pinball: Ruby & Sapphire',
              'Pokémon Puzzle League',
              'Pokémon Ranger',
              'Pokémon Gold/Silver',
              'Pokémon Channel',
              'Pokémon Conquest',
              'Pokémon Box',
              'Pokémon FireRed/LeafGreen',
              'Pokémon Diamond/Pearl',
              'Pokémon Sun/Moon',
              'Pokémon Ruby/Sapphire',
              'Pokémon Red/Blue',
            ]
          },
          {
            className: 'rust',
            categories: [
              'Rust',
            ]
          },
          {
            className: 'skyrim',
            categories: [
              'The Elder Scrolls V: Skyrim',
              'Skyrim: Very Special Edition',
            ]
          },
          {
            className: 'starcitizen',
            categories: [
              'Star Citizen',
            ]
          },
          {
            className: 'starcraft-2',
            categories: [
              'StarCraft II',
            ]
          },
          {
            className: 'vr',
            categories: [
              'Virtual Reality',
              'Oculus VR'
            ]
          },
          {
            className: 'atom',
            categories: [
              'Science & Technology',
            ]
          },
        ]
      }
    },

    methods: {
      setIcon: function() {
        const icon = this.icons.find(icon => icon.categories.includes(this.name))
        this.iconFontClassName = icon ? `fsif-${icon.className}` : 'fsif-gamepad'
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

