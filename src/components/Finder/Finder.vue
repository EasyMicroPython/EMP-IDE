<template>
  <div style="padding:12px;background:#252526;height:100%;width:100%">
    <div>
      <mu-auto-complete
        @select="onSelect"
        full-width
        :data="files"
        :label="$t('Finder.Label')"
        v-model="filename"
      ></mu-auto-complete>
    </div>
  </div>
</template>


<script>
import slots from "./slots.js";
import signals from "./signals.js";
export default {
  name: "finder",
  mixins: [slots, signals],
  data() {
    return {
      filename: "",
      files: null
    };
  },
  mounted() {
    this.$nextTick(function() {
      // this.files =
    });
  },

  methods: {
    traverse(node) {
      var files = [];
      var children = node.children;
      if (children != null) {
        for (let i of children) {
          files.push(...this.traverse(i).map(path => path.replace("//", "/")));
        }
      } else files.push(node.name);

      return files;
    },
    onSelect() {
      this.$send(this.SIGNAL_MEMORY_ANALYSING(this, this.filename));
    }
  }
};
</script>


<style scoped>
</style>
