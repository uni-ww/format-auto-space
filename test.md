# 自动化空格格式化测试文件

## 中英文混合测试

1. 基础测试：

   - `Hello世界` → 应格式化为 "Hello 世界"
   - `世界Hello` → 应格式化为 "世界 Hello"
   - `这是一段English文本` → 应格式化为 "这是一段 English 文本"

2. 数字测试：
   - `2023年` → 应格式化为 "2023 年"
   - `版本v2.0` → 应格式化为 "版本 v2.0"

## 标点符号测试

1. 英文标点：

   - 句子结束.Period → 保持不变
   - 逗号测试,接着 → 保持不变
   - 感叹号!重要 → 保持不变

2. 中文标点：
   - 中文句号。接着 → 保持不变
   - 中文逗号，测试 → 保持不变

## 代码块保护测试

测试 `Inner` 代码块

## 链接测试

[ `测试a1测试` ](./这个是test%20中英文加空格s1联动的文件.md) → [测试 a1 测试](./这个是test%20中英文加空格s1联动的文件.md)

## `$` 符号测试

$setup.msg = instance.setupState.msg; -> 保持不变

`价格$100元` -> 价格 $100 元

`成本$$$较高` -> 成本 $$$ 较高
