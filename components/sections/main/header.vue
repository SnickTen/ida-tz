<template>
  <div :class="$style.header">
    <h1 :class="$style.title"><span :class="$style.t">Добавление товара</span></h1>
    <div :class="[$style.select, {[$style.select_opened]: selectOpen}]" @click="onClickSelect">
      <div :class="$style.def" >
        <span :class="$style.t">{{ currentTitle }}</span>
        <icon-arrow :class="$style.icon" />
        <transition name="fade">
          <div v-if="selectOpen" :class="$style.list">
            <p
              v-for="(option, i) in options"
              :key="i + '_option'"
              @click="onChangeOption(option)"
              :class="$style.option"
            >
              <span :class="$style.t">{{ option.title }}</span>
            </p>
          </div>
        </transition>
      </div>
    </div>
    <div :class="$style.help"><span :class="$style.t">Можете использовать эту ссылку для изображения: https://auto.vercity.ru/img/magazine/old/30090.jpg</span></div>
  </div>
</template>

<script>
import IconArrow from '../../icons/arrow'
import { mapActions } from 'vuex'
export default {
  name: 'MainHeader',
  components: {
    IconArrow
  },
  data() {
    return {
      currentValue: '',
      currentTitle: "По умолчанию",
      options: [
        { value: 'min', title: 'По возрастанию' },
        { value: 'max', title: 'По убыванию' },
        { value: 'name', title: 'По наименованию' },
        { value: '', title: 'По умолчанию' }
      ],
      selectOpen: false
    }
  },
  methods: {
    ...mapActions('goods', ['setSort']),
    onChangeOption(option) {
      this.currentValue = option.value
      this.setSort(option.value)
      this.currentTitle = option.title
    },
    onClickSelect() {
      this.selectOpen = !this.selectOpen
    }
  }
}
</script>

<style lang="scss" module>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.6em;
}
.title {
  font-weight: 600;
  .t {
    font-size: 2.8em;
    line-height: 1.25;
    @include down(md) {
      font-size: 2em;
    }
  }
}
.select {
  display: flex;
  align-items: center;
  height: 3.6em;
  padding: 0 1.6em;
  background: #FFFEFB;
  box-shadow: 0 .2em .5em rgba(0, 0, 0, 0.1);
  border-radius: .4em;
  color: #B4B4B4;
  position: relative;
  cursor: pointer;
  .t {
    font-size: 1.2em;
    line-height: 1.25;
    white-space: nowrap;
  }
  &_opened {
    .icon {
      transform: scale(1, -1);
    }
  }
}
.def {
  display: flex;
  align-items: center;
}
.list {
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(0, 100%);
  padding: 1.6em;
  background-color: #fff;
  box-shadow: 0 .2em .5em rgba(0, 0, 0, 0.1);
  border-radius: .4em;
  z-index: 10;
}
.option {
  cursor: pointer;
  & + .option {
    margin-top: 1.6em;
  }
}
.icon {
  width: .8em;
  height: .6em;
  margin-left: .5em;
  transition: transform .3s ease-in;
}
.help {
  position: absolute;
  top: 0;
  left: 50%;
  @include down(md) {
    display: none;
  }
  .t {
    font-size: 2em;
    line-height: 1.25;
  }
}
</style>
