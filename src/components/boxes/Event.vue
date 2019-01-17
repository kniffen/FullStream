<template>
  
  <div class="event">
    <img v-bind:src="image.replace('{width}', '320').replace('{height}', '180')" />

    <div class="event-details">
      <span>{{title}}</span>
      <span>{{description}}</span>
      <span v-if="time"><i class="fsif-calendar"></i>{{time}}</span>
    </div>
  </div>

</template>

<script>
  import moment from 'moment'
  
  export default {
    name: 'EventBox',

    props: [
      'title', 
      'image',
      'description',
      'start',
      'end',
    ],

    data: function() {
      return {
        time: ''
      }
    },

    mounted: function() {
      this.time = moment.utc(this.start).local().calendar()
    }
  }
</script>

<style scoped>
  .event-details {
    padding: .5em 0;
    display: grid;
    grid-gap: .5em;
  }
</style>