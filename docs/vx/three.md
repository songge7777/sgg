# 谷粒云音乐
[[toc]]

## 1、创建tabBar 
- 创建底部[tabBar](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html)的方式
  - 第1、在app.json中创建一个`tabBar`对象(和`window`是同级)
  - 第2、在这个对象中,配置`list`属性, 他是一个数组, 里面存放的都是tab,
  - 第3、tab是一个对象他的结构如下
    - `pagePath` 页面路径，必须在 pages 中先定义
    - `text` tab 上按钮文字
    - `iconPath` 图片路径，icon 大小限制为 40kb，建议尺寸为 81px * 81px，不支持网络图片。
    - `selectedIconPath` 选中时的图片路径，icon 大小限制为 40kb，建议尺寸为 81px * 81px，不支持网络图片。
::: tip 重点
  其中 list 接受一个数组，只能配置最少 2 个、最多 5 个 tab
:::
- 新建video和center的page页面
- 在 app.json  配置一个路由  会自动在对应的文件夹下生产文件目录

```js
// app.json 
"pages":[
    "pages/index/index",
    "pages/video/video",
    "pages/center/center"
  ],
"tabBar": {
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "./static/images/tabs/tab-home.png",
        "selectedIconPath": "./static/images/tabs/tab-home-current.png"
      },
      {
        "pagePath": "pages/video/video",
        "text": "视频",
        "iconPath": "./static/images/tabs/select.png",
        "selectedIconPath": "./static/images/tabs/selected.png" 
      },
      {
        "pagePath": "pages/center/center",
        "text": "中心",
        "iconPath": "./static/images/tabs/tab-my.png",
        "selectedIconPath": "./static/images/tabs/tab-my-current.png"
      }
    ]
  },
```
## 2、个人中心的动画
- 动画用到的事件类型
  - `bindtouchstart` 手指触摸动作开始
  - `bindtouchmove` 手指触摸后移动
  - `bindtouchend` 手指触摸动作结束
- 事件对象`event.touches`
  - `event.touches` 表示当前停留在屏幕上的触摸点(也就是我们触发的手指),是一个数组
  - `clientX clientY` 距离页面可显示区域（屏幕除去导航条）左上角距离，横向为 X 轴，纵向为 Y 轴
  - `pageX, pageY` 距离文档左上角的距离，文档的左上角为原点 ，横向为 X 轴，纵向为 Y 轴
- 做动画用到的属性
  - `transform:translateY(rpx)`
  - `transition:transform 1s`
### 个人中心布局(这个页面不需要我们搭建)
```html
<view class="personalContainer">
  <view class="user-section">
    <image class="bg" src="/static/images/personal/bgImg2.jpg"></image>
    <view class="user-info-box">
      <view class="portrait-box" bindtap="toLogin">
        <image class="portrait" src='../../static/images/mylove.jpg'></image>
      </view>
      <view class="info-box">
        <text class="username">游客</text>
      </view>
    </view>

    <view class="vip-card-box">
      <image class="card-bg" src="/static/images/personal/vip-card-bg.png" mode=""></image>
      <view class="b-btn">
        立即开通
      </view>
      <view class="tit">
        <!-- 会员图标-->
        <text class="iconfont icon-huiyuan-"></text>
        硅谷会员
      </view>
      <text class="e-m">atguigu Union</text>
      <text class="e-b">开通会员听歌, 撸代码</text>
    </view>
  </view>

  <view class="cover-container">
    <image class="arc" src="/static/images/personal/arc.png"></image>
    <!-- 个人中心导航 -->
    <view class="nav-section">
      <view class="nav-item" hover-class="common-hover" hover-stay-time="50">
        <text class="iconfont icon-xiaoxi"></text>
        <text>我的消息</text>
      </view>
      <view class="nav-item" hover-class="common-hover" hover-stay-time="50">
        <text class="iconfont icon-myRecommender"></text>
        <text>我的好友</text>
      </view>
      <view class="nav-item" hover-class="common-hover" hover-stay-time="50">
        <text class="iconfont icon-gerenzhuye"></text>
        <text>个人主页</text>
      </view>
      <view class="nav-item" hover-class="common-hover" hover-stay-time="50">
        <text class="iconfont icon-gexingzhuangban"></text>
        <text>个性装扮</text>
      </view>
    </view>

    <!-- 个人中心列表 -->
    <view class="personalContent">
      <view class="recentPlayContainer">
        <text class="title">最近播放</text>
        <!-- 最近播放记录 -->
        <scroll-view class="recordScroll" enable-flex scroll-x>
          <view class="item">
            <image src="../../static/images/mylove.jpg"></image>
          </view>
          <view class="item">
            <image src="../../static/images/mylove.jpg"></image>
          </view>
          <view class="item">
            <image src="../../static/images/mylove.jpg"></image>
          </view>
          <view class="item">
            <image src="../../static/images/mylove.jpg"></image>
          </view>
        </scroll-view>
        <!-- <view style="font-size:28rpx;padding:0 20rpx">暂无记录</view> -->
      </view>

      <view class="cardList">
        <view class="card-item">
          <text class="title">我的音乐</text>
          <text class="more"> > </text>
        </view>
        <view class="card-item">
          <text class="title">我的收藏</text>
          <text class="more"> > </text>
        </view>
        <view class="card-item">
          <text class="title">我的电台</text>
          <text class="more"> > </text>
        </view>
      </view>
    </view>
  </view>
</view>

<style>
  /* pages/personal/personal.wxss */
.personalContainer {
  width: 100%;
  height: 100%;

}

.personalContainer .user-section {
  height: 520rpx;
  position: relative;
  padding: 100rpx 30rpx 0;
}
.user-section .bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  filter: blur(1px);
}


.user-info-box{
  height: 180rpx;
  display:flex;
  align-items:center;
  position:relative;
  z-index: 1;

}

.user-info-box .portrait{
  width: 130rpx;
  height: 130rpx;
  border:5rpx solid #fff;
  border-radius: 50%;
}
.user-info-box .username{
  font-size: 24;
  color: #303133;
  margin-left: 20rpx;
}


/* vip-box */
.vip-card-box {
  position: relative;
  display: flex;
  flex-direction: column;
  background: linear-gradient(left, red, black);
  background: rgba(0, 0, 0, .7);
  height: 240rpx;
  color: #f7d680;
  border-radius: 16rpx 16rpx 0 0;
  padding: 20rpx 24rpx;
}


.vip-card-box .card-bg{
  position:absolute;
  top: 20rpx;
  right: 0;
  width: 380rpx;
  height: 260rpx;
}

.vip-card-box .b-btn{
  position: absolute;
  right: 20rpx;
  top: 16rpx;
  width: 132rpx;
  height: 40rpx;
  text-align: center;
  line-height: 40rpx;
  font-size: 22rpx;
  color: #36343c;
  border-radius: 20px;
  background: #f9e6af;
  z-index: 1;
}

.vip-card-box .b-btn{
  position: absolute;
  right: 20rpx;
  top: 16rpx;
  width: 132rpx;
  height: 40rpx;
  text-align: center;
  line-height: 40rpx;
  font-size: 22rpx;
  color: #36343c;
  border-radius: 20px;
  /*background: linear-gradient(left, #f9e6af, #ffd465);*/ /*渐变不生效*/
  background: #f9e6af;
  z-index: 1;
}

.vip-card-box .tit {
  font-size: 22rpx;
  color: #f7d680;
  margin-bottom: 28rpx;
}
.vip-card-box .tit .iconfont{
  color: #f6e5a3;
  margin-right: 16rpx;
}




.vip-card-box .e-m{
  font-size: 34rpx;
  margin-top: 10rpx;
}
.vip-card-box .e-b{
  font-size: 24rpx;
  color: #d8cba9;
  margin-top: 10rpx;
}


.cover-container{
  margin-top: -150rpx;
  padding: 0 30rpx;
  position:relative;
  background: #f5f5f5;
  padding-bottom: 20rpx;
}

.cover-container .arc{
  position:absolute;
  left: 0;
  top: -34rpx;
  width: 100%;
  height: 36rpx;
}


/* 导航部分 */
.cover-container .nav-section {
  display: flex;
  background: #fff;
  padding: 20rpx 0;
  border-radius: 15rpx;
}


.nav-section .nav-item {
  width: 25%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-section .nav-item .iconfont {
  font-size: 50rpx;
  color: #d43c33;
  line-height: 70rpx;
}

.nav-section .nav-item text:last-child {
  font-size: 22rpx;

}


/* 个人中心列表 */
.personalContent {
  background: #fff;
  margin-top: 20rpx;
}

/* 最近播放 */
.personalContent .scrollView {
  display: flex;
  height: 160rpx;
}
.personalContent .recentPlay {
  display: flex;
}

.recentPlayContainer .title {
  padding-left: 20rpx;
  font-size: 26rpx;
  color: #333;
  line-height: 80rpx;
}

.personalContent .recentPlay image {
  width: 160rpx;
  height: 160rpx;
  margin-left: 20rpx;
  border-radius: 20rpx;
}


.cardList {
  margin-top: 20rpx;

}
.cardList .card-item{
  border-top: 1rpx solid #eee;
  height: 80rpx;
  line-height: 80rpx;
  padding: 10rpx;
  font-size: 26rpx;
  color: #333;
}
.cardList .card-item .more {
  float: right;
}


.recordScroll{
  display: flex;
  height: 200rpx;
}

.recordScroll .item{
  border-radius: 20rpx;
  width: 200rpx;
  height: 200rpx;
  margin-right: 20rpx;
}

.recordScroll .item image{
  border-radius: 20rpx;
  width: 200rpx;
  height: 200rpx;
}
</style>
```
### 动画逻辑
- 1、使用行内样式去做
- 2、手指三个事件计算，设置位移和过度
- 3、只有往下有位移，往上没有位移
- 4、过度添加上以后永久生效了，每次点击开始需要清除
- 5、点击头像我们会跳转到登录页面
```html
 <view class="cover-container"
  bindtouchstart="handlerStart"
  bindtouchmove="handlerMove"
  bindtouchend="handlerEnd"
  style="transform:translateY({{translateY}});transition:{{transition}}"
 >
<script>
  let startY = 0
  data: {
    translateY:'',
    transition:'',
    userInfo:{},
  },
  // 手指滑动屏幕元素
  handlerStart(event){
    // 手指刚按下的时候，我们要获取手指当前的位置
    // touches是一个数组，代表手指的个数
    //  console.log(event.target.offsetTop)
    //  console.log(event.touches)
   startY = event.touches[0].clientY
   this.setData({
    transition:''
   })
  },
  handlerMove(event){
    // 手指移动的时候，我们需要求出手指移动的位置，进而求出手指移动的距离
    // 手指移动的距离就是盒子要移动的距离
   const newStartY = event.touches[0].clientY
   const moveY = newStartY - startY
    if(moveY>0){
      this.setData({
        translateY: moveY + 'rpx'
      })
    }
  },
  handlerEnd(){
    // 手指抬起，元素要恢复到原来的位置
    this.setData({
      translateY: '0rpx',
      transition:'all 1s'
    })
  },
</script>
```


## 3、登录 获取账号密码
### 登录布局(这个页面不需要我们搭建)
```html
<view class="container">
  <view class="wrapper">
    <view class="left-top-sign">LOGIN</view>
    <view class="welcome">
      欢迎回来！
    </view>
    <view class="input-content">
      <view class="input-item">
        <text class="tit">手机号码</text>
        <input type="text" id="phone" placeholder="请输入手机号码"/>
      </view>
      <view class="input-item">
        <text class="tit">密码</text>
        <input type="password" id="password" placeholder="请输入密码"/>
      </view>
    </view>
    <button class="confirm-btn">登录</button>
    <view class="forget-section">
      忘记密码?
    </view>
  </view>
  <view class="register-section">
    还没有账号?
    <text >马上注册</text>
  </view>
</view>

<style>
/* pages/login/login.wxss */.wrapper{
  position:relative;
  z-index: 90;
  padding-bottom: 40rpx;
}

.left-top-sign{
  font-size: 120rpx;
  color: #f8f8f8;
  position:relative;
  left: -16rpx;
}

.welcome{
  position:relative;
  left: 50rpx;
  top: -90rpx;
  font-size: 46rpx;
  color: #555;
}


.input-content{
  padding: 0 60rpx;
}
.input-item{
  display:flex;
  flex-direction: column;
  align-items:flex-start;
  justify-content: center;
  padding: 0 30rpx;
  background:#f8f6fc;
  height: 120rpx;
  border-radius: 4px;
  margin-bottom: 50rpx;
}

.input-item:last-child{
  margin-bottom: 0;
}
.input-item .tit{
  height: 50rpx;
  line-height: 56rpx;
  font-size: 30rpx;
  color: #606266;
}
.input-item input{
  height: 60rpx;
  font-size: 30rpx;
  color: #303133;
  width: 100%;
}
.confirm-btn{
  width: 630rpx!important;
  height: 76rpx;
  line-height: 76rpx;
  border-radius: 50rpx;
  margin-top: 70rpx;
  background: #d43c33;
  color: #fff;
  font-size: 32rpx;
  padding: 0;
}
.confirm-btn2:after{
  border-radius: 100px;
}

.forget-section{
  font-size: 28rpx;
  color: #4399fc;
  text-align: center;
  margin-top: 40rpx;
}

.register-section{
  position:absolute;
  left: 0;
  bottom: 50rpx;
  width: 100%;
  font-size: 28rpx;
  color: #606266;
  text-align: center;

}
.register-section text{
  color: #4399fc;
  margin-left: 10rpx;
}
</style>
```
### 个人中心页跳转登录页
```html
<view class="user-info-box" bindtap="toLogin">
<script>
toLogin(){
  wx.navigateTo({
    url: '/pages/login/login',
  })
}
</script>
```
### 获取账号密码
- 收集数据   phone和password   需要在input 身上设置id   绑定bindinput事件,通过事件对象获取到input身上的id值
	      拿到id值，可以知道是在收集哪个输入框的数据，根据事件对象的detail.value获取到数据，收集到data
  - 事件对象`event.currentTarget` 用户点击的目标元素
  - 事件对象`event.target` 拿到绑定事件的元素
  - 事件对象`event.detail` 事件所携带的数据，如表单组件的提交事件会携带用户的输入
```html
<input type="text" id="phone" placeholder="请输入手机号码" bindinput="handlerInput" />
<input type="password" id="password" placeholder="请输入密码" bindinput="handlerInput"/>
<script>
data: {
  phone:'',
  password:''
},
// 输入手机和密码，搜集
  handlerInput(event){
    let type = event.currentTarget.id
    const value = event.detail.value
    this.setData({
      [type]:value 
      // phone/password : value
    })
    // []语法：
    // 点语法和[]语法
    // [] 1、取值（拿变量当中或者表达式的值）2、拿到值再次和外部组成新语法
  }
</script>
```

## 4、登录接口对接
- 1、收集数据
  - 需要给组件绑定id属性
	-	通过事件对象.target.id可以获取到绑定的是什么值
	-	通过事件对象的detail.value获取用户输入的数据
- 2、验证
  - 点击登录，请求前要对用户的收集号和密码进行前台校验
- 3、请求
  - 发请求，获取用户信息存储方案存储
  - 需要关闭所有页面然后跳转回到个人中心
- 4、完成页面显示
  - 页面显示是要在个人中心去显示
  - 从存储的位置获取用户信息去显示
### 正则
  - `\d` (digit)数字,正则中专门用来代表数字的,等级于 [0-9]
  - `\w` 数字、字母、下划线
  - `^`  它出现在中括号里代表排除的意思,在中括号的外面标示字符串开始的位子
  - `$`  字符串结束的位子
  - `test()` 是否包含某位字符串,正则对象.test(字符串),返回:布尔值
### 微信自带弹框
  - `wx.showToast` 显示消息提示框
  - `title` 提示的内容
  - `icon` 图标(`success`,`error`,`loading`,`none`)
  - `duration` 提示的延迟时间 默认是1500ms
### 本地存储
  - `wx.setStorageSync(string key, any data)` 支持原生类型、Date、及能够通过JSON.stringify序列化的对象(单个 key 允许存储的最大数据长度为 **1MB**，所有数据存储上限为 **10MB**)
  - `wx.getStorageSync(string key)` 从本地缓存中同步获取指定 key 的内容。
```js
  // 点击登录的逻辑
  async login(){
    const {phone,password} = this.data
      console.log('phone',phone)
      if(!/^1[3-9]\d{9}$/.test(phone)){
        wx.showToast({
          title: '手机号码不合法',
          icon:'error'
        })
        return
      }
    if(!/\w{6,20}$/.test(password)){
      wx.showToast({
        title: '密码不合法',
        icon:'error'
      })
      return
    }
    const r = await request('/login/cellphone',{phone,password})
    console.log('r',r)
    if(r.code === 200){
      wx.setStorageSync('userInfo_key', r.profile)
      wx.reLaunch({
        url: '/pages/center/center',
      })
    }else {
      wx.showToast({
        title: r.message || '账号有问题',
        icon: "error"
      })
    }
  }
```
## 5、登录的数据回显
- 1、登录信息 通过`onLoad` 获取本地存储里面的信息
- 2、在页面中判断 如果有信息 则显示头像和名称
- 3、如果没有信息 则显示默认头像和默认名字
```html
<view wx:if="{{userInfo.nickname}}" class="user-info-box">
    <view class="portrait-box">
    <image class="portrait" src='{{userInfo.avatarUrl}}'></image>
    </view>
    <view class="info-box">
    <text class="username">{{userInfo.nickname}}</text>
    </view>
</view>

<view wx:else class="user-info-box" bindtap="toLogin">
    <view class="portrait-box">
    <image class="portrait" src='../../static/images/mylove.jpg'></image>
    </view>
    <view class="info-box">
    <text class="username">游客</text>
    </view>
</view>
<script>
data: {
    translateY:'',
    transition:'',
    userInfo:{},
    recordList:[]
},
onLoad: function (options) {
    // 小程序里面存储Storage不需要把对象转化为json串
    // vue当中需要转
    let userInfo = wx.getStorageSync('userInfo_key')
    this.setData({
      userInfo
    })   
}
</script>
```

## 6、个人中心登录后的播放记录实现
- 1、判断是否登录，登录了才能继续
- 2、请求获取数据
- 3、数据请求回来需要自己整理需要的数据
- 4、展示数据
- 注意 `scroll-view` 要给一个  **高度**
```html
<scroll-view wx:if="{{userInfo.nickname}}" class="recordScroll" enable-flex scroll-x>
    <view wx:for="{{recordList}}" wx:key='id' class="item">
        <image src="{{item.picUrl}}"></image>
    </view>
</scroll-view>
<view wx:else style="font-size:28rpx;padding:0 20rpx">暂无记录</view>
<script>
// 获取用户的播放记录
async getRecordList(){
    let uid = this.data.userInfo.userId
    const result = await request('/user/record',{uid,type:0})
    if(result.code === 200){
      // console.log(result)
      this.setData({
        recordList:result.allData.slice(0,20).map(item => item.song.al)
      })
    }
},
onLoad: function (options) {
    // 判断用户是不是登录，决定发请求获取用户的播放记录
    if(userInfo.nickname){
      this.getRecordList()
    }
  },
</script>
```
## 7、视频页面头部布局
```html
<!--pages/video/video.wxml-->
<view class="videoContainer">
  <view class="videoContainer_header">
    <image class="videoContainer_header_leftImg" src="../../static/images/video/video.jpg"></image>
    <text class="videoContainer_header_text">搜索音乐</text>
    <image class="videoContainer_header_rightImg" src="../../static/images/logo.png"></image>
  </view>
</view>

<!-- pages/video/video.wxss -->
<style>
.videoContainer{
  height: 100%;
}
.videoContainer_header{
  height: 80rpx;
  padding: 0 10rpx;
  display: flex;
  align-items: center;
}
.videoContainer_header_text{
  height: 60rpx;
  flex: 1;
  border: 1px solid #aaa;
  font-size: 28rpx;
  text-align: center;
  line-height: 60rpx;
  color:red;
  margin: 0 20rpx;
}
.videoContainer_header_leftImg, .videoContainer_header_rightImg{
  width: 60rpx;
  height: 60rpx;
}
</style>
```
## 8、nav的布局
- `scroll-view` 
  - 1、一定要注意给一个高度,否则会出问题
  - 2、只有设置了 enable-flex 才能开始`flex布局`
  - 3、`scroll-x` 和 `scroll-y` 设置滑动方向
```html
<scroll-view
    enable-flex 
    scroll-x
    class="videoContainer_nav"
  >
    <view class="videoContainer_nav_item active">12</view>
    <view class="videoContainer_nav_item">12</view>
    <view class="videoContainer_nav_item">12</view>
    <view class="videoContainer_nav_item">12</view>
</scroll-view>
<style>
    
.videoContainer_nav{
  display: flex;
  width: 750rpx;
  height: 100rpx;
  padding: 0 20px;
  box-sizing: border-box;
}
.videoContainer_nav_item{
  margin-left: 10px;
  height: 50rpx;
  white-space: nowrap;
}
.videoContainer_nav .active{
  border-bottom: 1px solid red;
}
</style>
```

## 9、视频列表布局
-  calc css计算属性 
::: tip 注意
  calc(100vh - 140rpx) `-`两边要留空格
:::

```html
<style>
.videoContainer_videoSroll{
  height: calc(100vh - 140rpx);
}
.videoContainer_videoSroll_srcollItem{
  padding: 0 20rpx;
}
.videoContainer_videoSroll_srcollItem_video{
  width: 100%;
  height: 360rpx;
  border-radius: 30rpx;
}
</style>
  <scroll-view
    enable-flex
    scroll-y
    class="videoContainer_videoSroll"
  >
    <view class="videoContainer_videoSroll_srcollItem">
      <video class="videoContainer_videoSroll_srcollItem_video"></video>
    </view>
    <view class="videoContainer_videoSroll_srcollItem">
      <video class="videoContainer_videoSroll_srcollItem_video"></video>
    </view>
    <view class="videoContainer_videoSroll_srcollItem">
      <video class="videoContainer_videoSroll_srcollItem_video"></video>
    </view>
  </scroll-view>
```

## 10、获取nav的列表数据进行展示及点击nav切换红色边框
- 注意小程序函数传值问题 用`data-id=""`进行传值
- 在 回调事件中 通过`event.currentTarget.dataset`拿到数据

- 1、点击某一个nav，通过事件获取到当前的`data-id`
- 2、在`data`中保存点击的`navId`
- 3、通过 当前选中的 `navId` 和 遍历的 id 匹配,如果一样就给当前的class加上`active` 类名 
```html
<view
  wx:for="{{navList}}"
  wx:key="id"
  class="videoContainer_nav_item  {{item.id === navId ? 'active' : ''}}"
  bindtap="onChangeNav"
  data-id="{{item.id}}"
>
    {{item.name}}
</view>

<script>
import request from '../../utils/request.js'

data: {
    navList:[],
    navId:'',
}
onChangeNav (event){
    this.setData({
      navId: event.currentTarget.dataset.id
    })
}
async getNavList(){
    const result = await request('/video/group/list')
    if(result.code === 200){
      console.log(result.data)
      this.setData({
        navList: result.data.slice(0,15),
        navId: result.data[0].id
      })
    }
}
onLoad(options) {
    this.getNavList()
}
</script>
```

## 11、设置nav点击滚动到点击的这个子项
- [`scroll-view`](https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html) 有两个属性配置
  - `scroll-into-view` 滑动到对应的子元素， 值应为某子元素id（id不能以数字开头）
  - `scroll-with-animation` 在设置滚动条位置时使用动画过渡
```html
<scroll-view
    enable-flex 
    scroll-x
    class="videoContainer_nav"
    scroll-into-view="{{'scroll' + navId}}"
    scroll-with-animation
  >
  <view wx:for="{{navList}}"
          wx:key="id"
          class="videoContainer_nav_item  {{item.id === navId ? 'active' : ''}}"
          bindtap="onChangeNav"
          data-id="{{item.id}}"
          id="{{'scroll' + item.id}}"
    >
      {{item.name}}
    </view>
</scroll-view>
```
## 12、处理cookies
- 1、在登录的时候增加一个标识`isLogin`,登录成功后保存服务返回的`cookie`
- 2、在请求数据的时候 将`cookie`放在请求头传递出去
- 3、修改 封装的`request`

- 请求头 `cookies` 结构
```js
`cookie: MUSIC_A_T=1470210895049; Max-Age=2147483647; Expires=Tue 03 Oct 2090 12:55:53 GMT; Path=/wapi/clientlog;`
```

```js
// 在登录的时候 专递一个标识
const r = await request('/login/cellphone',{phone,password,isLogin:true})

// 在登录的时候 获取标识
export default function request(url, data, method='GET'){
  return new Promise((resolve,rejct)=>{
    wx.request({
      url: 'http://localhost:3000' + url,
      method,
      data,
      header:{
        // 让所有的请求携带cookie
        cookie:wx.getStorageSync('cookie_key')&&wx.getStorageSync('cookie_key').join(';')
      },
      success:(res)=>{
        if(data && data.isLogin){
          wx.setStorageSync('cookie_key',res.cookies)
        }
        resolve(res.data)
      },
      fail:(res)=>{
        rejct(res)
      }
    })
  })
}
```
## 13、设置好cookie后请求获取视频列表数据展示（两个地方要请求获取）
- 1、在首次渲染的时候 加载数据
- 2、在点击切换nav的时候 更新数据

- 注意`/video/group` 数据之前 需要传递用户`cookie`,才能拿到到数据
::: tip 重点
  获取视频数据之前 得先拿到`nav` 列表数据所对应的`id`去请求, 这里有个先后顺序
:::
```html
<view
    class="videoContainer_videoSroll_srcollItem"
    wx:for="{{videoList}}"
    wx:key="vid"
>
    <video
    class="videoContainer_videoSroll_srcollItem_video"
    src="{{item.urlInfo.url}}"
    >
    </video>
</view>
<script>
data: {
    videoList:[],
}
async onLoad(options) {
    // 先获取nav列表数据
    await this.getNavlist()
    // 在通过id 获取视频列表数据
    await this.getVideoList();
}
// 获取导航列表
async getNavlist(){
  const r = await request('/video/group/list')
  if(r.code === 200){
    console.log('r.data[0]', r.data[0])
    this.setData({
      navList: r.data.slice(0,10),
      currentId: r.data[0].id
    })
  }
  console.log(r)
}
// 获取视频列表
async getVideoList(){
  const rs = await request('/video/group',{id:this.data.navId})
  if(rs.code === 200){
    const videoList = rs.datas.map(item => item.data)
    this.setData({
      videoList
    })
  }
}
// 切换nav 的时候 要更新数据
changeNav(e){
  const id = e.currentTarget.dataset.id
  this.setData({
    currentId:id
  })
  this.getVideoList();
}
</script>
```