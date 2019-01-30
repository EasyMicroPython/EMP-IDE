var slots = {
  methods: {
    //打开设置窗口,点击设置按钮时触发
    slotUpdateTree(kwargs) {
      kwargs.treeData[0].children.sort(function (s1, s2) {
        let x1 = s1.name.toUpperCase();
        let x2 = s2.name.toUpperCase();
        if (s1.children !== undefined && s2.children !== undefined) {
          if (x1 < x2)
            return -1;

          if (x1 > x2)
            return 1;

        } else if (s1.children === undefined && s2.children === undefined) {
          if (x1 < x2)
            return -1;

          if (x1 > x2)
            return 1;

        } else {
          if (s1.children !== undefined)
            return -1;
          else
            return 1;

        }

        return 0;
      });

      this.data = kwargs.treeData;
      setTimeout(() => this.$send(this.SIGNAL_CLEAR(this)), 300);
    },

    slotRunCurrentScript() {
      if (this.currentNode != null)
        this.$send(
          this.SIGNAL_SEND_COMMAND(this, this.$emp.runScript(this.currentNode.name))
        );
      else this.$toast.error("No file opened!");
    }
  }
};

export default slots;
