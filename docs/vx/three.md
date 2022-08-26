# 硅谷云音乐
[[toc]]

## 1、tabbar
- 新建video和center的page页面

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
## 2、个人中心
- event.touches 代表的触发的手指
```html
 <view class="cover-container"
  bindtouchstart="handlerStart"
  bindtouchmove="handlerMove"
  bindtouchend="handlerEnd"
  style="transform:translateY({{translateY}});transition:{{transition}}"
 >

<script>
  data: {
    translateY:'',
    transition:'',
    userInfo:{},
    recentList:[]
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


## 3、登录 账号密码收集
-event.currentTarget 用户点击的目标元素
-event.target 拿到绑定事件的元素
```html
<input type="text" id="phone" placeholder="请输入手机号码" bindinput="handlerInput" />
<input type="password" id="password" placeholder="请输入密码" bindinput="handlerInput"/>
<script>
// 输入手机和密码，收集
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
```js
  // 点击登录的逻辑
  async login(){
    let {phone,password} = this.data
    if(!/^1[3-9]\d{9}$/.test(phone)){
      // 弹出消息
      wx.showToast({
        title: '手机号不合法',
        icon:'error'
      })
      return 
    }

    if(!/^\w{6,20}$/.test(password)){
      wx.showToast({
        title: '密码不合法',
      })
      return 
    }

    // 发请求
    const result = await request('/login/cellphone',{phone,password,isLogin:true})
    if(result.code === 200){
      console.log(result)
      //保存用户信息在storage
      wx.setStorageSync('userInfo_key', result.profile)
      // 返回到个人中心页面进行展示
      // wx.navigateTo({
      //   url: '/pages/center/center',
      // })
    wx.reLaunch({
        url: '/pages/center/center',
      })
    }else if(result.code === 400){
      wx.showToast({
        title: '用户名错误',
      })
    }else if(result.code === 502){
      wx.showToast({
        title: '密码错误',
      })
    }else if(result.code === 501){
      wx.showToast({
        title: '账号不存在',
      })
    }else{
      wx.showToast({
        title: '未知错误',
      })
    }
  }
```
## 5、登录的数据回显
```html
<view wx:if="{{userInfo.nickname}}" class="user-info-box">
    <view class="portrait-box">
    <image class="portrait" src='{{userInfo.avatarUrl}}'></image>
    </view>
    <view class="info-box">
    <text class="username">{{userInfo.nickname}}</text>
    </view>
</view>

<view wx:else class="user-info-box">
    <view class="portrait-box" bindtap="toLogin">
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
    recentList:[]
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
```html
<scroll-view wx:if="{{userInfo.nickname}}" class="recordScroll" enable-flex scroll-x>
    <view wx:for="{{recentList}}" wx:key='id' class="item">
        <image src="{{item.picUrl}}"></image>
    </view>
</scroll-view>
<view wx:else style="font-size:28rpx;padding:0 20rpx">暂无记录</view>
<script>
// 获取用户的播放记录
async getRecentList(){
    let uid = this.data.userInfo.userId
    const result = await request('/user/record',{uid,type:0})
    if(result.code === 200){
      // console.log(result)
      this.setData({
        recentList:result.allData.slice(0,20).map(item => item.song.al)
      })
    }
},
onLoad: function (options) {
    // 判断用户是不是登录，决定发请求获取用户的播放记录
    if(userInfo.nickname){
      this.getRecentList()
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
## 8、视频nav的布局
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

## 9、视频nav的布局
-  calc css计算属性
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
- 注意小程序函数传值问题
```html
<view wx:for="{{navList}}" wx:key="id" class="videoContainer_nav_item  {{item.id === navId ? 'active' : ''}}"
    bindtap="onChangeNav"
    data-id="{{item.id}}"
>
    {{item.name}}
</view>

<script>
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

## 11、设置nav点击滚动到点击的这个项
- `scroll-view`  `scroll-into-view scroll-with-animation`
```html
<scroll-view
    enable-flex 
    scroll-x
    class="videoContainer_nav"
    scroll-into-view="{{'scroll' + navId}}"
    scroll-with-animation
  >
</scroll-view>
```
## 12、处理cookies
```js
export default function request(url, data, method='GET'){
  return new Promise((resolve,rejct)=>{
    wx.request({
      url: 'http://localhost:3000' + url,
      method,
      data,
      header:{
        // 让所有的请求携带cookie
        cookie:wx.getStorageSync('cookie_key')&&wx.getStorageSync('cookie_key').find(item => item.startsWith('MUSIC'))
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
- `/video/group` 数据之前 需要传递用户cookie
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
async getVideoList(){
    const rs = await request('/video/group',{id:this.data.navId})
    if(rs.code === 200){
      const videoList = rs.datas.map(item => item.data)
      this.setData({
        videoList
      })
    }
  }
</script>
```