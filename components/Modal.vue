<template>
  <Teleport to="#modal_place" v-if="value">
    <div id="modal">
      <div id="modal_content">
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: "Modal",
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<style scoped>
#modal {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(3px);
}

#modal_content {
  margin: auto;
  position: relative;
  width: 600px;
  top: 170px;
  border: 2px solid;
  padding: 30px;
  z-index: 10000;
  background-color: #fff;
  height: 600px;
}
</style>