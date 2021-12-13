<template>
  <div v-if="loading" :class="$style.loading">
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  name: 'Preload',
  data() {
    return {
      loading: false
    }
  },
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 1000)
    })
  }
}
</script>

<style lang="scss" module>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  text-align: center;
  padding-top: 10em;
  font-size: 3em;
  z-index: 10;
}
</style>
