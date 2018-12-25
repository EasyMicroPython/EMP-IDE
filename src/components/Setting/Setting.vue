<template>
  <div>
    <mu-dialog
      :title="$t('Settings.Title')"
      width="400"
      max-width="80%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="show"
    >
      <mu-flex direction="column">
        <mu-text-field
          :label="$t('Settings.FontSize')"
          color="primary"
          v-model="fontSize"
          full-width
        ></mu-text-field>
        <mu-text-field :label="$t('Settings.MemoryLimit')" color="primary" full-width disabled></mu-text-field>
        <mu-select label="Normal" v-model="$i18n.locale" full-width>
          <mu-option v-for="option in options" :key="option" :label="option" :value="option"></mu-option>
        </mu-select>
      </mu-flex>

      <mu-button slot="actions" flat color="primary" @click="apply">{{ $t('Action.Apply') }}</mu-button>
      <mu-button slot="actions" flat color="primary" @click="esc">{{ $t('Action.Esc') }}</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
import signals from "./signals.js";
import slots from "./slots.js";

export default {
  name: "setting",
  mixins: [signals, slots],
  props: ["show"],
  data() {
    return {
      fontSize: 16,
      // memLimit: 0.8,
      buttonText: "connect",
      webSocketStatus: false,
      options: ["en-US", "zh-CN"]
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getCookies();
    });
  },

  methods: {
    apply() {
      this.setCookies();
      this.$send(this.SIGNAL_TOGGLE_SETTINGS(this));
      this.$send(this.SIGNAL_APPLY_FONTSIZE(this));
    },

    esc() {
      this.setCookies();
      this.$send(this.SIGNAL_TOGGLE_SETTINGS(this));
    },

    getCookies() {
      if (this.$cookie.get("fontSize") != null)
        this.fontSize = parseInt(this.$cookie.get("fontSize"));
    },

    setCookies() {
      this.$cookie.set("fontSize", this.fontSize, {
        expires: "1Y"
      });
      this.$cookie.set("lang", this.$i18n.locale, {
        expires: "1Y"
      });
    }
  }
};
</script>

<style scoped>
</style>
