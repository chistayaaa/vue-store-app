<template>

  <BaseFormField :title="title" :error="error">
    <input class="form__input" v-model="modelValue" type="text" :placeholder="placeholder">
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


