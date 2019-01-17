<template>

  <Loading v-if="isLoading" />

  <div id="team" class="team-container" v-else>
    <h1><i class="fsif-users"></i>{{title}}</h1>
  
    <section v-if="streams.length > 0">
      <h2>Live</h2>
      <div class="stream-list">
        <Stream v-for="_stream in streams" :key="_stream.id" v-bind="_stream" />
      </div>
    </section>

    <section v-if="users.length > 0">
      <h2>Offline</h2>
      <div class="user-list">
        <User v-for="user in users" :key="user.id" v-bind="user" />
      </div>
    </section>

  </div>

</template>

<script>
  import Loading from '../Loading'
  import Stream  from '../boxes/Stream'
  import User    from '../boxes/User'

  import fetchTeam    from '../../functions/fetch-team'
  import fetchStreams from '../../functions/fetch-streams'

  export default {
    name: 'Team',

    components: {Loading, Stream, User},

    data: function() {
      return {
        isLoading: true,
        title:     'Team',
        streams:   [],
        users:     [],
      }
    },

    mounted: async function() {
      if (!this.$route.params.name) {
        this.isLoading = false
        return
      }

      const users    = await fetchTeam(this.$route.params.name)
      const chunks   = []
      let streams    = []

      users.forEach((user, i) => {
        const index = Math.floor(i / 100)
        if (!chunks[index]) chunks[index] = []
        chunks[index].push(user.name)
      })

      for (let i = 0; i < chunks.length; i++) {
        streams = streams.concat(await fetchStreams({channels: chunks[i]}))
      }

      const sortByName = (a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      }

      streams.sort(sortByName)
      users.sort(sortByName)

      this.title     = this.$route.params.name
      this.streams   = streams
      this.users     = users.filter(user => !streams.find(_stream => _stream.id == user.id))
      this.isLoading = false
    }
  }
</script>

<style scoped>
  section {
    margin-bottom: 2em
  }
</style>