<template>
  <div>
    <div>{{ name }}</div>
    <div v-text="greetings"></div>
    <v-chip variant="outlined"> Chip </v-chip>
  </div>
</template>

<script>
export default {
  name: "PC line computers shops",
  data() {
    return {
      name: "Message",
      greetings: "Hellodda",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
