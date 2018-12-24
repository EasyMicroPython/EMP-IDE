<template>
  <div class="monaco-editor-container">
    <mu-flex direction="column" class="monaco-editor-container">
      <mu-flex class="editor-tabs" justify-content="start" align-items="center">
        <mu-flex justify-content="start" align-items="center" class="editor-tabs-flex">
          <mu-button v-if="openedFile" icon color="white" @click="saveFile">
            <mu-icon value="save"></mu-icon>
          </mu-button>
          <p class="editor-tabs-title">
            <strong>{{title}}</strong>
          </p>
        </mu-flex>
        <mu-flex justify-content="end" align-items="center" class="editor-tabs-flex"></mu-flex>
      </mu-flex>
      <monaco-editor
        ref="editor"
        class="monaco-editor"
        v-model="code"
        :font-size="fontSize"
        :sync-input="true"
      ></monaco-editor>
    </mu-flex>
  </div>
</template>


<script>
// this.editor.updateOptions({readOnly: val})
// import readme from "../../readme.js";
import MonacoEditor from "./MonacoEditor.vue";
import signals from "./signals.js";
import slots from "./slots.js";
import listener from "../../plugins/mixinEventsListener.js";
import onEvent from "../../plugins/mixinOnEvents.js";
export default {
  mixins: [signals, slots, listener, onEvent],
  components: {
    MonacoEditor
  },
  data() {
    return {
      code: "",
      openedFile: "",
      fontSize: 16
    };
  },
  methods: {
    saveFile() {
      this.$send(this.SIGNAL_SAVE_FILE(this));
    },
    init() {
      this.code = this.$t("README");
      this.$refs["editor"].editor.updateOptions({
        readOnly: true
      });
      if (this.$cookie.get("fontSize") != null) {
        this.fontSize = parseInt(this.$cookie.get("fontSize"));
      }
    }
  },
  computed: {
    title: function() {
      if (this.openedFile.length > 0) {
        return this.openedFile.split("/").slice(-1)[0];
      } else return "README";
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.init();
    });
  },
  watch: {
    openedFile() {
      if (this.openedFile.length > 0) {
        this.$refs["editor"].editor.updateOptions({
          readOnly: false
        });
      }
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

.editor-tabs {
  height: 48px;
  width: 100%;
  background: #252526;
  position: fixed;
  line-height: 48px;
  padding: 0 12px;
}

.editor-tabs-flex {
  width: 50%;
  height: 100%;
}

.monaco-editor {
  min-height: 350px;
  height: 100%;
  width: 100%;
  /* padding-top: 6px; */
  margin-top: 48px;
}

.editor-tabs-title {
  font-size: 16px !important;
  color: #e0e0e0;
  margin-left: 6px;
}
</style>
