import { getFormatText } from '../utils';

describe('getFormatText 函数测试', () => {
	test('中英文混合处理', () => {
		expect(getFormatText('Hello世界')).toBe('Hello 世界');
		expect(getFormatText('世界Hello')).toBe('世界 Hello');
		expect(getFormatText('这是一段English文本')).toBe('这是一段 English 文本');
	});

	test('数字与中文混合处理', () => {
		expect(getFormatText('2023年')).toBe('2023 年');
		expect(getFormatText('版本v2.0')).toBe('版本 v2.0');
	});

	test('英文标点符号保持不变', () => {
		expect(getFormatText('句子结束.Period')).toBe('句子结束.Period');
		expect(getFormatText('逗号测试,接着')).toBe('逗号测试,接着');
		expect(getFormatText('感叹号!重要')).toBe('感叹号!重要');
	});

	test('中文标点符号保持不变', () => {
		expect(getFormatText('中文句号。接着')).toBe('中文句号。接着');
		expect(getFormatText('中文逗号，测试')).toBe('中文逗号，测试');
	});

	test('行内代码块保护', () => {
		expect(getFormatText('测试`Inner`代码块')).toBe('测试 `Inner` 代码块');
		expect(getFormatText('测试`Inner`   代码块')).toBe('测试 `Inner` 代码块');
		expect(getFormatText('测试   `Inner`代码块')).toBe('测试 `Inner` 代码块');
		expect(getFormatText('测试 `Inner` 代码块')).toBe('测试 `Inner` 代码块');
	});

	// 新增：链接保持不变测试
	test('Markdown链接保持不变', () => {
		expect(
			getFormatText('[测试a1测试](./这个是test%20中英文加空格s1联动的文件.md)')
		).toBe('[测试 a1 测试](./这个是test%20中英文加空格s1联动的文件.md)');
	});

	// 新增：$符号处理测试
	test('$符号与中文混合', () => {
		expect(getFormatText('价格$100元')).toBe('价格 $100 元');
		expect(getFormatText('成本$$$较高')).toBe('成本 $$$ 较高');
	});
});
