export const getFormatText = (allText: string) => {
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
		// 英文前面接标点符号（如 , ( ) [ ] 等），插入空格
		.replace(/([,{}()$$])([a-zA-Z0-9])/g, '$1 $2');
	// 英文后面接标点符号，插入空格
	// .replace(/([a-zA-Z0-9])([,!$$$])/g, '$1 $2');

	// 4. 还原行内代码
	formattedText = formattedText.replace(/__INLINE_CODE_(\d+)__/g, (_, idx) =>
		inlineCodes[Number(idx)].replace(/\s*`([^`]*)`\s*/g, ' `$1` ')
	);
	// 5. 还原多行代码块
	formattedText = formattedText.replace(
		/__CODE_BLOCK_(\d+)__/g,
		(_, idx) => codeBlocks[Number(idx)]
	);
	// formattedText = formattedText.replace(/\s+/g, ' ');

	return formattedText;
};
