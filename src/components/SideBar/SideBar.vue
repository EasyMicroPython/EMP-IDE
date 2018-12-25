<template>
    <div style="z-index: 999;">
        <div class="pane left-pane">
            <mu-flex justify-content="start" align-items="center" direction="column" style="height:100%">

                <mu-flex justify-content="start" align-items="center" direction="column" style="height:50%">
                    <el-tooltip class="item" effect="dark" :content="$t('placeholder.Editor')" :open-delay="2000" placement="right">
                        <div :style="changeStyle(0)">
                            <mu-button class="icon-button" icon color="grey" :ripple="false" @click="changePage(0)">
                                <mu-icon size="36" value="code"></mu-icon>
                            </mu-button>
                        </div>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" :content="$t('placeholder.Uploader')" :open-delay="2000" placement="right">
                        <div :style="changeStyle(1)">
                            <mu-button class="icon-button" icon color="grey" :ripple="false" @click="changePage(1)">
                                <mu-icon size="36" value="file_upload"></mu-icon>
                            </mu-button>
                        </div>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" :content="$t('placeholder.Search')" :open-delay="2000" placement="right">
                        <div :style="changeStyle(2)">
                            <mu-button class="icon-button" icon color="grey" :ripple="false" @click="changePage(2)">
                                <mu-icon size="36" value="search"></mu-icon>
                            </mu-button>
                        </div>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" :content="$t('placeholder.Modules')" :open-delay="2000" placement="right">
                        <div :style="changeStyle(3)">
                            <mu-button class="icon-button" icon color="grey" :ripple="false" @click="changePage(3)">
                                <mu-icon size="36" value="extension"></mu-icon>
                            </mu-button>
                        </div>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" :content="$t('placeholder.Docs')" :open-delay="2000" placement="right">
                        <div>
                            <a href="http://www.1zlab.com/wiki/micropython-esp32/emp-ide-userguide/" target="_blank">
                                <mu-button class="icon-button" icon color="grey" :ripple="false">
                                    <mu-icon size="36" value="book"></mu-icon>
                                </mu-button>
                            </a>
                        </div>
                    </el-tooltip>
                </mu-flex>

                <mu-flex justify-content="end" align-items="center" direction="column" style="height:50%">
                    <el-tooltip class="item" effect="dark" :content="$t('placeholder.RunScript')" :open-delay="2000" placement="right">
                        <mu-button class="icon-button" icon color="green" @click="runScript">
                            <mu-icon size="36" value="play_arrow"></mu-icon>
                        </mu-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" :content="$t('placeholder.MemoryClean')" :open-delay="2000" placement="right">
                        <mu-button class="icon-button" icon color="green" @click="gcCollect">
                            <mu-icon size="36" value="memory"></mu-icon>
                        </mu-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" :content="$t('placeholder.Connect')" :open-delay="2000" placement="right">
                        <mu-button class="icon-button" icon color="yellow" @click="startConnect">
                            <mu-icon size="36" value="power"></mu-icon>
                        </mu-button>
                    </el-tooltip>
                </mu-flex>

            </mu-flex>
        </div>
    </div>
</template>

<script>
import signals from "./signals.js";
import slots from "./slots.js";

export default {
  name: "sideBar",
  mixins: [signals, slots],
  props: [],
  data() {
    return {
      index: 0,
      selectStyle: [{ background: "#4CAF5099" }, { background: "#fff0" }],
      //   routeMap: ["/ide"],
      connected: false
    };
  },
  mounted: function() {
    this.$nextTick(function() {});
  },
  methods: {
    changePage(index) {
      if (index === this.index) {
        this.$send(this.SIGNAL_TOGGLE_PANE(this));
      } else this.$send(this.SIGNAL_SHOW_PANE(this));
      this.index = index;
      this.$send(this.SIGNAL_SWITCH(this));
    },
    changeStyle(index) {
      if (this.index === index) return this.selectStyle[0];
      return this.selectStyle[-1];
    },
    startConnect() {
      this.$send(this.SIGNAL_OPEN_CONFIG(this));
    },
    runScript() {
      this.$send(this.SIGNAL_RUN(this));
    },
    gcCollect() {
      this.$send(this.SIGNAL_GC_COLLECT(this));
    }
  },
  watch: {}
};
</script>

<style scoped>
.left-pane {
  background: #333333 !important;
  height: 97vh;
  max-width: 72px;
  min-width: 72px;
  padding: 0;
}
.icon-button {
  margin: 10px;
}
</style>
