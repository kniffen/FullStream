<template>
  
  <Channel v-bind:name="$route.params.name">
    <Loading v-if="isLoading" />

    <div v-else>
      <div class="event-list">
        <Event v-for="event in events" :key="event.id" v-bind="event" />
      </div>
    </div>
  </Channel>

</template>

<script>
  import Loading from '../../Loading'
  import Channel from '../Channel'
  import Event   from '../../boxes/Event'

  import fetchChannel from '../../../functions/fetch-channel'
  import fetchEvents  from '../../../functions/fetch-events'
  import fetchSearch  from '../../../functions/fetch-search'

  export default {
    name: 'ChannelEvents',

    components: {Loading, Channel, Event},

    data: function() {
      return {
        isLoading: true
      }
    },

    asyncComputed: {
      events: async function() {
        const searchResults = await fetchSearch("users", this.$route.params.name.toLowerCase())
        const id = searchResults.find(entry => entry.name.toLowerCase() == this.$route.params.name.toLowerCase()).id

        if (id) return await fetchEvents(id)
      }
    },

    mounted: async function() {
      this.isLoading = false
    }
  }
</script>