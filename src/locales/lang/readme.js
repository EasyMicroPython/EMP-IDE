export default `
     _____  __  __  ____    ___  ____   _____
    | ____||  \\/  ||  _ \\  |_ _||  _ \\ | ____|
    |  _|  | |\\/| || |_) |  | | | | | ||  _|
    | |___ | |  | ||  __/   | | | |_| || |___
    |_____||_|  |_||_|     |___||____/ |_____|

    Easy MicroPython (EMP) is an open source project led by 1ZLAB 
    to provide a faster and more efficient development experience 
    for MicroPython enthusiasts.

    GitHub:   https://github.com/Fuermohao/EMP-IDE
    HomePage: http://www.1zlab.com
    Docs:     http://www.1zlab.com/wiki/micropython-esp32/emp-ide-userguide/

    Before you start using it, you need to use the upip to install 
    the emp-1zlab module on your MicroPython device. Please follow 
    the instructions below:

    import upip
    upip.install('emp-1zlab')

    import emp_boot
    emp_boot.set_boot_mode()

    Enter 2, This operation will overwrite your boot.py file, and your 
    device will restart. Please follow the prompts to connect to wifi 
    after rebooting. After that, webrepl will be automatically enabled. 
    The default password is '1zlab', you can modify it in webrepl.pass.

     _____  __  __  ____    ___  ____   _____
    | ____||  \\/  ||  _ \\  |_ _||  _ \\ | ____|
    |  _|  | |\\/| || |_) |  | | | | | ||  _|
    | |___ | |  | ||  __/   | | | |_| || |___
    |_____||_|  |_||_|     |___||____/ |_____|

    Easy MicroPython (EMP) 是一个由1Z实验室主导的开源项目，旨在为广大的
    MicroPython爱好者提供更加快速和高效的开发体验。

    GitHub:  https://github.com/Fuermohao/EMP-IDE
    主页：    http://www.1zlab.com
    文档：    http://www.1zlab.com/wiki/micropython-esp32/emp-ide-userguide/

    在开始使用之前，你需要在你的MicroPython设备上安装 emp-1zlab 模块。请按
    照如下的步骤进行：
    
    import upip
    upip.install('emp-1zlab')

    import emp_boot
    emp_boot.set_boot_mode()

    输入2，回车。这将重新覆盖你的 boot.py 文件，之后你的设备将会进行一次重启。
    重启之后按照命令行中的提示来使你的设备连接至WiFi网络。在这之后，webrepl将会
    自动开启，默认的连接密码为'1zlab', 你可以在 webrepl.pass 文件中修改它。
`
