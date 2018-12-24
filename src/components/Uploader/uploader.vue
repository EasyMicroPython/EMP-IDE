<template>
  <div style="background: #252526 !important;height:100%">
    <mu-flex justify-content="center" align-items="center">
      <el-upload
        style="backgroun: #212121"
        ref="eluploader"
        drag
        action="https://127.0.0.1/posts/"
        :auto-upload="false"
        :on-change="handleChange"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          {{$t('Uploader.DragToHere')}}
          <em>{{$t('Action.Click')}}</em>
        </div>

        <div class="el-upload__tip" slot="tip">
          <mu-button full-width color="primary" @click="send">{{$t('Uploader.Upload')}}</mu-button>
        </div>
      </el-upload>
    </mu-flex>
  </div>
</template>

<script>
import signals from "./signals.js";
import slots from "./slots.js";
import listener from "../../plugins/mixinEventsListener.js";
import onEvent from "../../plugins/mixinOnEvents.js";
export default {
  mixins: [signals, slots, listener, onEvent],
  data() {
    return {
      putFilename: [],
      putFileData: [],
      files: null,
      index: 0
    };
  },
  methods: {
    browse() {
      this.$refs["fileInput"].click();
    },

    send() {
      if (this.putFilename.length > 0) this.$send(this.SIGNAL_PUT_FILE(this));
    },

    handleChange(file) {
      let that = this;
      let f = file.raw;
      that.putFilename.push(f.name);

      let reader = new FileReader();
      reader.onload = function(e) {
        that.putFileData.push(new Uint8Array(e.target.result));
      };
      reader.readAsArrayBuffer(f);
    },

    handleFiles(evt) {
      this.files = evt.target.files;
      let that = this;
      // Get the file info and load its data.
      for (let i = 0; i < this.files.length; i++) {
        let f = this.files[i];
        that.putFilename.push(f.name);
        let reader = new FileReader();
        reader.onload = function(e) {
          that.putFileData.push(new Uint8Array(e.target.result));
        };
        reader.readAsArrayBuffer(f);
      }
    }
  }
};
</script>


<style>
.el-upload-dragger {
  background-color: #212121 !important;
  border: 1px #d9d9d9;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 300px;
  /* width: 100%; */
  height: 180px;
  text-align: center;
  position: relative;
  overflow: hidden;
  margin-top: 32px;
}
</style>
