<template>
  <div id="loading-wrapper">
    <div id="loading">
      <i v-if="isVisible" id="icon" class="fsif-cog"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Loading',

    data: function() {
      return {
        isVisible: false,
        timer:     null
      }
    },

    mounted: function() {
      if (!this.timer)
        this.timer = setTimeout(() => { this.isVisible = true}, 500)
    },

    beforeDestroy: function() {
      if (this.timer) clearTimeout(this.timer)
      this.isVisible = false
    }
  }
</script>

<style scoped>
  #loading-wrapper {
    position: relative;
    min-height: 25vh;
  }

  #loading {
    position: absolute;
    width: 100%;
    height: 100%;
    display: grid;
    align-content: center;
    justify-content: center;
  }

  #icon {
    position: relative;
    font-size: 5rem;
    opacity: 0;
    animation: spin 2.5s cubic-bezier(.79, 0, .47, .97) infinite, fadeIn .25s ease-in forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(-270deg);
    }
  }
</style>