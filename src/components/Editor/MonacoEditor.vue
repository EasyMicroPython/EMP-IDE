<template>
  <div ref="monaco-editor-container" class="monaco-editor-container"></div>
</template>

<script>
import * as monaco from "monaco-editor";
// import debounce from "lodash/debounce";

self.MonacoEnvironment = {
  getWorkerUrl: function(moduleId, label) {
    if (label === "json") {
      return "./json.worker.bundle.js";
    }
    if (label === "css") {
      return "./css.worker.bundle.js";
    }
    if (label === "html") {
      return "./html.worker.bundle.js";
    }
    if (label === "typescript" || label === "javascript") {
      return "./ts.worker.bundle.js";
    }
    return "./editor.worker.bundle.js";
  }
};

export default {
  name: "Editor",
  props: {
    value: {
      type: String,
      default: ""
    },
    theme: {
      type: String,
      default: "vs-dark"
    },
    showMinimap: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: "python"
    },
    syncInput: {
      type: Boolean,
      default: true
    },
    fontSize: {
      type: Number,
      default: 16
    }
  },
  data() {
    return {
      editor: null,
      monaco: null,
      editorVisiable: true,
      buffer: ""
    };
  },
  watch: {
    value(val) {
      if (this.buffer.length !== val.length || this.buffer !== val) {
        this.buffer = val;
        this.editor.setValue(val);
      }
    },
    fontSize(val) {
      this.editor.updateOptions({ fontSize: val });
    }
  },
  mounted() {
    this.initEditor();
  },
  beforeDestroy() {
    this.$refs["monaco-editor-container"].innerHTML = "";
  },
  methods: {
    initEditor() {
      var $editorContainer = this.$refs["monaco-editor-container"];
      this.monaco = window.monaco;
      this.editor = monaco.editor.create($editorContainer, {
        value: this.value,
        language: this.mode,
        fontSize: this.fontSize,
        minimap: {
          enabled: this.showMinimap
        }
      });
      this.setTheme(this.theme);
      this.listen();
    },
    listen() {
      let that = this;
      if (this.syncInput) {
        this.editor.onDidChangeModelContent(function() {
          that.buffer = that.editor.getValue();
          that.$emit("input", that.buffer);
        });
      }
    },
    setTheme(theme) {
      this.monaco.editor.setTheme(theme);
    },
    layout() {
      this.editor.layout();
    }
  }
};
</script>

<style scoped>
.monaco-editor-container {
  min-height: 350px;
  height: 100%;
  width: 100%;
}
</style>
