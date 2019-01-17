<template>
  <div>
    <div id="loading">
      <i id="icon" class="fsif-cog"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Loading',
  }
</script>

<style scoped>
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
    animation: spin 2.5s cubic-bezier(.79, 0, .47, .97) infinite;
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