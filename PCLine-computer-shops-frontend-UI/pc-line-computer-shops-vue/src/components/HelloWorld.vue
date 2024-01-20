<template>
  <div>{{ text1 }}</div>
  <div v-text="text2"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",

  data() {
    return {
      text1: "Hello 1",
      text2: "Hello 2",
    };
  },
});
</script>
