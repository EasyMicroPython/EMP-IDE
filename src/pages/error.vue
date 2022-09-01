<template>
  <div>EMP IDE ERROR: {{errorCode}}</div>
</template>

<script>
export default {
  name: "error",
  computed: {
    errorCode() {
      return this.$route.meta.errorCode || "404";
    }
  }
};
</script>
