## 初始化

### 全局安装 yo 和 generator-code 两个库（推荐使用 node18 以上环境）

npm install -g yo generator-code

### 使用 yo 指令生成 vscode 项目模板

yo code

### 打包

- 安装 vsce

```base
npm install -g @vscode/vsce
```

- 打包

```base
vsce package
```

## package.json 的 contributes 属性

```jsonc
{
	"contributes": {
		/**
    commands 声明插件所提供的命令。
      command: 命令的唯一标识符（ID），格式通常为 <extensionName>.<commandName>。该 ID 用于在代码中调用该命令。
      title: 命令的显示名称，用户可以在命令面板（Command Palette）中看到这个名称。
		*/
		"commands": [
			{
				"command": "formatSpace.helloWorld",
				"title": "Hello World",
			},
		],
		/**
    menus: 定义命令在编辑器中的位置，例如右键菜单、编辑器标题栏等。
      editor/context：表示在编辑器区域右键时显示的上下文菜单。
      editor/title：表示编辑器右上角标题栏中的菜单（通常位于文件名右侧的 ... 菜单中）。

        command：要显示的命令 ID，必须与 commands 中定义的命令一致。
        when（可选）：指定菜单项何时可见
          "editorTextFocus" 表示只有当编辑器处于焦点状态时才显示。

        group（可选）：用于控制菜单项在菜单中的分组和排序。
          navigation：靠近顶部的位置
          clipboard：剪贴板相关命令
          transform：文本转换类命令
          custom/groupName：自定义分组名称
		*/
		"menus": {
			"editor/context": [
				{
					"command": "formatSpace.helloWorld",
					"when": "editorTextFocus",
					"group": "navigation",
				},
			],
			"editor/title": [
				{
					"command": "formatSpace.helloWorld",
					"when": "editorTextFocus",
					"group": "navigation",
				},
			],
		},
		/**
    keybindings 设置默认快捷键绑定到指定命令。
      command: 要绑定快捷键的命令 ID，必须与 commands 中定义的某个命令一致。
      key: 默认快捷键（适用于 Windows/Linux）。
      mac: 可选，指定 macOS 上的快捷键。
      when: 可选，指定快捷键生效的上下文条件
    */
		"keybindings": [
			{
				"command": "formatSpace.helloWorld",
				"key": "ctrl+s",
				"mac": "ctrl+s",
				"when": "editorTextFocus",
			},
		],
		/**
    configuration 定义插件支持的配置项，用户可以在设置中修改这些值。
      type：必须为 object，表示这是一个配置对象。
      title：该配置组在设置界面中的标题。
      properties：定义具体的配置项，每个配置项可以有以下属性：
        type：配置项类型，如 boolean、string、number、array、object 等。
        default：默认值，当用户未显式设置时使用。
        description：描述信息，显示在设置页面中，帮助用户理解该配置的作用。
        enum（可选）：枚举值列表，限制用户只能选择指定选项。
        minimum / maximum（可选）：用于数值型配置，设定取值范围。
    */
		"configuration": {
			"type": "object",
			"title": "Format Auto Space Configuration",
			"properties": {
				"formatSpace.statusBarText": {
					"type": "object",
					"scope": "resource",
					"default": {
						"formattingEnabled": "FFFormatSpace: $(check)",
						"formattingDisabled": "FFFormatSpace: $(x)",
					},
					"description": "FFFormatSpace Status Bar Text",
				},
			},
		},
		/**
    views 在侧边栏中添加自定义视图（如资源管理器下方的面板）。
      "explorer"：资源管理器下方（与文件资源管理器图标并列）
        id：视图的唯一标识符（字符串），用于在代码中引用该视图。
        name：显示在侧边栏标题中的名称
      "debug"：调试面板下方
      "git"：Git 面板下方（如果 Git 插件已安装）
      "timeline"：时间线面板
      "extension"：顶部菜单栏中的扩展菜单下拉区（VS Code 1.60+
    */
		"views": {
			"explorer": [
				{
					"id": "formatSpace.helloWorld",
					"name": "Format Format Sidebar",
					"icon": "media/icon.svg",
					"contextualTitle": "Format Tools",
				},
			],
		},

		// languages 注册新语言支持（如语法高亮、语言服务器等）。
		// debuggers 添加调试器支持，允许用户启动调试会话
	},
}
```

## 参考链接

- [vscode 插件开发](https://juejin.cn/post/7435927399634534452)
- [vscode 文档](https://code.visualstudio.com/api)
- [开发一个 vscode 扩展, 内附多图发布扩展流程](https://blog.csdn.net/linhieng/article/details/136614284)
