# 谷粒云音乐

[[toc]]

## 一、项目介绍
## 1、项目发开流程
 - 1、项目展示(产品)
 - 2、需求整理
 - 3、技术设计
 - 4、开发&&调试
 - 5、测试
 - 6、上线

## 2、项目初始化&&配置
- 1、新建项目重新创建所有的文件
- 2、新建项目配置文件配置顶部 app相关
- 3、导入资源包
- 4、删除默认的`app.wxss`样式
```js
"pages":[
    "pages/index/index"
  ],
"window":{
    "navigationBarBackgroundColor": "#ea2a1d",
    "navigationBarTitleText": "谷粒云音乐",
    "navigationBarTextStyle":"white"
  }
```

## 3、轮播图搭建
- [swiper](https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html)

```html
<!--index.wxml-->
<view class="container">
  <swiper class="bannerSwiper" 	indicator-dots 	indicator-active-color='red'>
    <swiper-item class="swiperItem">
      <image src="../../static/images/mylove.jpg"></image>
    </swiper-item>
    <swiper-item  class="swiperItem">
      <image src="../../static/images/mylove.jpg"></image>
    </swiper-item>
    <swiper-item  class="swiperItem">
      <image src="../../static/images/mylove.jpg"></image>
    </swiper-item>
  </swiper>
</view>

```
```css
page{
  width: 100%;
}
.bannerSwiper{
  width: 100%;
  height: 300rpx;
}
.swiperItem{
  height: 300rpx;
}
.swiperItem image{
  width: 100%;
  height: 300rpx;
}
```

## 4、导航区域搭建
- app.wxss 引入字体`@import './static/iconfont/iconfont.wxss'`
```html
  <view class="navList">
    <view class="navItem">
      <text class="iconfont icon-meirituijian"> </text>
      <text class="name">每日推荐</text>
    </view>

    <view class="navItem">
      <text class="iconfont icon-gedan1"> </text>
      <text class="name">歌单</text>
    </view>

    <view class="navItem">
      <text class="iconfont icon-paihangbang"> </text>
      <text class="name">排行榜</text>
    </view>

    <view class="navItem">
      <text class="iconfont icon-diantai"> </text>
      <text class="name">电台</text>
    </view>

    <view class="navItem">
      <text class="iconfont icon-zhiboguankanliangbofangsheyingshexiangjixianxing"> </text>
      <text class="name">直播</text>
    </view>
  </view>
```
```css
.navList{
  display: flex;
  margin-top: 20rpx;
  justify-content: space-around;
}
.navItem{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.navItem .iconfont{
  width: 100rpx;
  height: 100rpx;
  background: red;
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 100rpx;
  font-size: 50rpx;
}
.name{
  margin-top: 20rpx;
  font-size: 28rpx;
}
```
## 5、推荐歌曲区域搭建
- [scroll-view](https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html)
- 需要给scroll-view一个固定高度
- 单行文本不换行
```css
	display: block;
	white-space: nowrap;    /*规定文本不换行**/
	overflow: hidden;
    text-overflow: ellipsis;  /**显示省略符号来代表被修剪的文本。*/
```    
- 多行文本不换行
```css
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;   /** 多行文本溢出...*/
	overflow: hidden; 
```

```html
<view class='recommend'>
	<view class="header">
	<view class="title">推荐歌曲</view>
	<text class="textLeft">为你精心推荐</text>
	<text class="textRight">查看更多</text>
	</view>
	<scroll-view class="recommendScroll" enable-flex	scroll-x>
	<view class="scrollItem">
		<image class="scrollImg" src='../../static/images/mylove.jpg'></image>
		<text class='scrollText'>xxxxxxxxxxxxxxxxxxxxxxxx</text>
	</view>
	<view class="scrollItem">
		<image class="scrollImg" src='../../static/images/mylove.jpg'></image>
		<text class='scrollText'>xxxxxxxxxxxxxxxxxxxxxxxx</text>
	</view>
	<view class="scrollItem">
		<image class="scrollImg" src='../../static/images/mylove.jpg'></image>
		<text class='scrollText'>xxxxxxxxxxxxxxxxxxxxxxxx</text>
	</view>
	<view class="scrollItem">
		<image class="scrollImg" src='../../static/images/mylove.jpg'></image>
		<text class='scrollText'>xxxxxxxxxxxxxxxxxxxxxxxx</text>
	</view>
	</scroll-view>
</view>
```
```css
.recommend{
  padding: 20rpx;
}
.recommend .header .title{
  line-height: 70rpx;
  color: #aaa;
}
.recommend .textRight{
  float: right;
  font-size: 28rpx;
  border: 1px solid #aaa;
  text-align: center;
  line-height: 60rpx;
  height: 60rpx;
  width: 150rpx;
  border-radius: 30rpx;
}

.recommendScroll{
  height: 300rpx;
  display: flex;
}
.scrollItem{
  width: 200rpx;
  margin-right: 20rpx;
}
.scrollItem .scrollImg{
  width: 200rpx;
  height: 200rpx;
  border-radius: 20rpx;
}
.scrollText{
  display: block;
	white-space: nowrap;    /*规定文本不换行**/
	overflow: hidden;
  text-overflow: ellipsis;
  font-size: 28rpx;
}
```


## 6、排行榜静态搭建
```html
<!-- 排行榜 -->
<view class='rank'>
	<view class="header">
	<view class="title">排行榜</view>
	<text class="textLeft">热歌风向标</text>
	<text class="textRight">查看更多</text>
	</view>
	<swiper class="rankSwiper" previous-margin="50rpx" next-margin="50rpx">
	<swiper-item  class="swiperItem">
		<view class="content">
		<view class="title">新歌榜</view>
		<view class="main">
			<image class="mainImg" src="../../static/images/mylove.jpg"></image>
			<text class="mainCount">1</text>
			<text class="mainName">xxxxxx</text>
		</view>
		<view class="main">
			<image class="mainImg" src="../../static/images/mylove.jpg"></image>
			<text class="mainCount">1</text>
			<text class="mainName">xxxxxx</text>
		</view>
		<view class="main">
			<image class="mainImg" src="../../static/images/mylove.jpg"></image>
			<text class="mainCount">1</text>
			<text class="mainName">xxxxxx</text>
		</view>
		</view>
	</swiper-item>
	<swiper-item  class="swiperItem">
		<view class="content">
		<view class="title">新歌榜</view>
		<view class="main">
			<image class="mainImg" src="../../static/images/mylove.jpg"></image>
			<text class="mainCount">1</text>
			<text class="mainName">xxxxxx</text>
		</view>
		<view class="main">
			<image class="mainImg" src="../../static/images/mylove.jpg"></image>
			<text class="mainCount">1</text>
			<text class="mainName">xxxxxx</text>
		</view>
		<view class="main">
			<image class="mainImg" src="../../static/images/mylove.jpg"></image>
			<text class="mainCount">1</text>
			<text class="mainName">xxxxxx</text>
		</view>
		</view>
	</swiper-item>
	</swiper>
</view>
```
```css
.rank{
  padding: 20rpx;
}
.rank .header .title{
  line-height: 70rpx;
  color: #aaa;
}
.rank .textRight{
  float: right;
  font-size: 28rpx;
  border: 1px solid #aaa;
  text-align: center;
  line-height: 60rpx;
  height: 60rpx;
  width: 150rpx;
  border-radius: 30rpx;
}
.rank .rankSwiper{
  height: 400rpx;
}
.rank .rankSwiper .content{
  background-color: #eee;
  width: 90%;
  height: 400rpx;
  padding:  0 20rpx;
}
.rank .rankSwiper .content .title{
  font-size: 28rpx;
  line-height:  60rpx;
}
.rank .rankSwiper .content .main{
    display: flex;
    align-items: center;
    margin-bottom: 10rpx;
}

.rank .rankSwiper .content .main .mainImg{
  width: 100rpx;
  height: 100rpx;
}

.rank .rankSwiper .content .main .mainCount{
  margin: 0 40rpx;
}
```
## 7、自定义组件
- 类似vue  
- 创建组件
- 组件结构里面使用的是动态数据
- 组件js里面可以接收传递的动态数据
- 使用组件的地方可以通过属性传值
- 在当前创建一个 components 文件 里面存放组件
- 同时需要在index.json文件 进入
```json
"usingComponents": {
  "HeaderNav":"/components/HeaderNav/HeaderNav"
}
```
```html
<HeaderNav title='排行榜' text='热歌风向标' />
<HeaderNav title='推荐歌曲' text='为你精心推荐' />


<view class="header">
  <view class="title">{{title}}</view>
  <text class="textLeft">{{text}}</text>
  <text class="textRight">查看更多</text>
</view>

<script>
	/**
   * 组件的属性列表
   */
  properties: {
    title:{
      type: String,
      default: ''
    },
    text:{
      type: String,
      default: ''
    }
  },
</script>


<style>
.header .title{
  line-height: 70rpx;
  color: #aaa;
}
.textRight{
  float: right;
  font-size: 28rpx;
  border: 1px solid #aaa;
  text-align: center;
  line-height: 60rpx;
  height: 60rpx;
  width: 150rpx;
  border-radius: 30rpx;
}
</style>
```
       
## 8、封装发请求的功能函数（使用promise需要设置）
- [wx.request](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html)
- 轮播图接口  `/banner?type=2`
```js
import request from '../../utils/request'
async getBannerList(){
  const rs = await  request('/banner',{type:2})
  console.log('rs',rs)
},
/**
 * 生命周期函数--监听页面加载
 */
onLoad(options) {
  this.getBannerList();
},
----------------------------------------------
export default function request(url, data, method='GET'){
  return new Promise((resolve,rejct)=>{
    wx.request({
      url: 'http://localhost:3000' + url,
      method,
      data,
      success:(res)=>{
        resolve(res.data)
      },
      fail:(res)=>{
        rejct(res)
      }
    })
  })
}
```

## 9、首页所有动态数据显示
- 轮播图
- `banner?/type=10`
```html
<swiper-item
      class="swiperItem"
      wx:for="{{bannerList}}"
      wx:for-item='banner'
      wx:key="tagerId"
>
  <image src="{{banner.pic}}"></image>
</swiper-item>
<script>
async getBannerList(){
    const rs = await  request('/banner',{type:2})
      if(rs.code === 200){
        console.log(rs.banners)
      this.setData({
        bannerList: rs.banners
      })
    }
  }
</script>
```
- `personalized?/limit=10`
```html
<view class="scrollItem"
    wx:for="{{recomendList}}"
    wx:key="id"
  >
  <image class="scrollImg" src='{{item.picUrl}}'></image>
  <text class='scrollText'>{{item.name}}</text>
</view>
<script>
  async getRecomendList(){
    const rs = await request('/personalized',{limit:10})
    if(rs.code === 200){
      this.setData({
        recomendList:rs.result
      })
    }
  },
</script>
```

- `/top/list?/dx=1`
```js
<swiper-item
  class="swiperItem"
  wx:for="{{rankList}}"
  wx:for-item="rank"
  wx:for-index="index1"
  wx:key="id"
>
  <view class="content">
    <view class="title">{{rank.name}}</view>
    <view class="main"
      wx:for="{{rank.songs}}"
      wx:for-item="song"
      wx:for-index="index2"
      wx:key="id"
      >
      <image class="mainImg" src="{{song.al.picUrl}}"></image>
      <text class="mainCount">{{index2+1}}</text>
      <text class="mainName">{{song.name}}</text>
    </view>
  </view>
</swiper-item>


<script>
  async getRankList(){
    let idx = 0;
    let rankList = [];
    while(idx<5){
      const rs = await request('/top/list',{idx:idx++})
      let obj = {
        id: rs.playlist.id,
        name: rs.playlist.name,
        songs: rs.playlist.tracks.slice(0,3)
      }
      rankList.push(obj)
      this.setData({
        rankList
      })
    }
  }
</script>
```
