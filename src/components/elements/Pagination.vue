<template>
  <div class="pagination pagination-simple">
    <router-link v-if="page == 1" :to="path">Prev</router-link>
    <router-link v-if="page >= 2" :to="`${path}/page/${page}`">Prev</router-link>
    <router-link v-if="hasMore" :to="`${path}/page/${page+2}`">Next</router-link>
  </div>
</template>

<script>
  export default {
    name: "Pagination",

    props: ["page", "path", "simple", "hasMore"]
  }
</script>

<style scoped lang="scss">
  .pagination {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 25px));
    grid-gap: 10px;
    font-weight: bold;
    justify-content: center;
    margin: 2em 0;

    a {
      background-color: var(--color-bg-3);
      padding: 5px;
      height: 20px;
      line-height: 20px;
      text-align: center;
    }

    a.current,
    a:hover,
    a:focus {
      background-color: var(--color-blue);
      color: var(--color-text);
    }
  }

  .pagination-simple {
    grid-template-columns: repeat(auto-fit, minmax(0, 100px));
  }
</style>

