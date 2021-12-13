<template>
  <div :class="$style.container">
    <form @submit.prevent="onSubmit">
      <div :class="[$style.field, $style.field_required]">
        <label :class="$style.label" for="title"><span :class="$style.t">Наименование товара</span></label>
        <input
          :class="[$style.input, {[$style.error]: titleError}]"
          id="title"
          type="text"
          placeholder="Введите наименование товара"
          v-model="form.title"
          @blur="$v.form.title.$touch"
        >
        <div :class="[$style.errorText, {[$style.active]: titleError}]">
          <span :class="$style.t">Поле является обязательным</span>
        </div>
      </div>

      <div :class="$style.field">
        <label :class="$style.label" for="description"><span :class="$style.t">Описание товара</span></label>
        <textarea :class="$style.textarea" id="description" maxlength="200" placeholder="Введите описание товара" v-model="form.desc"></textarea>
      </div>

      <div :class="[$style.field, $style.field_required]">
        <label :class="$style.label" for="image"><span :class="$style.t">Ссылка на изображение товара</span></label>
        <input
          :class="[$style.input, {[$style.error]: imageError}]"
          id="image"
          type="text"
          placeholder="Введите ссылку"
          v-model="form.image"
          @blur="$v.form.image.$touch"
        >
        <div :class="[$style.errorText, {[$style.active]: imageError}]">
          <span :class="$style.t">Поле является обязательным</span>
        </div>
      </div>

      <div :class="[$style.field, $style.field_required]">
        <label :class="$style.label" for="price"><span :class="$style.t">Цена товара</span></label>
        <input
          :class="[$style.input, {[$style.error]: priceError}]"
          id="price"
          type="number"
          placeholder="Введите цену"
          v-model="form.price"
          @blur="$v.form.price.$touch"
        >
        <div :class="[$style.errorText, {[$style.active]: priceError}]" v-for="(error, i) in priceErrors" :key="i">
          <span :class="$style.t">{{ error }}</span>
        </div>
      </div>

      <button :class="$style.button" :disabled="$v.form.$invalid" type="submit">
        <span :class="$style.t">Добавить товар</span>
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { required, maxLength } from 'vuelidate/lib/validators'

const Good = () => ({
  title: "",
  desc: "",
  image: "",
  price: "",
  id: 0
})

export default {
  name: 'MainForm',
  data() {
    return {
      form: {
        ...Good
      }
    }
  },
  methods: {
    ...mapActions('goods', ['addGood']),
    onSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.form.id = Date.now()
      this.addGood(this.form)
      this.$v.form.$reset()
      this.form = { ...Good }
    }
  },
  validations() {
    return {
      form: {
        title: { required },
        image: { required },
        price: {
          required,
          maxLength: maxLength(12)
        }
      }
    }
  },
  computed: {
    titleError() {
      return this.$v.form.title.$error
    },
    imageError() {
      return this.$v.form.image.$error
    },
    priceError() {
      return this.$v.form.price.$error
    },
    priceErrors() {
      const errors = []
      if (!this.$v.form.price.required && this.$v.form.price.$dirty) {
        errors.push('Поле является обязательным')
      }
      if (!this.$v.form.price.maxLength && this.$v.form.price.$dirty) {
        errors.push('Слишком много цифр')
      }
      return errors
    }
  }
}
</script>

<style lang="scss" module>
  .container {
    padding: 2.4em;
    color: #49485E;
    background: #FFFEFB;
    box-shadow: 0 2em 3em rgba(0, 0, 0, 0.04), 0 .6em 1em rgba(0, 0, 0, 0.02);
    border-radius: .4em;
  }
  .field {
    display: flex;
    flex-direction: column;
    position: relative;
    & + .field {
      margin-top: 1.6em;
    }
    &_required {
      .label {
        display: flex;
        align-items: flex-start;
        &:after {
          content: "";
          display: block;
          border-radius: 50%;
          background-color: #FF8484;
          width: .4em;
          height: .4em;
          flex-shrink: 0;
        }
      }
    }
  }
  .label {
    margin-bottom: .4em;
    .t {
      font-size: 1em;
      line-height: 1.3;
      letter-spacing: -0.02em;
    }
  }
  .input {
    border: 1px solid transparent;
    outline: none;
    background: #FFFEFB;
    box-shadow: 0 .2em .5em rgba(0, 0, 0, 0.1);
    border-radius: .4em;
    padding: 0 1.6em;
    height: 3.6em;
    font-size: 1em;
    line-height: 1.3;
    &::placeholder {
      font-size: 1.2em;
      line-height: 1.25;
      color: #B4B4B4;
    }
    &:focus {
      box-shadow: 0 .2em .5em rgba(0, 0, 0, 0.2);
    }
  }
  .input[type=number]::-webkit-inner-spin-button,
  .input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .textarea {
    resize: none;
    border: none;
    outline: none;
    overflow: hidden;
    background: #FFFEFB;
    box-shadow: 0 .2em .5em rgba(0, 0, 0, 0.1);
    border-radius: .4em;
    padding: 1em 1.6em 1.6em;
    height: 10.8em;
    font-size: 1em;
    line-height: 1.3;
    letter-spacing: -0.02em;
    &::placeholder {
      font-size: 1.2em;
      line-height: 1.25;
      color: #B4B4B4;
    }
    &:focus {
      box-shadow: 0 .2em .5em rgba(0, 0, 0, 0.2);
    }
  }
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3.6em;
    width: 100%;
    padding: 0 1.6em;
    background: #7BAE73;
    color: #FFFFFF;
    border-radius: 1em;
    margin-top: 2.4em;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    transition: background .3s ease-in, color .3s ease-in;
    &[disabled] {
      background: #EEEEEE;
      color: #B4B4B4;
    }
    .t {
      font-size: 1.2em;
      line-height: 1.2;
      letter-spacing: -0.02em;
    }
  }
  .error {
    border: 1px solid #FF8484
  }
  .errorText {
    color: #FF8484;
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translate(0, 100%);
    margin-bottom: -.4em;
    opacity: 0;
    transition: opacity .3s ease-in-out;
    &.active {
      opacity: 1;
    }
    .t {
      font-size: .8em;
      line-height: 1;
      letter-spacing: -0.02em;
    }
  }
</style>
