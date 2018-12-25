 <template>
  <mu-flex direction="column"
    v-resize="handleResize">
    <mu-linear-progress v-if="tasklock"
      color="secondary"
      class="progress-bar"></mu-linear-progress>
    <mu-flex class="bg"
      direction="row"
      justify-content="start">
      <side-bar @events="$connect"></side-bar>
      <split-pane ref="splitVertical"
        @resize="handleResize"
        :min-percent="0"
        :default-percent="0"
        split="vertical"
        class="pane-layout">
        <template slot="paneL"
          class="left-pane">
          <folder-tree v-show="showFolderTree"
            ref="folderTree"
            @events="$connect"></folder-tree>
          <uploader ref="uploader"
            v-show="showUploader"
            @events="$connect"></uploader>
          <finder ref="finder"
            v-show="showFinder"
            @events="$connect"></finder>
          <pypi ref="pypi"
            v-show="showPypi"
            @events="$connect"></pypi>
        </template>

        <template slot="paneR">
          <split-pane ref="splitHorizontal"
            @resize="handleResize"
            split="horizontal"
            :min-percent="0"
            :default-percent="100">
            <template slot="paneL">
              <editor ref="editor"
                @events="$connect"
                class="editor"></editor>
            </template>
            <template slot="paneR">
              <cli ref="cli"
                :tasklock="tasklock"
                @events="$connect"
                class="terminal-container"></cli>
            </template>
          </split-pane>
        </template>
      </split-pane>
    </mu-flex>
    <setting ref="setting"
      @events="$connect"
      :show="showSettings"></setting>
    <bottom-bar ref="bottomBar"
      @events="$connect"></bottom-bar>
  </mu-flex>
</template>

<script>
import SplitPane from "../../components/SplitPane";

import BottomBar from "../../components/BottomBar";
import SideBar from "../../components/SideBar";

import FolderTree from "../../components/FolderTree";
import Uploader from "../../components/Uploader";
import Finder from "../../components/Finder";
import Pypi from "../../components/Pypi";

import Editor from "../../components/Editor";
import Cli from "../../components/Cli";
import Setting from "../../components/Setting";

import slots from "./slots";
import signals from "./signals";
import mixinData from "./props";

export default {
  mixins: [signals, slots, mixinData],
  components: {
    BottomBar,
    SideBar,
    FolderTree,
    Editor,
    SplitPane,
    Cli,
    Setting,
    Uploader,
    Finder,
    Pypi
  },

  computed: {
    showFolderTree: function() {
      return this.switcher === 0;
    },
    showUploader: function() {
      return this.switcher === 1;
    },
    showFinder: function() {
      return this.switcher === 2;
    },
    showPypi: function() {
      return this.switcher === 3;
    },
    showDoc: function() {
      return this.switcher === 4;
    }
  },

  data() {
    return {
      loading: false,
      showSettings: false,
      settings: null,
      switcher: 0,
      tasklock: false
    };
  },

  beforeDestroy() {},
  mounted() {
    this.$i18n.locale = this.$cookie.get("lang");
  },
  methods: {
    handleResize() {
      this.$send(this.SIGNAL_RESIZE_TERM(this));
      this.$send(this.SIGNAL_RESIZE_EDITOR(this));
    }
  },
  watch: {}
};
</script>

<style scoped>
.bg {
  background: #1e1e1e;
  width: 100%;
  position: relative;
}

.progress-bar {
  position: fixed;
  width: 100vw;
  z-index: 999;
}

.pane-layout {
  width: calc(100% - 70px);
  max-width: calc(100% - 70px);
  height: 97vh;
  max-height: 97vh;
}

.left-pane {
  padding: 0;
  overflow: hidden;
  background: #252526 !important;
  min-width: 0;
  width: 20%;
  max-width: 40%;
  height: 100%;
}

.subpane-layout {
  width: 80%;
  min-width: 60%;
  height: 100%;
  /* flex-grow: 1; */
  border-left: 2px solid #61616161;
}

.editor {
  /* overflow: hidden; */
  background: #1e1e1e;
  width: 100%;
  height: 100%;
}

.terminal-container {
  border-top: 2px solid #61616161;
  flex-grow: 1;
  height: 100%;
  width: 100%;
  min-height: 0;
  overflow: hidden;
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 0;
  padding-bottom: 15px;
  background: #1e1e1e;
}
</style>
