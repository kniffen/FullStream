<template>
  <div class="category">
    <router-link class="category-box-art" v-bind:to="`/category/${encodeURIComponent(name)}`">
      <img v-lazy="boxArt">
    </router-link>

    <div class="category-details">
      <span>
        <CategoryIcon v-bind:name="name" />{{name}}
      </span>
      
      <span v-if="viewers" v-bind:title="`${viewers.toLocaleString()} Viewers`">
        <i class="fsif-user"></i>{{viewers.toLocaleString()}}
      </span>

      <span v-if="streams" v-bind:title="`${streams.toLocaleString()} Streams`">
        <i class="fsif-camera"></i>{{streams.toLocaleString()}}
      </span>
    </div>
  </div>
</template>

<script>
  import CategoryIcon from '../icons/CategoryIcon'

  export default {
    name: 'Category',

    props: ['name', 'boxArt', 'streams', 'viewers'],

    components: {CategoryIcon}
  }
</script>

<style scoped>
  .category {
    text-decoration: none;
  }

  .category-box-art {
    display: block;
    background-color: var(--color-bg-2);
    width: 136px;
    height: 190px;
  }

  .category-details {
    display: grid;
    grid-gap: .5em;
    padding: .5em 0;
  }
</style>