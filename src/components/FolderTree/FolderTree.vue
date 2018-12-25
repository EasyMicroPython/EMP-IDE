<template>
  <div class="outer-container">
    <div class="inner-container">
      <el-tree ref="tree"
        class="tree"
        node-key="id"
        :empty-text="''"
        :data="data"
        :props="defaultProps"
        :highlight-current="true"
        :render-content="renderContent"
        :default-expand-all="true"
        v-on:node-contextmenu="renderMenu"
        @node-click="nodeClicked"></el-tree>
    </div>
    <v-contextmenu ref="contextmenu"
      theme="default"
      style="width: 200px;">
      <template v-for="(node, index) in menu">
        <v-contextmenu-item v-if="node.isdivider"
          :key="index"
          divider />
        <v-contextmenu-submenu v-else-if="node.children && node.children.length > 0"
          :key="index"
          :title="node.text">
          <v-contextmenu-item v-for="(subNode, index) in node.children"
            :key="index"
            @click="handleContentMenuClick(subNode)">{{subNode.text}}</v-contextmenu-item>
        </v-contextmenu-submenu>
        <v-contextmenu-item v-else
          :key="index"
          @click="handleContentMenuClick(node)">{{node.text}}</v-contextmenu-item>
      </template>
    </v-contextmenu>
  </div>
</template>

<script>
import signals from "./signals.js";
import slots from "./slots.js";
import * as emp from "../../plugins/emp";
import { isFolder, showContentMenu, hideContentMenu } from "./content-menu";

export default {
  name: "folderTree",
  mixins: [signals, slots],
  props: [],
  components: {},
  data() {
    return {
      panel: "",
      data: [],
      currentNode: null,
      menuTarget: null,
      contextMenuVisible: false,
      contextMenuTarget: null,
      defaultProps: {
        children: "children",
        label: "name"
      },
      menu: []
    };
  },
  computed: {},
  mounted: function() {
    this.$nextTick(function() {});
  },

  updated: function() {
    this.$nextTick(function() {});
  },

  methods: {
    togglePanel(panel) {
      this.panel = panel === this.panel ? "" : panel;
    },

    nodeClicked(data, node) {
      if (!("children" in data))
        if (this.currentNode === null || this.currentNode.name != data.name) {
          this.$send(this.SIGNAL_DEPENDS_ON_MEMORY(this, node.label));
          this.currentNode = this.$refs["tree"].getCurrentNode();
        }
      this.hideMenu();
    },

    renderMenu(event, data) {
      this.menuTarget = data.name;
      var _isFolder = isFolder(data);

      if (_isFolder) {
        this.menu = this.$t("FolderTree.Menu.Folder");
      }
      // choose the menu
      else this.menu = this.$t("FolderTree.Menu.File");
      showContentMenu(this.$refs["contextmenu"], event);
    },

    handleContentMenuClick(node) {
      var code = node.code;
      var command = "";

      if (code === "run") {
        // boot脚本不能让随意运行吧,我觉得
        if (this.menuTarget != "//boot.py")
          command = emp.runScript(this.menuTarget);
      } else if (code === "deleteFile") command = emp.delFile(this.menuTarget);
      else if (code === "rename") {
        this.$prompt("Filename", "Input a new filename", {
          validator(value) {
            return {
              valid: value != null && value.length > 0,
              message: "文件名不能为空"
            };
          }
        }).then(({ result, value }) => {
          if (result) {
            command = emp.rename(this.menuTarget, value);
            this.$send(this.SIGNAL_SEND_COMMAND(this, command));
          }
        });
      } else if (code === "newFile") {
        this.$prompt("Filename", "Input a filename", {
          validator(value) {
            return {
              valid: value != null && value.length > 0,
              message: "文件名不能为空"
            };
          }
        }).then(({ result, value }) => {
          if (result) {
            // this.$toast.message('文件名' + value);
            command = emp.newFile(`${this.menuTarget}/${value}`);
            this.$send(this.SIGNAL_SEND_COMMAND(this, command));
          }
        });
      } else if (code === "refresh") {
        command = emp.tree();
      } else if (code === "newFolder") {
        this.$prompt("Folder name", "Input a folder name", {
          validator(value) {
            return {
              valid: value != null && value.length > 0,
              message: "路径名不能为空"
            };
          }
        }).then(({ result, value }) => {
          if (result) {
            // this.$toast.message('文件名' + value);
            command = emp.newFolder(`${this.menuTarget}/${value}`);
            this.$send(this.SIGNAL_SEND_COMMAND(this, command));
          }
        });
      } else if (code === "deleteFolder")
        command = emp.delFolder(this.menuTarget);

      if (command.length > 0)
        this.$send(this.SIGNAL_SEND_COMMAND(this, command));
    },

    hideMenu() {
      hideContentMenu(this.$refs["contextmenu"]);
    },

    renderContent(h, { node, data }) {
      if (data.children) {
        if (node.label === "/") {
          return (
            <mu-flex align-items="center" class="tree-node">
              <mu-icon value="folder" size="22" />
              <span class="tree-node-label">{node.label}</span>
            </mu-flex>
          );
        }
        return (
          <mu-flex align-items="center" class="tree-node">
            <mu-icon value="folder" size="22" />
            <span class="tree-node-label">
              {node.label.split("/").slice(-1)}
            </span>
          </mu-flex>
        );
      } else {
        return (
          <mu-flex align-items="center">
            <mu-icon value="description" size="22" />
            <span class="tree-node-label">
              {node.label.split("/").slice(-1)}
            </span>
          </mu-flex>
        );
      }
    }
  }
};
</script>

<style>
.file-list {
  background: #252526 !important;
  width: 100%;
  height: 100%;
  padding: 0;
}

.tree {
  width: 100%;
  height: 100%;
}

.tree-node-label {
  margin-left: 6px;
  font-size: 18px;
  color: #e0e0e0;
}

.tree-node {
  width: 100%;
  height: 24px;
}

.tree-node-left {
  width: 20%;
}

.tree-node-right {
  width: 75%;
}

.outer-container,
.content {
  width: 100%;
  height: 97vh;
}

.outer-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.inner-container {
  width: 300%;
  height: 100%;
  position: absolute;
  left: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}

.el-tree {
  position: relative;
  cursor: default;
  background: #252526 !important;
  color: rgba(221, 207, 207, 0.67) !important;
}

.el-tree-node__label {
  font-size: 18px !important;
}

.el-tree-node__content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 32px !important;
  cursor: pointer;
}

.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #37373d !important;
}

.el-tree-node__content:hover {
  background-color: #37373d !important;
}

.el-tree-node:focus > .el-tree-node__content {
  background-color: #37373d;
}

.el-tree-node__expand-icon {
  cursor: pointer;
  color: #c0c4cc;
  font-size: 16px;
  -webkit-transform: rotate(0);
  transform: rotate(0);
  -webkit-transition: -webkit-transform 0.3s ease-in-out;
  /* transition: -webkit-transform .3s ease-in-out; */
  /* transition: transform .3s ease-in-out; */
  /* transition: transform .3s ease-in-out, -webkit-transform .3s ease-in-out; */
  transition: transform 0.3s ease-in-out, -webkit-transform 0.3s ease-in-out;
}
</style>
