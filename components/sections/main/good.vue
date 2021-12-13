<template>
  <div :class="$style.container">
    <div :class="$style.image">
      <img :src="source.image" alt="">
    </div>
    <div :class="$style.content">
      <h6 :class="$style.title"><span :class="$style.t">{{ source.title }}</span></h6>
      <p :class="$style.description"><span :class="$style.t">{{ source.desc }}</span></p>
      <p :class="$style.price"><span :class="$style.t">{{ source.price | thousandMask }} руб.</span></p>
    </div>
    <icon-trash :class="$style.icon" @click.native="onClickIcon"/>
  </div>
</template>

<script>
import IconTrash from '../../icons/trash'
import { mapActions } from 'vuex'

export default {
  name: 'MainGood',
  components: {
    IconTrash
  },
  props: {
    source: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions('goods', ['removeGood']),
    onClickIcon() {
      this.removeGood(this.source.id)
    }
  }
}
</script>

<style lang="scss" module>
 .container {
   display: inline-block;
   position: relative;
   grid-column: span 1;
   background: #FFFEFB;
   box-shadow: 0 20px 30px rgba(0, 0, 0, 0.04), 0 6px 10px rgba(0, 0, 0, 0.02);
   border-radius: .4em;
   &:hover {
     .icon {
       opacity: 1;
       pointer-events: all;
     }
   }
 }
 .image {
   position: relative;
   padding-bottom: 60.24%;
   img {
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     object-fit: cover;
     object-position: center;
     border-radius: .4em .4em 0 0;
   }
 }
 .content {
   padding: 1.6em 1.6em 2.4em 1.6em;
 }
 .title {
   font-weight: 600;
   margin-bottom: 1.6em;
   word-break: break-all;
   .t {
     font-size: 2em;
     line-height: 1.25;
   }
 }
 .description {
   margin-bottom: 3.2em;
   word-break: break-all;
   .t {
     font-size: 1.6em;
     line-height: 1.25;
   }
 }
 .price {
   font-weight: 600;
   word-break: break-all;
   .t {
     font-size: 2.4em;
     line-height: 1.25;
   }
 }
 .icon {
   opacity: 0;
   pointer-events: none;
   cursor: pointer;
   transition: opacity .3s ease-in-out;
   position: absolute;
   top: -0.8em;
   right: -0.8em;
   width: 3.2em;
   height: 3.2em;
   @include touchDevice() {
     opacity: 1;
     pointer-events: all;
   }
   @include down(md) {
     opacity: 1;
     pointer-events: all;
   }
 }
</style>
