var EMP = {}

EMP.install = function (Vue) {
    Vue.prototype.$emp = {
        funcName: func => func("").split("(")[0].split('.')[1],
        deviceInfo: () => `ide.device_info()\r`,
        memoryStatus: () => `ide.memory_status()\r`,
        memoryAnalysing: filename => `ide.memory_analysing('${filename}')\r`,
        runScript: filename => `exec(open('${filename}').read())\r`,
        tree: () => "ide.tree()\r",
        getCode: filename => `ide.get_code('${filename}')\r`,
        newFile: filename => `ide.new_file('${filename}')\r`,
        delFile: filename => `ide.del_file('${filename}')\r`,
        newFolder: path => `ide.new_folder('${path}')\r`,
        delFolder: path => `ide.del_folder('${path}')\r`,
        rename: (old, _new) => `ide.rename('${old}','${_new}')\r`,
        install: pkg => `ide.emp_install('${pkg}')\r`
    }
}

export default EMP