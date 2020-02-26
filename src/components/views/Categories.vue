<template>

  <Loading v-if="isLoading" />

  <div id="categories" v-else>
    <h1><i class="fsif-gamepad"></i>Categories</h1>

    <div class="category-list">
      <Category v-for="category in categories" :key="category.id" v-bind="category" />
    </div>

    <Pagination :page="page" :hasMore="categories.length > 95" path="/categories" />
   </div>
</template>

<script>
  import Loading    from '../Loading'
  import Category   from '../boxes/Category'
  import Pagination from '../elements/Pagination'

  import fetchCategories from '../../functions/fetch-categories'

  export default {
    name: 'Categories',

    components: {Loading, Category, Pagination},

    data: function() {
      return {
        isLoading:  true,
        categories: []
      }
    },

    computed: {
      page: function() {
        return this.$route.params.page > 1 ? this.$route.params.page - 1 : 0
      }
    },

    methods: {
      setCategories: function() {
        this.isLoading  = true
        
        fetchCategories(this.page * 100).then(categories => {
          this.categories = categories.items
          this.isLoading  = false
        })
      }
    },

    mounted: function() {
      this.setCategories()
    },

    watch: {
      $route: function() {
        this.setCategories()
      }
    }
  }
</script>