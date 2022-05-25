<template>
  <div>
    <h4 class="mb-2">{{title}}</h4>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: [
      "title"
  ],
  name: "TransactionFilterSection"
}
</script>

<style scoped>

</style>
