<template>

  <BaseFormField :title="title" :error="error">
    <textarea class="form__input form__input--area" v-model="modelValue" :placeholder="placeholder"></textarea>
  </BaseFormField>

</template>

<script>
import BaseFormField from '@/components/BaseFormField';

export default {
  components: {BaseFormField},
  props: ['title', 'error', 'placeholder', 'modelValue'],
  computed: {
    modelValue: {
      get() {
        return this.value;
      },
      set(value){
        this.$emit('update:modelValue', value);
      }
    }
  }
};
</script>
