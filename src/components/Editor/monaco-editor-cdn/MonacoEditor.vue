<template>
  <div ref="monaco-editor-container" class="monaco-editor-container"></div>
</template>




<script>
import monacoLoader from './monaco-loader.js'

export default {
  name: 'MonacoEditor',
  props: {
    url: {
      type: String,
      default: 'https://cdnjs.loli.net/ajax/libs/monaco-editor/0.17.1/min'
    },
    value: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'vs-dark'
    },
    showMinimap: {
      type: Boolean,
      default: true
    },
    language: {
      type: String,
      default: 'python'
    },
    syncInput: {
      type: Boolean,
      default: true
    },
    fontSize: {
      type: Number,
      default: 16
    },
    options: {
      type: Object,
      default: null
    }
  },
  async mounted() {
    this.init()
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.dispose()
    }
  },
  data() {
    return {
      editor: null,
      monaco: null,
      editorVisiable: true,
      buffer: ''
    }
  },
  watch: {
    options: {
      deep: true,
      handler(options) {
        if (this.editor) {
          this.editor.updateOptions(options)
        }
      }
    },
    value(newValue) {
      if (this.editor) {
        if (newValue !== this.editor.getValue()) {
          this.editor.setValue(newValue)
        }
      }
    },
    language(newVal) {
      if (this.editor) {
        this.editor.setModelLanguage(this.editor.getModel(), newVal)
      }
    },
    theme(newVal) {
      if (this.editor) {
        this.editor.setTheme(newVal)
      }
    }
  },
  methods: {
    async init() {
      try {
        await monacoLoader.ensureMonacoIsLoaded(this.url)
        this.initMonaco()
      } catch (e) {
        console.error('Failure during loading monaco editor:', e)
      }
    },
    initMonaco() {
      const options = {
        value: this.value,
        theme: this.theme,
        language: this.language,
        fontSize: this.fontSize,
        minimap: {
          enabled: this.showMinimap
        },
        ...this.options
      }
      var $editorContainer = this.$refs['monaco-editor-container']
      this.monaco = window.monaco
      this.editor = window.monaco.editor.create($editorContainer, options)
      this.monaco = window.monaco
      this.$emit('editorDidMount', this.editor)
      this.editor.onDidChangeModelContent(() => {
        let that = this
        if (this.syncInput) {
          this.editor.onDidChangeModelContent(function() {
            that.buffer = that.editor.getValue()
            that.$emit('input', that.buffer)
          })
        }
      })
    },

    getMonaco() {
      return this.editor
    },

    layout() {
      this.editor.layout()
    }
  }
}
</script>

<style scoped>
.monaco-editor-container {
  min-height: 350px;
  height: 100%;
  width: 100%;
}
</style>