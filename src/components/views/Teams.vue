<template>

  <Loading v-if="isLoading" />

  <div id="teams" v-else>
    <h1>Teams</h1>

    <div class="team-list">
      <Team v-for="team in teams" :key="team.id" v-bind="team" />
    </div>

    <button class="load=more" v-if="offset >= 0" v-on:click="fetchMoreTeams">Load more</button>
  </div>

</template>

<script>
  import Loading from '../Loading'
  import Team    from '../boxes/Team'

  import fetchTeams from '../../functions/fetch-teams'

  export default {
    name: 'Teams',

    components: {Loading, Team},

    props: ['clientID'],

    data: function() {
      return {
        isLoading: true,
        teams:     [],
        offset:    0,
      }
    },

    methods: {
      fetchMoreTeams: async function() {
        const teams = await fetchTeams(this.clientID, this.offset)

        if (teams.length >= 100) {
          this.teams = this.teams.concat(teams.filter(team => !this.teams.find(existing => existing.id == team.id)))
          this.offset += 100
        } else {
          this.offset = -1
        }
      }
    },

    mounted: async function() {
      this.teams = await fetchTeams(this.clientID)
      this.offset += 100
      this.isLoading = false
    }
  }
</script>