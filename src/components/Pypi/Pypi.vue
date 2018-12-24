<template>
  <div style="padding:12px;background:#252526;height:100%">
    <mu-card style="width: 100%;min-width:300px;margin: 6px auto;">
      <mu-card-header title="EMP" sub-title="make things easy on micropython."></mu-card-header>
      <!-- <mu-card-text>
                emp-1zlab 模块是专门用来完成和empide进行交互的,,,,,
      </mu-card-text>-->
      <mu-card-actions>
        <mu-button flat @click="pipInstall('emp-1zlab')">{{$t('Pypi.Download')}}</mu-button>
      </mu-card-actions>
    </mu-card>

    <mu-card style="width: 100%;min-width:300px;margin: 6px auto;">
      <mu-card-header title="mpython" sub-title="掌控板"></mu-card-header>
      <!-- <mu-card-text>
                emp-1zlab 模块是专门用来完成和empide进行交互的,,,,,
      </mu-card-text>-->
      <mu-card-actions>
        <mu-button flat @click="pipInstall('mpython')">{{$t('Pypi.Download')}}</mu-button>
      </mu-card-actions>
    </mu-card>
  </div>
</template>


<script>
// import slots from "./slots.js";
import signals from "./signals.js";

export default {
  name: "pypi",
  mixins: [signals],
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(function() {
      // this.files =
    });
  },

  methods: {
    pipInstall(pkg) {
      this.$send(this.SIGNAL_INSTALL(this, pkg));
    }
  }
};
</script>


<style scoped>
</style>
