// @ts-check

/** @type {import("prettier").Config} */
export default {
	printWidth: 100, // 每行的最大长度，超过这个长度则需要换行
	tabWidth: 2, // 每个缩进使用几个空格
	useTabs: false, // 是否使用 tab 来缩进
	semi: true, // 是否在语句结尾使用分号
	singleQuote: false, // 是否使用单引号而不是双引号
	trailingComma: 'none', // 在多行对象、数组等的最后一个元素后是否添加尾随逗号
	bracketSpacing: true, // 在对象字面量中是否在括号之间留有空格
	arrowParens: 'always', // 在箭头函数中是否总是需要括号
};
