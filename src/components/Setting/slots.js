var slots = {
    methods: {
      //打开设置窗口,点击设置按钮时触发
     slotConnected(){
       this.buttonText = "Disconnect";
       this.webSocketStatus = true;
     },
     slotDisconnect(){
       this.buttonText = "Connect";
       this.webSocketStatus = false;
     },
  
    }
  }
  
  export default slots
  