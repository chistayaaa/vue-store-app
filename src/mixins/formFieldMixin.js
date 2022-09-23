import BaseFormField from '@/components/BaseFormField';

export  const formFieldMixin = {
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
