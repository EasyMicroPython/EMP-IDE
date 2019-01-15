var EMP = {}

EMP.install = function (Vue) {
    Vue.prototype.$emp = {
        funcName: func => func("").split("(")[0].split('.')[1],
        deviceInfo: () => `emp.device_info()\r`,
        memoryStatus: () => `emp.memory_status()\r`,
        memoryAnalysing: filename => `emp.memory_analysing('${filename}')\r`,
        runScript: filename => `exec(open('${filename}').read())\r`,
        tree: () => "emp.tree()\r",
        getCode: filename => `emp.get_code('${filename}')\r`,
        newFile: filename => `emp.new_file('${filename}')\r`,
        delFile: filename => `emp.del_file('${filename}')\r`,
        newFolder: path => `emp.new_folder('${path}')\r`,
        delFolder: path => `emp.del_folder('${path}')\r`,
        rename: (old, _new) => `emp.rename('${old}','${_new}')\r`,
        install: pkg => `emp.emp_install('${pkg}')\r`
    }
}

export default EMP