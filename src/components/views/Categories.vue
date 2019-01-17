<template>

  <Loading v-if="isLoading" />

  <div id="categories" v-else>
    <h1><i class="fsif-gamepad"></i>Top Categories</h1>

    <div class="category-list">
      <Category v-for="category in categories" :key="category.id" v-bind="category" />
    </div>

    <button class="load-more" v-if="offset >= 0" v-on:click="getCategories">{{isLoadingMore ? 'Loading...' : 'Load more'}}</button>
   </div>
</template>

<script>
  import Loading  from '../Loading'
  import Category from '../boxes/Category'

  import fetchCategories from '../../functions/fetch-categories'

  export default {
    name: 'Categories',

    components: {Loading, Category},

    data: function() {
      return {
        isLoading:     true,
        isLoadingMore: false,
        categories:    [],
        offset:        0
      }
    },

    methods: {
      getCategories: async function() {
        this.isLoadingMore = true

        const categories   = await fetchCategories(this.offset)
        
        this.categories = 
          this.categories.concat(categories.filter(category => !this.categories.find(existing => existing.id == category.id)))


        this.offset += categories.length > 0 ? this.offset + categories.length : -1
        this.isLoadingMore = false
      }
    },

    mounted: async function() {
      await this.getCategories()
      this.isLoading  = false
    }
  }
</script>