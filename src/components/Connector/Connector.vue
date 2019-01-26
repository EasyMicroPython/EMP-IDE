<template>
  <mu-dialog :title="$t('Connector.DialogTitle')"
    width="400"
    max-width="80%"
    :esc-press-close="true"
    :overlay-close="false"
    :open.sync="show">

    <mu-flex direction="column">
      <mu-select :label="$t('Connector.Type')"
        v-model="type"
        full-width>
        <mu-option v-for="option,index in options"
          :value="index"
          :key="option"
          :label="option"></mu-option>
      </mu-select>
      <mu-auto-complete :data="espIP"
        :label="$t('Connector.URL')"
        :max-search-results="5"
        placeholder="ws://192.168.xxx.xxx:8266/"
        full-width
        v-model="url"
        open-on-focus></mu-auto-complete>
      <mu-text-field :label="$t('Connector.Password')"
        color="primary"
        v-model="passwd"
        full-width
        placeholder="password"
        type="password"></mu-text-field>
    </mu-flex>
    <mu-button slot="actions"
      flat
      color="primary"
      @click="connect">{{buttonText}}</mu-button>
    <mu-button slot="actions"
      flat
      color="primary"
      @click="esc">{{ $t('Action.Esc') }}</mu-button>

  </mu-dialog>
</template>

<script>
import axios from "axios";
import slots from "./slots";
import signals from "./signals";
export default {
  name: "config",
  mixins: [slots, signals],
  data() {
    return {
      url: "",
      passwd: "",
      espIP: [],
      options: [this.$t("Connector.Wifi"), this.$t("Connector.SerialPort")],
      type: 0,
      show: false,
      connected: false,
      memLimit: 0.85,
    };
  },
  mounted: function () {
    this.$nextTick(function () {
      this.init();
    });
  },
  computed: {
    buttonText: function () {
      if (!this.connected) {
        return this.$t("Connector.Connect");
      } else {
        return this.$t("Connector.Disconnect");
      }
    }
  },
  methods: {
    init() {
      this.getCookies();
      if (this.$cookie.get("url") != null) {
        this.espIP.push(this.$cookie.get("url"));
      }
      let that = this;
      axios.get("http://www.1zlab.com/ide/get/ip/").then(function (rsp) {
        let records = rsp.data.ip.map(_ip => `ws://${_ip}:8266`).slice(0, -1);
        that.espIP.push(...records);
        that.url = that.espIP[that.espIP.length - 1];
      });
    },

    connect() {
      this.setCookies();
      if (!this.$repl.connected) {
        this.$repl.connectionType = this.type;
        // webrepl need password
        if (this.type === 0) this.$repl.passwd = this.passwd;
        this.$repl.url = this.type === 0 ? this.url : "ws://127.0.0.1:9000";
        this.$replStart();
      } else this.$replStop();

      this.slotToggleShow();
    },

    esc() {
      this.setCookies();
      this.slotToggleShow();
    },

    //-------------------------------------------------------------------------------
    getCookies() {
      if (this.$cookie.get("url") != null) this.url = this.$cookie.get("url");

      if (this.$cookie.get("passwd") != null)
        this.passwd = this.$cookie.get("passwd");
    },
    setCookies() {
      this.$cookie.set("url", this.url, {
        expires: "1Y"
      });
      this.$cookie.set("passwd", this.passwd, {
        expires: "1Y"
      });
    }
  }
};
</script>

<style scoped>
</style>
