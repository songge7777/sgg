# 小程序
[[toc]]

## 一、准备工作

### 1、小程序闲谈
- 1、微信小程序，简称小程序，英文名`Mini Program`，是一种不需要下载安装即可使用的应用 
- 2、小程序刚发布的时候要求压缩包的体积不能大于1M,，否则无法通过，在2017年4月做了改进，由原来的1M提升到2M;
- 3、2017年1月9日0点，万众瞩目的微信第一批小程序正式低调上线。
- 4、同App进行互补，提供同app类型的功能，比app使用方便简洁
- 5、通过扫一扫或者在微信搜索即可下载
- 6、用户使用频率不高，但又不得不用的功能软件，目前看来小程序是首选
- 7、开发门槛低， 成本低

## 二、储备知识
## 1、flex 布局
- Flex是Flexible Box的缩写，意为”弹性布局”，用来为盒状模型提供最大的灵活性
- [Flex学习文档](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
- 容器的属性
```md
	-	`flex-direction` 属性决定主轴的方向（即项目的排列方向）。
	-	`flex-wrap` 如果一条轴线排不下，如何换行。
	-	`flex-flow` 是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row` `nowrap`。
	-	`justify-content` 定义项目在主轴上的对齐方式。
	-	`align-items` 定义项目在交叉轴上如何对齐。
	-	`align-content` 定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
```
- 项目的属性
```md
  - `order` 定义项目的排列顺序。数值越小，排列越靠前，默认为0。
  - `flex-grow` 定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
  - `flex-shrink` 定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
  - `flex-basis`  定义了在分配多余空间之前，项目占据的主轴空间
  - `flex` 是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为0 1 auto。后两个属性可选。
  - `align-self` 可覆盖`align-items`属性。默认值为`auto`。
```
- flex 实现三栏自适应布局
```html
<style>
.layout{
    display: flex;
  }
 .left,.right{
    width: 100px;
    background: red;
  }
  .center{
    background: green;
    flex: 1;
  }
  .one div{
    height: 100px
  }

  </style>
 <section class="layout">
  <div class="left">左</div>
  <div class="center">中</div>
  <div class="right">右</div>
 </section>
```

## 2、设备独立像素 && css像素 && dpr
- 设备独立像素(也叫密度无关像素)，可以认为是计算机坐标系统中的一个点，这个点代表一个可以由程序使用并控制的虚拟像素(比如：CSS 像素,只是在android机中CSS 像素就不叫”CSS 像素”了而是叫”设备独立像素”)，然后由相关系统转换为物理像素(CSS 依靠他转换)。
- dpr: 设备像素比，物理像素/设备独立像素 = dpr, 工作中一般以iphone 6的尺寸为标准来开发, dpr = 2
- PPI:一英寸显示屏上的像素点个数
- DPI:最早指的是打印机在单位面积上打印的墨点数，墨点越多越清晰
<img :src="$withBase('/img/iphone1.jpg')" >
<img :src="$withBase('/img/iphone2.jpg')" >
<img :src="$withBase('/img/iphone3.jpg')" >

## 3、移动端适配方案
- [viewport](https://www.cnblogs.com/2050/p/3877280.html )
- [知乎自适应](https://www.zhihu.com/question/313971223/answer/628236155)

```html
<!-- 下面这个就是设置  ideal viewport -->
<meta name='viewport' content='width=device-width,initial-scale=1.0,maximun-scale=1.0,user-scalable=no'>
```
|     参数       |   解释   |
| -------------  |  :-------------:|
| width          | 	设置layout viewport  的宽度，为一个正整数，或字符串"width-device" |
| initial-scale  |  设置页面的初始缩放值，为一个数字，可以带小数 |
| minimum-scale	 |  允许用户的最小缩放值，为一个数字，可以带小数 |
| maximum-scale	 |  允许用户的最大缩放值，为一个数字，可以带小数 |
|  height       |  设置layout viewport  的高度，这个属性对我们并不重要，很少使用 |
| user-scalable |  是否允许用户进行缩放，值为"no"或"yes", no 代表不允许，yes代表允许 |

- 三个viewport的理论
  - layout viewport(网页的宽度) 通过 document.documentElement.clientWidth 来获取
  - visual viewport(可视区域宽度) 通过 window.innerWidth 来获取
    - 如果电脑宽度的网页放到首页上,肯定放不下,会出现滑动条 即(window.innerWidth < document.documentElement.clientWidth)
  - ideal viewport(移动设备的理想宽度,即下面标签中的 width=device-width)
    - ideal viewport 的意义在于，无论在何种分辨率的屏幕下，那些针对ideal viewport 而设计的网站，不需要用户手动缩放，也不需要出现横向滚动条，都可以完美的呈现给用户。
    - 要得到ideal viewport就必须把默认的layout viewport的宽度设为移动设备的屏幕宽度。因为meta viewport中的width能控制layout viewport的宽度，所以我们只需要把width设为width-device这个特殊的值就行了。
## 4、rem适配
- 1.为什么做rem适配
	-	a)机型太多，不同的机型屏幕大小不一样
	-	b)需求： 一套设计稿的内容在不同的机型上呈现的效果一致，根据屏幕大小不同的变化，页面中的内容也相应变化
- 第三方库实现`lib-flexible` + `px2rem-loader`
```js
function remRefresh() {
	let clientWidth = document.documentElement.clientWidth;
	// 将屏幕等分10份
	let rem = clientWidth / 10;
	document.documentElement.style.fontSize = rem + 'px';
	document.body.style.fontSize = '12px';
}

window.addEventListener('pageshow', () => {
	remRefresh()
})
// 函数防抖
let timeoutId;
window.addEventListener('resize', () => {
timeoutId && clearTimeout(timeoutId);
timeoutId = setTimeout(() =>{
	remRefresh()
	}, 300)
})

{
  test: /\.css$/,
  use: [
    { loader:MiniCssExtractPlugin.loader },
    'css-loader',
    {
      loader: 'px2rem-loader',
      options: {
        remUnit: 75, // rem的单位
        remPrecision: 6 // 计算后的rem小数点保留精度位数
      }
    }
  ]
}
```
### 移动端自适应
- `npm install -S webpack@5.74.0 webpack-cli@4.10.0 css-loader@6.7.1 px2rem-loader@0.1.9 style-loader@3.3.1 html-webpack-plugin@5.5.0`
- `style-loader`的作用是把 CSS 插入到 DOM 中，就是处理css-loader导出的模块数组，然后将样式通过style标签或者其他形式插入到DOM中
- `css-loader` 会对 @import 和 url() 进行处理，就像 js 解析 import/require() 一样
- `px2rem-loader` 把css 里面的 `px`值转换成 `rem`
```js
// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode:'development',
    entry:'./src/index.js',
    output:{
        filename:'main.js',
        path: path.resolve(__dirname,'dist')
    },
    module: {
        rules: [{
          test: /\.css$/,
          use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'px2rem-loader',
            options: {
              remUni: 75,// rem的单位
              remPrecision: 8// 计算后的rem小数点保留精度位数
            }
          }]
        }]
      },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html',
        })
    ]
}

// src/index.js
import './index.css';

function remRefresh() {
	let clientWidth = document.documentElement.clientWidth;
	// 将屏幕等分10份
	let rem = clientWidth / 10;
	document.documentElement.style.fontSize = rem + 'px';
	document.body.style.fontSize = '12px';
}

window.addEventListener('pageshow', () => {
	remRefresh()
})
// 函数防抖
let timeoutId;
window.addEventListener('resize', () => {
timeoutId && clearTimeout(timeoutId);
timeoutId = setTimeout(() =>{
	remRefresh()
	}, 300)
})

// src/index.css
*{
    margin: 0;
    padding: 0;
}
#main{
    display: flex;
    flex-wrap: wrap;
}
.div1{
    flex-shrink: 0;
    width: 100px;
    height: 150px;
    border: 1px solid red;
    box-sizing: border-box;
    margin-right: 25px;
}

// public/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name='viewport' content='width=device-width,initial-scale=1.0,maximun-scale=1.0,user-scalable=no'>
    <title>Document</title>
</head>
<body>
    <div id="main">
        <div class="div1"></div>
        <div class="div1"></div>
        <div class="div1"></div>
        <div class="div1"></div>
        <div class="div1"></div>
        <div class="div1"></div>
    </div>
    <div>
        测试字体大小
    </div>
</body>
</html>
```
## 三、创建新项目及开发工具介绍
## 1、小程序相关资料
- [官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [编辑器](https://developers.weixin.qq.com/miniprogram/dev/devtools/stable.html)
- [小程序注册](https://mp.weixin.qq.com/wxopen/waregister?action=step1&token=&lang=zh_CN)

- 资料包(开发工具IDE,代码等)
- 注册小程序账号

<img :src="$withBase('/img/vxlogin.png')" >
<img :src="$withBase('/img/vxlogin1.png')" >

##	2、创建新项目
  - 打开开发工具创建项目
	-	新建项目
	-	AppID 必须是自己的 -----> 微信公众平台-小程序-设置(左边tab)-基础设置-帐号信息
	-	不使用云服务

##	3、开发工具介绍		
  - 模拟器  编辑器  调试器：  三个至少要打开一个
	-	编译按钮：  重新编译小程序
	-	预览： （二维码，自动） 可以实时在手机上进行真机查看，自己扫自己的
	-	真机调试：连接成功，会打开一个调试窗口用于显示真机调试的信息
	-	上传：相当于发布，需要提交审核
	-	版本管理： 通过git管理代码
	-	详情： 里面的本地设置很重要

## 4、小程序初始化项目文件介绍
  - 小程序的全局对象是微信
	- 小程序开发文档简介  
		-	页面的配置和语法找框架
		-	页面的布局搭建找组件
		-	实现特定功能的时候找API
	-	project.config.json： 项目的配置文件   文件会自动生成，你别管
	-	sitemap.json：新添加的  开关来配置其小程序页面是否允许微信索引，有介绍可以看，顺变找到小程序开发文档
	-	app.js:       App() 必须在 app.js 中调用，必须调用且只能调用一次。不然会出现无法预期的后果。
	-	app.json:     当前小程序应用的配置项  参考官网一个一个看
	-	app.wxss:     当前小程序应用的全局css样式
	-	pages：       页面相关的介绍
	-	utils:	      到时候自己封装
## 四、小程序常用语法
## 1、数据绑定和更新
- [数据绑定](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/)
- 数据绑定 `{{}}`
- 数据修改 `setData`
```html
<view>
  <!-- 测试页面 -->
  <!-- 1、数据展示 {{}} -->
  数据绑定:{{msg}}
  <!-- 2、属性绑定 -->
  <image src="{{imgSrc}}" alt=""/>
  <button bindtap='handlerFn'>按钮</button>
</view>
<script>
Page({
  /**
   * 页面的初始数据
   */
  data: {
        msg:'测试数据',
        imgSrc:'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'
  },
  // 回调函数
  handlerFn(){
      // 通过 setData 修改数据  react 通过 this.setState
      this.setData({
          msg:'动态修改数据',
          imgSrc:'https://img2.baidu.com/it/u=3531138711,1869416684&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=410'
      })
  }
 
})
</script>
```
## 2、事件绑定
  - [事件](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html#%E4%BA%8B%E4%BB%B6%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F)
	-	冒泡事件和非冒泡事件
		-	冒泡事件(`bind`)：当一个组件上的事件被触发后，该事件会向父节点传递。
		-	非冒泡事件(`catch`)：当一个组件上的事件被触发后，该事件不会向父节点传递。
	-	`bindtap` 和 `catchtap` 点击事件

```html
<!--pages/index/index.wxml-->
<view class="container">
  <image class="img" src="{{imgSrc}}" ></image>
    
  <text  class="nickName">{{userInfo.nickName}}</text>

  <button class="nickName" wx:else size="mini" open-type="getUserInfo" bindtap="getUserInfo">获取用户信息</button>
  <text class="text">欢迎来到小程序</text>
</view>
<script>
// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgSrc:'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
    userInfo:'name',
  }
})
</script>
```
## 3、授权获取用户基本信息
-	[wx.getUserProfile](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserProfile.html)

```html
<button class="nickName" size="mini" bindtap="getUserInfo">获取用户信息</button>
<script>
  getUserInfo(){
     wx.getUserInfo({
      desc:'xx',
      success: r => {
        this.setData({
          userInfo : r.userInfo
        })
        console.log('r',r.userInfo.nickName)
      },
    })
  },
</script>
```
## 4、条件渲染
- wx:if
- wx:else
```html
<text wx:if="{{userInfo.nickName}}"  class="nickName">{{userInfo.nickName}}</text>
<button  wx:else class="nickName" size="mini" bindtap="getUserInfo">获取用户信息</button>
```
## 5、路由跳转
 - `wx.reLaunch`
- `wx.redirectTo`
-	`wx.navigateTo`
- `wx.navigateBack`
```html
<view bindtap="toIndex">点我去首页</view>
<script>
toIndex(){
	wx.navigateTo({
		url: '/pages/index/index',
	})
}
</script>
```
-
```js
wx.reLaunch({
  url: 'test?id=1'
}) 

```
## 6、生命周期的钩子
- `onLoad` 监听页面加载 
- `onReady` 监听页面初次渲染完成
- `onShow` 监听页面显示 切换路由
- `onHide` 监听隐藏页面
- `onUnload` 监听页面卸载
```js
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
```