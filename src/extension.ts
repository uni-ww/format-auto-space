import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	// const configuration = vscode.workspace.getConfiguration();
	// console.log('🚀 ~ activate ~ configuration:', configuration)

	const disposable = vscode.commands.registerCommand(
		'formatSpace.format',
		async () => {
			vscode.window.showInformationMessage('格式化成功');

			// 获取当前编辑器
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}

			// 示例：替换整个文档内容为某个格式化后的文本
			const document = editor.document;
			// 获取文件名后缀
			const fileName = document.fileName;
			const ext = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
			if (ext !== '.md' && ext !== '.txt') {
				// 手动触发保存（代替原 Ctrl+S 的保存行为）
				await vscode.commands.executeCommand('workbench.action.files.save');
				return;
			}
			const allText = document.getText();
			const fullRange = new vscode.Range(
				document.positionAt(0),
				document.positionAt(allText.length)
			);

			// 1. 提取多行代码块（```...```）
			const codeBlockRegex = /```[\s\S]*?```/g;
			let codeBlocks: string[] = [];
			let textWithoutCodeBlocks = allText.replace(codeBlockRegex, (match) => {
				codeBlocks.push(match);
				return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
			});

			// 2. 提取行内代码（`...`），注意不要匹配多行代码块内的内容
			const inlineCodeRegex = /`[^`\n]+`/g;
			let inlineCodes: string[] = [];
			textWithoutCodeBlocks = textWithoutCodeBlocks.replace(
				inlineCodeRegex,
				(match) => {
					inlineCodes.push(match);
					return `__INLINE_CODE_${inlineCodes.length - 1}__`;
				}
			);

			// 3. 对剩余内容做格式化
			let formattedText = textWithoutCodeBlocks
				// 英文后面接中文，插入空格
				.replace(/([a-zA-Z0-9]+)([\u4e00-\u9fa5])/g, '$1 $2')
				// 中文后面接英文，插入空格
				.replace(/([\u4e00-\u9fa5])([a-zA-Z0-9]+)/g, '$1 $2')
				// 英文前面接标点符号（如 . , ! ? ( ) [ ] 等），插入空格
				.replace(/([,!?$$$_])([a-zA-Z0-9])/g, '$1 $2')
				// 英文后面接标点符号，插入空格
				.replace(/([a-zA-Z0-9])([,!?$$$_])/g, '$1 $2');

			// 4. 还原行内代码
			formattedText = formattedText.replace(
				/__INLINE_CODE_(\d+)__/g,
				(_, idx) => inlineCodes[Number(idx)]
			);
			// 5. 还原多行代码块
			formattedText = formattedText.replace(
				/__CODE_BLOCK_(\d+)__/g,
				(_, idx) => codeBlocks[Number(idx)]
			);

			console.log('=========2222222==========', formattedText);

			editor.edit((editBuilder) => {
				editBuilder.replace(fullRange, formattedText);
			});

			// 手动触发保存（代替原 Ctrl+S 的保存行为）
			await vscode.commands.executeCommand('workbench.action.files.save');
		}
	);

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
