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

  export default {
    name: 'ChannelEvents',

    components: {Loading, Channel, Event},

    data: function() {
      return {
        isLoading: true,
        events:    [],
      }
    },

    mounted: async function() {
      const channel = await fetchChannel(this.$route.params.name)
      
      if (channel) this.events = await fetchEvents(channel.id)
      this.isLoading = false
    }
  }
</script>