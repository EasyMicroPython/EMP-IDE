export const funcName = func => func("").split("(")[0];

export const deviceInfo = () => `device_info()\r`;
export const memoryStatus = () => `memory_status()\r`;
export const memoryAnalysing = filename => `memory_analysing('${filename}')\r`;
export const runScript = filename => `exec(open('${filename}').read())\r`;
export const tree = () => "tree()\r";
export const getCode = filename => `get_code('${filename}')\r`;
export const newFile = filename => `new_file('${filename}')\r`;
export const delFile = filename => `del_file('${filename}')\r`;
export const newFolder = path => `new_folder('${path}')\r`;
export const delFolder = path => `del_folder('${path}')\r`;
export const rename = (old, _new) => `rename('${old}','${_new}')\r`;
export const install = pkg => `emp_install('${pkg}')\r`;



// var emp = {}

// emp.install = function (Vue) {
//     Vue.prototype.$emp = {
//         funcName: func => func("").split("(")[0],
//         deviceInfo: () => `device_info()\r`,
//         memoryStatus: () => `memory_status()\r`,
//         memoryAnalysing: filename => `memory_analysing('${filename}')\r`,
//         runScript: filename => `exec(open('${filename}').read())\r`,
//         tree: () => "tree()\r",
//         getCode: filename => `get_code('${filename}')\r`,
//         newFile: filename => `new_file('${filename}')\r`,
//         delFile: filename => `del_file('${filename}')\r`,
//         newFolder: path => `new_folder('${path}')\r`,
//         delFolder: path => `del_folder('${path}')\r`,
//         rename: (old, _new) => `rename('${old}','${_new}')\r`,
//         install: pkg => `emp_install('${pkg}')\r`
//     }
// }

// export default emp