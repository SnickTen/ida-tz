<template>
  <div :class="$style.container">
    <main-header />
    <div :class="$style.content">
      <main-form :class="$style.form" />
      <transition-group tag="div" :class="$style.grid" name="list-complete">
        <main-good class="list-complete-item" v-for="good in sortedList" :key="good.id" :source="good" />
      </transition-group>
    </div>
  </div>
</template>

<script>
import MainForm from './form'
import MainGood from './good'
import MainHeader from './header'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SectionMain',
  components: {
    MainHeader,
    MainGood,
    MainForm
  },
  computed: {
    ...mapGetters('goods', ['sortedList'])
  },
  methods: {
    ...mapActions('goods', ['getGoodsFromLocalStorage'])
  },
  mounted() {
    this.getGoodsFromLocalStorage()
  }
}
</script>

<style lang="scss" module>
 .container {
   min-height: 100vh;
   padding: 3.2em var(--root-layout-offset);
 }
 .content {
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   grid-template-rows: auto;
   align-items: flex-start;
   grid-gap: 1.6em;
   @include down(xxl) {
     grid-template-columns: repeat(3, 1fr);
   }
   @include down(md) {
     grid-template-columns: 1fr;
   }
 }
 .form {
   grid-column: 1 / 2;
 }
 .grid {
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   align-items: flex-start;
   grid-gap: 1.6em;
   grid-column: 2 / -1;
   @include down(xxl) {
     grid-template-columns: repeat(2, 1fr);
   }
   @include down(md) {
     grid-template-columns: 1fr;
     grid-column: 1 / -1;
   }
 }
</style>
