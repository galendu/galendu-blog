---
title: 前端基础-CSS基础
toc: true
abbrlink: a5207128
date: 2024-03-22 15:41:37
tags:
categories:
cover:
thumbnail:
---


## 概述

> 前端基础-CSS基础

<!--more-->

## 正文

### CSS选择器  
CSS 选择器是 CSS 规则的第一部分。它是元素和其他部分组合起来告诉浏览器哪个 HTML 元素应当是被选为应用规则中的 CSS 属性值的方式。选择器所选择的元素，叫做“选择器的对象”。  

- 选择器的种类:类型、类和 ID 选择器
```css
/* 类型 */
h1 {
}
/* 类 */
.xxx{
}
/* ID选择器 */
#xxx{
}
```
- 标签属性选择器  
```css
/* 根据一个元素上的某个标签的属性的存在以选择元素的不同方式 */
a[title] {}
/* 根据一个有特定值的标签属性是否存在来选择 */
a[href="https://example.com"] {}
```
- 伪类与伪元素
```css
/* 伪类:用来样式化一个元素的特定状态. :hover伪类会在鼠标指针悬浮到一个元素上的时候选择这个元素 */
a:hover{}

/* 伪元素:选择一个元素的某个部分而不是元素自己. ::first-line是会选择一个元素(<p>)中的第一行,类似<span>包在了第一个被格式化的外面,然后选择这个<span> */
p::first-line{}
```

- 运算符  
将其它选择器组合起来,更辅助的选择元素. (>)选择了\<xxx\>元素的初代子元素  
```css
article >p {
}
```

### 类型、类和ID选择器
- 类型
```css
类型选择器,也叫"标签名选择器/元素选择器"
span {
  background-color: yellow;
}

strong {
  color: rebeccapurple;
}

em {
  color: rebeccapurple;
}

/* 全局选择器* */
* {
margin: 0;
}

/* xx元素的第一个子元素 */
xx :first-child{};
xx *:first-child{};
```  
- 类选择器    
```css
.highlight {
  background-color: yellow;
}
/* <h1 class="highlight">Class selectors</h1>
<p>Veggies es bonus vobis, proinde vos postulo essum magis <span class="highlight">kohlrabi welsh onion</span> daikon amaranth tatsoi tomatillo
    melon azuki bean garlic.</p>

<p class="highlight">Gumbo beet greens corn soko <strong>endive</strong> gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard
    greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.</p> */

/* 指向特定元素的类 */
span.highlight {
  background-color: yellow;
}

h1.highlight {
  background-color: pink;
}

/* 多个类被应用的时候指向一个元素 */

.notebox {
  border: 4px solid #666;
  padding: .5em;
}

.notebox.warning {
  border-color: orange;
  font-weight: bold;
}

.notebox.danger {
  border-color: red;
  font-weight: bold;
}
/* 
<div class="notebox">
    This is an informational note.
</div>

<div class="notebox warning">
    This note shows a warning.
</div>

<div class="notebox danger">
    This note shows danger!
</div>

<div class="danger">
    This won't get styled — it also needs to have the notebox class
</div>
 */
```
- ID选择器  
```css
#one {
  background-color: yellow;
}

h1#heading {
  color: rebeccapurple;
}
```

### 属性选择器  
- 选择器的值是否存在  

选择器|示例|描述
-|-|-
[attr]|a[title]|匹配一个名为title的属性的元素   
[attr=value]|a[href="https://example.com"]|匹配href值为https://example.com的元素  
[attr~=value]|p[class~="special"]|匹配class有一个值为special  
[attr\|=value] |div[lang\|="zh"]|匹配lang的属性的值为zh，或者开始为zh  

```css
li[class] {
font-size: 200%;}

li[class="a"] {
background-color: yellow;}

li[class=~"a"] {
color: red;}

/* <h1>Attribute presence and value selectors</h1>
<ul>
  <li>Item 1</li>
    <li class="a">Item 2</li>
    <li class="a b">Item 3</li>
    <li class="ab">Item 4</li>
</ul> */


```

- 字符串匹配选择器   

选择器|       示例|       描述
--|--|--
[attr^=value] |       li[class^="box-"] |       匹配以box-开头的属性。
[attr$=value] |       li[class$="-box"] |       匹配以-box结尾的属性  
[attr*=value] |       li[class*="box"] |       匹配包含box的属性

- 大小写敏感  
```css
li[class^="a"] {
  background-color: yellow;
}

/* i 要以大小写不敏感的方式匹配字符 */
li[class^="a" i] {
  color: red;
}
```


### 伪类和伪元素  
- 伪类:头为冒号的关键字`:`   

```text
选择器           描述
:active       在用户激活（例如点击）元素的时候匹配。
:any-link       匹配一个链接的:link和:visited状态。
:blank       匹配空输入值的<input>元素。
:checked       匹配处于选中状态的单选或者复选框。
:current(en-US)       匹配正在展示的元素，或者其上级元素。
:default       匹配一组相似的元素中默认的一个或者更多的 UI 元素。
:dir       基于其方向性（HTMLdir属性或者 CSSdirection属性的值）匹配一个元素。
:disabled       匹配处于关闭状态的用户界面元素
:empty       匹配除了可能存在的空格外，没有子元素的元素。
:enabled       匹配处于开启状态的用户界面元素。
:first       匹配分页媒体的第一页。
:first-child       匹配兄弟元素中的第一个元素。
:first-of-type       匹配兄弟元素中第一个某种类型的元素。
:focus       当一个元素有焦点的时候匹配。
:focus-visible       当元素有焦点，且焦点对用户可见的时候匹配。
:focus-within       匹配有焦点的元素，以及子代元素有焦点的元素。
:future(en-US)       匹配当前元素之后的元素。
:hover       当用户悬浮到一个元素之上的时候匹配。
:indeterminate       匹配未定态值的 UI 元素，通常为复选框。
:in-range       用一个区间匹配元素，当值处于区间之内时匹配。
:invalid       匹配诸如<input>的位于不可用状态的元素。
:lang       基于语言（HTMLlang属性的值）匹配元素。
:last-child       匹配兄弟元素中最末的那个元素。
:last-of-type       匹配兄弟元素中最后一个某种类型的元素。
:left       在分页媒体中，匹配左手边的页。
:link       匹配未曾访问的链接。
:local-link(en-US)       匹配指向和当前文档同一网站页面的链接。
:is()       匹配传入的选择器列表中的任何选择器。
:not       匹配作为值传入自身的选择器未匹配的物件。
:nth-child       匹配一列兄弟元素中的元素——兄弟元素按照an+b形式的式子进行匹配（比如 2n+1 匹配元素 1、3、5、7 等。即所有的奇数个）。
:nth-of-type       匹配某种类型的一列兄弟元素（比如，<p>元素）——兄弟元素按照an+b形式的式子进行匹配（比如 2n+1 匹配元素 1、3、5、7 等。即所有的奇数个）。
:nth-last-child       匹配一列兄弟元素，从后往前倒数。兄弟元素按照an+b形式的式子进行匹配（比如 2n+1 匹配按照顺序来的最后一个元素，然后往前两个，再往前两个，诸如此类。从后往前数的所有奇数个）。
:nth-last-of-type       匹配某种类型的一列兄弟元素（比如，<p>元素），从后往前倒数。兄弟元素按照an+b形式的式子进行匹配（比如 2n+1 匹配按照顺序来的最后一个元素，然后往前两个，再往前两个，诸如此类。从后往前数的所有奇数个）。
:only-child       匹配没有兄弟元素的元素。
:only-of-type       匹配兄弟元素中某类型仅有的元素。
:optional       匹配不是必填的 form 元素。
:out-of-range       按区间匹配元素，当值不在区间内的时候匹配。
:past(en-US)       匹配当前元素之前的元素。
:placeholder-shown       匹配显示占位文字的 input 元素。
:playing       匹配代表音频、视频或者相似的能“播放”或者“暂停”的资源的，且正在“播放”的元素。
:paused       匹配代表音频、视频或者相似的能“播放”或者“暂停”的资源的，且正在“暂停”的元素。
:read-only       匹配用户不可更改的元素。
:read-write       匹配用户可更改的元素。
:required       匹配必填的 form 元素。
:right       在分页媒体中，匹配右手边的页。
:root       匹配文档的根元素。
:scope       匹配任何为参考点元素的元素。
:valid       匹配诸如<input>元素的处于可用状态的元素。
:target       匹配当前 URL 目标的元素（例如如果它有一个匹配当前URL 分段的元素）。
:visited       匹配已访问链接。
```

- 伪元素开头为双冒号`::`  
```text
选择器	描述
::after	匹配出现在原有元素的实际内容之后的一个可样式化元素。
::before	匹配出现在原有元素的实际内容之前的一个可样式化元素。
::first-letter	匹配元素的第一个字母。
::first-line	匹配包含此伪元素的元素的第一行。
::grammar-error	匹配文档中包含了浏览器标记的语法错误的那部分。
::selection	匹配文档中被选择的那部分。
::spelling-error	匹配文档中包含了浏览器标记的拼写错误的那部分。
```

```css
/* 伪类和伪元素组合起来 */
article p:first-child::first-line {
  font-size: 120%;
  font-weight: bold;
}

.box::before {
  content: "";
  display: block;
  width: 100px;
  height: 100px;
  background-color: rebeccapurple;
  border: 1px solid black;
}
```

### 关系选择器  
- 后代选择器  
后代选择器——典型用单个空格（" "）字符——组合两个选择器，比如，第二个选择器匹配的元素被选择，如果他们有一个祖先（父亲，父亲的父亲，父亲的父亲的父亲，等等）元素匹配第一个选择器。选择器利用后代组合符被称作后代选择器。
```css
body article p{}
```
- 相邻选择器
```css
p+img{}
```

- 通用选择器 
```css
h1~p{}
```

- 子代选择器  
子代关系选择器是个大于号（>），只会在选择器选中直接子元素的时候匹配。继承关系上更远的后代则不会匹配。例如，只选中作为<article>的直接子元素的<p>元素：

```css
article > p
```

### 层叠、优先级与继承  

```css
/* 层叠 */
h1 {
  color: red;
}
h1 {
  color: blue;
}

/* 优先级 */
.main-heading {
  color: red;
}

h1 {
  color: blue;
}

/* 继承 */
body {
  color: blue;
}

span {
  color: black;
}
```

### 层叠层  

### 盒模型  

### 背景与边框  

### 处理不同方向的文本  

### 溢出的内容  

### CSS的值与单位  

### 在CSS中调整大小  

### 图像、媒体和表单元素  

### 样式化表格  

### 调试CSS  

### 组织CSS  

### 基本的 CSS 理解  

### 创建精美的信纸  

### 一个漂亮的盒子 