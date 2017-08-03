# mip-wygx-classtab

mip-wygx-classtab 用于多按钮，多样式绑定切换

标题|内容
----|----
类型|通用
支持布局|N/S
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-wygx-classtab/mip-wygx-classtab.js

## 示例

### 基本用法
```html
<mip-upload type="file"
	width="200px"
	height="35px"
	backgroundColor ="red"
	innerText="200px"

>
	
</mip-upload>
```

## 属性

### bind-to
说明：绑定元素的选择器(css选择器)

必选项：是

类型：string

### toggle-class
说明： 需要指定切换的类名

必选项：是

类型：string

## 注意事项
1. 样例中的类名并非实际所需，只是方便测试添加
2. 绑定元素中不能含有和即将绑定的类名同名的class, 同名后者覆盖
3. 被绑定元素不宜过多，会影响性能
4. 注意css权重问题
