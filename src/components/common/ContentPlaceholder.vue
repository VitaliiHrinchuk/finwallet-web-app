<template>
  <div class="flex flex-column align-center justify-center text-center py-5 ">
    <img style="max-width: 200px" src="../../assets/placeholder.png" alt="">
    <h3 class="subtitle-2">{{title}}</h3>
  </div>
</template>

<script>
export default {
  props: ['title'],
  name: "ContentPlaceholder"
}
</script>

<style scoped>

</style>
