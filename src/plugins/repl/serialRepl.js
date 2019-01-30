import basicRepl from "./basicRepl"


let serialRepl = {
    replExec: basicRepl.replExec,
    onOpen: basicRepl.onOpen,
    onClose: basicRepl.onClose,
    onMessage: function (event) {
        try {
            let recData = JSON.parse(event.data);
            if (recData.func === this.$emp.funcName(this.$emp.getCode)) {
                this.$send(this.SIGNAL_SHOW_CODES_PMAX(this, recData.data));
            }
            if (recData.func === 'put_file') {
                setTimeout(() => this.$send(this.SIGNAL_PUT_NEXT_FILE(this)), 300);
                setTimeout(() => this.$send(this.SIGNAL_CLEAR_TERM(this)), 300);
            }
        } catch (error) {
            // 
        }

        this.$dtp.fragments += event.data;

        if (countString(this.$dtp.fragments, '==> PDU') === 2) {

            this.$dtp.fragments = this.$dtp.fragments.split('==> PDU')[1];
            this.$dtp.fragments = this.$dtp.fragments.replace(/\r\n/g, '\\n');
            this.$dtp.fragments = this.$dtp.fragments.slice(10, this.$dtp.fragments.length - 4);
            // eslint-disable-next-line
            // console.log(this.$dtp.fragments);
            let recData = JSON.parse(this.$dtp.fragments);

            if (recData.func === this.$emp.funcName(this.$emp.tree)) {
                this.$send(this.SIGNAL_UPDATE_TREE(this, [recData.data]));
                this.$send(this.SIGNAL_UPDATE_FINDER(this, recData.data));
                this.$send(this.SIGNAL_SHOW_PANE(this));
            }
            if (recData.func === this.$emp.funcName(this.$emp.getCode)) {
                this.$send(this.SIGNAL_SHOW_CODES_PMAX(this, recData.data));
            }
            if (recData.func === this.$emp.funcName(this.$emp.memoryAnalysing))
                this.$send(
                    this.SIGNAL_DEPENDS_ON_MEMORY_TO_GET_FILE(this, recData.data)
                );
            if (recData.func === this.$emp.funcName(this.$emp.deviceInfo))
                this.$send(this.SIGNAL_SHOW_SYS_INFO(this, recData.data));
            if (recData.func === this.$emp.funcName(this.$emp.memoryStatus))
                this.$send(this.SIGNAL_SHOW_MEMORY_STATUS(this, recData.data));

            this.$dtp.fragments = "";
        }

    },

    putFile: function (kwargs) {
        let fileData = new TextDecoder("utf-8").decode(kwargs.fileData);
        // console.log(typeof kwargs.fileData);
        this.$ws.send('EnterRawRepl');
        this.$ws.send(`PutFile:${kwargs.filename}:${fileData}`);

        // this.$ws.send(`PutFile:${kwargs.filename}:${fileData.replace(/"/g, '\\"')}"}`);
    },

    getFile: function (kwargs) {
        // let filename = kwargs.filename;
        this.$ws.send('EnterRawRepl');
        this.$ws.send(`GetFile:${kwargs.filename}`)
    }
}

let countString = function (string, subString) {

    string += "";
    subString += "";
    let n = 0;
    let pos = 0;
    if (subString.length <= 0)
        return 0
    // eslint-disable-next-line
    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            n += 1;
            pos += 1;

        } else break
    }
    return n;
};


export default serialRepl