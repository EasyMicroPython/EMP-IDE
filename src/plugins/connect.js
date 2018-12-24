var Connect = {};
Connect.install = function(Vue) {
  /**
   * 信号与槽
   * @method $connect
   * @param {Vue object} sender 发送信号的组件
   * @param {Object} signal 信号,包含信号的名字和参数
   * @param {String} receiver 接受者,是vue控件的ref,如果是传递给父组件的信息,则recevier === 'parent'(我规定就是这么传参的)
   * @param {String} slot 槽函数, 规范: 以slot开头 接受者需要执行的函数名字
   */
  Vue.prototype.$connect = function(signal) {
    var sender = signal.sender;
    var receiver = signal.receiver;
    var slot = signal.slot;
    var kwargs = signal.kwargs;

    var parent = sender.$parent;
    try {
      while (!parent.isParent) {
        parent = parent.$parent;
      }
      if (receiver === "parent") {
        parent[slot](kwargs);
      } else {
        parent.$refs[receiver][slot](kwargs);
      }
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
    }
  };

  Vue.prototype.$send = function(signal) {
    if (signal.sender.isParent) {
      if (signal.receiver === "self") {
        this[signal.slot](signal.kwargs);
      } else {
        this.$refs[signal.receiver][signal.slot](signal.kwargs);
      }
    } else {
      if (signal.receiver === "self") {
        this[signal.slot](signal.kwargs);
      } else {
        signal.sender.$emit("events", signal);
      }
    }
  };
};

export default Connect;
