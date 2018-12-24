<template>
  <div>
    <mu-dialog
      :title="$t('Cli.DialogTitle')"
      width="400"
      max-width="80%"
      :esc-press-close="true"
      :overlay-close="false"
      :open.sync="show"
    >
      <mu-flex direction="column">
        <mu-auto-complete
          :data="espIP"
          :label="$t('Cli.URL')"
          :max-search-results="5"
          placeholder="ws://192.168.xxx.xxx:8266/"
          full-width
          v-model="url"
          open-on-focus
        ></mu-auto-complete>
        <mu-text-field
          :label="$t('Cli.Password')"
          color="primary"
          v-model="passwd"
          full-width
          placeholder="password"
          type="password"
        ></mu-text-field>
      </mu-flex>
      <mu-button slot="actions" flat color="primary" @click="connect">{{buttonText}}</mu-button>
      <mu-button slot="actions" flat color="primary" @click="esc">{{ $t('Action.Esc') }}</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "config",
  props: ["show", "wsStatus"],
  data() {
    return {
      url: "",
      espIP: [],
      passwd: ""
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getCookies();
      if (this.$cookie.get("url") != null) {
        this.espIP.push(this.$cookie.get("url"));
      }
      let that = this;
      // try {
      axios.get("http://www.1zlab.com/ide/get/ip/").then(function(rsp) {
        let records = rsp.data.ip.map(_ip => `ws://${_ip}:8266`).slice(0, -1);
        that.espIP.push(...records);
        that.url = that.espIP[that.espIP.length - 1];
      });
      // } catch (error) {
      //   // console.log(error)
      // }
    });
  },
  computed: {
    buttonText: function() {
      if (!this.wsStatus) {
        return this.$t("Cli.Connect");
      } else {
        return this.$t("Cli.Disconnect");
      }
    }
  },
  methods: {
    connect() {
      this.setCookies();
      if (!this.wsStatus) {
        this.$emit("connect", {
          url: this.url,
          passwd: this.passwd
        });
        this.$emit("hide");
      } else {
        this.$emit("disconnect");
        this.$emit("hide");
      }
    },
    esc() {
      this.setCookies();
      this.$emit("hide");
    },
    getCookies() {
      if (this.$cookie.get("url") != null) {
        this.url = this.$cookie.get("url");
      }
      if (this.$cookie.get("passwd") != null) {
        this.passwd = this.$cookie.get("passwd");
      }
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
