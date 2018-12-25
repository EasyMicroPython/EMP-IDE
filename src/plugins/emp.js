var EMP = {}

EMP.install = function (Vue) {
    Vue.prototype.$emp = {
        funcName: func => func("").split("(")[0],
        deviceInfo: () => `device_info()\r`,
        memoryStatus: () => `memory_status()\r`,
        memoryAnalysing: filename => `memory_analysing('${filename}')\r`,
        runScript: filename => `exec(open('${filename}').read())\r`,
        tree: () => "tree()\r",
        getCode: filename => `get_code('${filename}')\r`,
        newFile: filename => `new_file('${filename}')\r`,
        delFile: filename => `del_file('${filename}')\r`,
        newFolder: path => `new_folder('${path}')\r`,
        delFolder: path => `del_folder('${path}')\r`,
        rename: (old, _new) => `rename('${old}','${_new}')\r`,
        install: pkg => `emp_install('${pkg}')\r`
    }
}

export default EMP