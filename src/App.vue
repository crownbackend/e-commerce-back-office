<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';

  .btn-submit {
    border: 1px solid transparent;
    color: #cad1d9;
    background-color: #f4f6f7;
    pointer-events: none;
    cursor: not-allowed;
  }

</style>
