import * as vscode from 'vscode';
import { getFormatText } from './utils';

export function activate(context: vscode.ExtensionContext) {
	// const configuration = vscode.workspace.getConfiguration();
	// console.log('🚀 ~ activate ~ configuration:', configuration);

	const disposable = vscode.commands.registerCommand(
		'formatSpace.format',
		async () => {
			// vscode.window.showInformationMessage('格式化成功');

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

			const edits: vscode.TextEdit[] = [];

			for (let lineNum = 0; lineNum < document.lineCount; lineNum++) {
				const originalLine = document.lineAt(lineNum).text;

				// 仅对该行进行格式化
				const formattedLine = getFormatText(originalLine);

				if (formattedLine !== originalLine) {
					// 如果有变化才生成 TextEdit
					const range = new vscode.Range(
						new vscode.Position(lineNum, 0),
						new vscode.Position(lineNum, originalLine.length)
					);
					edits.push(new vscode.TextEdit(range, formattedLine));
				}
			}

			if (edits.length > 0) {
				const workspaceEdit = new vscode.WorkspaceEdit();
				workspaceEdit.set(document.uri, edits);
				await vscode.workspace.applyEdit(workspaceEdit);
			}

			// 手动触发保存（代替原 Ctrl+S 的保存行为）
			await vscode.commands.executeCommand('workbench.action.files.save');
		}
	);

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
