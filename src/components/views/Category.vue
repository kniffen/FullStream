<template>

  <Loading v-if="isLoading" />

  <div class="category" v-else>
  
    <header>
      <span class="title">
        <CategoryIcon v-bind:name="category.name" />{{category.name}}
      </span>

      <div class="category-menu" v-if="username && category.id">
        <button 
          class="cta" 
          @click="toggleFollow"
          @mouseover="mouseOver"
          @mouseout="mouseOut"
        >{{followBtnText}}</button>
      </div>
    </header>

    <div v-if="streams.length > 0" class="stream-list">
      <Stream v-for="_stream in streams" :key="_stream.id" v-bind="_stream" />
    </div>

    <button 
      class="load-more" 
      v-if="streams.length > 0 && offset >= 0" 
      v-on:click="getStreams"
    >{{isLoadingMore ? 'Loading...' : 'Load more'}}</button>
  
  </div>
</template>

<script>
  import Loading      from '../Loading'
  import Stream       from '../boxes/Stream'
  import CategoryIcon from '../icons/CategoryIcon'

  import fetchStreams      from '../../functions/fetch-streams'
  import fetchCategory     from '../../functions/fetch-category'
  import checkFollowStatus from '../../functions/check-follow-status'
  import follow            from '../../functions/follow'
  import unfollow          from '../../functions/unfollow'

  export default {
    name: 'Category',

    components: {Loading, Stream, CategoryIcon},

    props: ['username'],

    data: function() {
      return {
        isLoading:     true,
        isLoadingMore: false,
        streams:       [],
        offset:        0,
        isFollowing:   false,
        followBtnText: 'Follow',
        category: {
          name: 'Category'
        }
      }
    },

    methods: {
      getStreams: async function() {
        this.isLoadingMore = true

        const streams = 
          await fetchStreams({category: this.category.name, offset: this.offset})
            .then(streams => streams.filter(_stream => !this.streams.find(existing => existing.id == _stream.id)))

        this.streams       = this.streams.concat(streams)
        this.offset        = streams.length >= 100 ? this.offset + 100 : -1
        this.isLoadingMore = false
      },

      toggleFollow: async function() {
        this.followBtnText = 'Loading...'

        if (this.isFollowing) {
          const success = await unfollow({username: this.username, categoryName: this.category.name})
          this.isFollowing = !success
          this.followBtnText = 'Follow'
        } else {
          const success = await follow({username: this.username, categoryName: this.category.name})
          this.isFollowing = success
          this.followBtnText = 'Following'
        }
      },

      mouseOver: function() {
        this.followBtnText = this.isFollowing ? 'Unfollow' : 'Follow'
      },

      mouseOut: function() {
        this.followBtnText  = this.isFollowing ? 'Following' : 'Follow'
      }
    },

    mounted: async function() {
      if (!this.$route.params.name) {
        this.isLoading = false
        return
      }

      const category = await fetchCategory({name: this.$route.params.name})
      
      if (category) {
        this.category      = category
        this.isFollowing   = await checkFollowStatus({username: this.username, categoryName: category.name})
        this.followBtnText = this.isFollowing ? 'Following' : 'Follow'
        await this.getStreams()
      } else {
        this.category.name = this.$route.params.name
      }

      this.isLoading = false
    }
  }
</script>

<style scoped>
  .category {
    display: grid;
    grid-gap: 2em;
    align-content: start;
  }

  header {
    display: flex;
    align-items: flex-end;
    border-bottom: 1px solid var(--color-border);
  }

  .title {
    font-size: 2rem;
    text-transform: uppercase;
  }

  .category-menu {
    margin: 0 0 .25em 1em;
  }

  .cta {
    width: 86px;
  }
</style>