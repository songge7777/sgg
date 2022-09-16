# 谷粒云音乐
[[toc]]

## 1、列表视频 多个视频同时播放的问题,要求只能同时只有一个视频播放
- 1、[`wx.createVideoContext(id)`](https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.createVideoContext.html) 
  - VideoContext 实例，可通过 wx.createVideoContext 获取
  - VideoContext 通过 id 跟一个 video 组件绑定，操作对应的 video 组件
  - `VideoContext.pause()` 暂停
  - `VideoContext.play()` 播放

### 播放流程
- 判断this身上是否存在上下文对象, 如果不存在 就代表第一次播放
  -  创建上下文对象
  -  播放开始
  -  this保存在当前播放的视频id
- 如果存在 就判断当前不放的id和新点击的id是否一样
  -  如果不一样 就需要暂停以前的视频，重新创建新的上下文 播放新的视频，同时要更换视频id
  -  如果一样 那啥也不干
```html
<view>
<video
    class="videoContainer_videoSroll_srcollItem_video"
    src="{{item.urlInfo.url}}"
    bindtap="videoClick"
    poster="{{item.coverUrl}}"
    id="{{item.vid}}"
    >
  </video>
</view>
<script>
data: {
    currentVideo:'',
    vid:'',
},
  videoClick(event){
    const vid = event.currentTarget.id
    // 之前不存在 video 实例
    if(!this.player){
      // 如何保证只有一个视频在播放
      // 首先保证只有一个执行上下文对象(创建的视频实例),存到我们的this上
      this.player = wx.createVideoContext(vid)
      this.player.play()
      this.setData({
        vid,
      })
    }else{
      // 判断点的是不是同一个视频
      if(vid !== this.data.vid){
        this.player.pause();
        this.player = wx.createVideoContext(vid)
        this.player.play()
        this.setData({
          vid,
        })
      } else {
        // 啥也不干
      }
    }
  },
</script>
```
## 2、图片做优化
- `video` 有一个属性 `poster` 可以设置封面
- 图片和视频切换  保证了当前只能有一个视频展示, 通过当前点击和当前遍历id 是否是同一个
```html
 <view
  class="videoContainer_videoSroll_srcollItem"
  wx:for="{{videoList}}"
  wx:key="vid"
  >
  <video
    class="videoContainer_videoSroll_srcollItem_video"
    src="{{item.urlInfo.url}}"
    bindtap="videoClick"
    poster="{{item.coverUrl}}"
    id="{{item.vid}}"
    wx:if="{{item.vid === vid}}"
    >
    </video>
    <image
      wx:else
      class="videoContainer_videoSroll_srcollItem_videoImg"
      src="{{item.coverUrl}}"
      bindtap="videoClick"
      id="{{item.vid}}"
      ></image>
</view>

<<style>
.videoContainer_videoSroll_srcollItem_videoImg{
  width: 100%;
  height: 360rpx;
  border-radius: 30rpx;
}
</style>
```

## 3、内网演示
- 优化地址配置
```js
export default {
  host: 'http://localhost:3000',
  mobileHost: 'https://l5827480i3.zicp.fun',
}
wx.request({
    url: config.mobileHost + url,
    method,
    data,
    ...........
}
```

## 4、保存当前播放时间， 切换回来的时候 变成继续播放
- `video` 组件回调事件 `bindtimeupdate`：播放进度变化时触发，event.detail = {currentTime, duration} 。触发频率 250ms 一次
- `VideoContext.seek` 跳转到指定位置
- 1、通过`bindtimeupdate`事件获取 当前video id和他播放的时间节点 保存起来
- 2、在每次播放的时候  去历史记录查找，当前video id和历史的id 是否有匹配的,如果有就获取的他播放时间节点,通过`VideoContext.seek`跳转过去
- 3、在接着走之前播放逻辑
```js
data(){
  playRecordList:[],
},

handleTimeUpdate(e){
    const vid = e.currentTarget.id;
    const playRecordList = this.data.playRecordList
    const obj = playRecordList.find(i => i.id === vid);
    if(obj){
      // 存在
      obj.currentTime = e.detail.currentTime
    } else {
      playRecordList.push({
        id: vid,
        currentTime:e.detail.currentTime
      })
      this.setData({
        playRecordList
      })
    }
  },
// 添加历史 播放记录
seekHistoryRecord(){
  const obj = this.data.playRecordList.find(i => i.id === this.data.vId)
  if(obj){
    this.vedioThis.seek(obj.currentTime)
  }
}

// 在 play 之前添加跳转进度
this.seekHistoryRecord();
this.vedioThis.play()
```

## 5、播放完成删除历史记录
- `video` 组件回调事件 `bindended`：当播放到末尾时触发 ended 事件
```js
<video
  bindended="handlerEnd"
>
<script>
handlerEnd(event){
  let vid = event.currentTarget.id
  let playRecordList = this.data.playRecordList
  let newPlayRecordList = playRecordList.filter(item => item.vid !== vid)
  this.setData({
    playRecordList:newPlayRecordList
  })
}
</script>
```

## 6、上拉触底 下拉刷新
- `scroll-view` 组件
  -  下拉刷新: `refresher-enabled` 为 `true` 
  -  下拉刷新标识 `refresher-triggered` 为`false`(三个点 给取消掉)
  -  下拉刷新的回调事件`bindrefresherrefresh` 可以用来更新数据
  -  上拉触底后，需要添加新的视列表数据，目前没有api，模拟手动添加数据，绑定`bindscrolltolower`

```html
<scroll-view
    enable-flex
    scroll-y
    class="videoContainer_videoSroll"
    refresher-enabled
    bindrefresherrefresh='handlerRefresh'
    refresher-triggered="{{refresherFlag}}"
    bindscrolltolower="handlerToLower"
  >
</scroll-view>
<script>
data: {
  refresherFlag: false
},
// 触发下拉刷新的时候,需要重新请求当前的视频数据
handlerRefresh(){
  this.setData({
    refresherFlag: true,
  })
  this.getVideoList()
},
// 上拉触底后,再次加载新的数据
handlerToLower(){
  let videoList = this.data.videoList
  videoList.push(...videoList)
  if(videoList.length<30){
    this.setData({
      videoList
    })
  }
}
async getVideoList(){
  const rs = await request('/video/group',{id:this.data.currentId})
      if(rs.code === 200){
      const videoList = rs.datas.map(item => item.data)
    setTimeout(()=>{
      this.setData({
        refresherFlag: false,
        videoList
      })
    },2000)
  }
},
</script>
```

## 7、自定义原生分享和自定义分析
- 自定义按钮转发 `button`身上 `open-type = 'share'`
- 自带菜单转发
- 无论是按钮转发还是菜单转发 最终都会触发`onShareAppMessage`
```html
<style>
  
.content {
  font-size: 26rpx;
  height:80rpx;
  line-height: 80rpx;
  max-width: 500rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* footer */
.footer {
  border-top: 1rpx solid #eee;
  padding: 20rpx 0;
}
.footer .avatar {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  vertical-align: middle;
}
.footer  .nickName {
  font-size: 26rpx;
  vertical-align: middle;
  margin-left: 20rpx;
}
.footer .comments_praised {
  float: right;
}

.comments_praised .btn {
  display: inline;
  padding: 0;
  background-color: transparent;
  border-color: transparent;
}
.comments_praised .btn:after {
  border: none;
}
.comments_praised .item {
  margin-left: 50rpx;
  position: relative;
}
.comments_praised .item .count {
  position: absolute;
  top: -20rpx;
  font-size: 20rpx;
}
</style>
<view class="content">{{item.title}}</view>
  <view class="footer">
    <image class="avatar" src="{{item.creator.avatarUrl}}"></image>
    <text class="nickName">{{item.creator.nickname}}</text>
    <view class="comments_praised">
      <text class="item">
        <text class="iconfont icon-buoumaotubiao15"></text>
        <text class="count">{{item.praisedCount}}</text>
      </text>
      <text class="item">
        <text class="iconfont icon-pinglun1"></text>
        <text class="count">{{item.commentCount}}</text>
      </text>
      <button open-type="share" class="item btn">
        <text class="iconfont icon-gengduo"></text>
      </button>
    </view>
  </view>

<script>
/**
 * 用户点击右上角分享
 */
onShareAppMessage({from}) {
  console.log(from)
  // 系统的转发必须要写这个事件
  // 自己的按钮转发 自定义的时候需要写这个事件
  if(from === 'button'){
    return {
      title:'自己按钮转发',
      imageUrl:'../../static/images/mylove.jpg',
      path:'/pages/video/video'
    }
  }
}
</script>
```
### 1、禁止分享
- 1、`wx.hideShareMenu`
- 2、删除`onShareAppMessage`
```js
 onLoad(options) {
    this.getNavList()
    wx.hideShareMenu({
      menus:['shareAppMessage']
    })
  },
```
## 8、今日推荐页面布局
- 
```html
<style>
/* pages/recommend/recommend.wxss */
.recommendContainer{

}
.recommendContainer .header{
  height: 300rpx;
  position: relative;
}
.recommendContainer .header .headerImg{
  width: 100%;
  height: 300rpx;
}
.recommendContainer .header .headerText{
  width: 200rpx;
  height: 100rpx;
  /* border: 1px solid red; */
  position: absolute;
  /* left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto; */
  /* left: 50%;
  top: 50%;
  margin-top: -50rpx;
  margin-left: -100rpx; */

  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  line-height: 100rpx;
  font-size: 40rpx;
  color: #fff;
}
.recommendContainer .main{
  position: relative;
  z-index: 1;
  padding: 20rpx;
  margin-top: -20rpx;
  border-radius: 30rpx;
  background-color:#fff;
}
.recommendContainer .main .header{
  height: 42rpx;
}
.recommendContainer .main .header .headerRight{
  float: right;
}
.recommendContainer .main .songScroll{
  height: calc(100vh - 342rpx);
}
.recommendContainer .main .songScroll .item{
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}
.recommendContainer .main .songScroll .item .itemImg{
  width: 80rpx;
  height: 80rpx;
  border-radius: 10prx;
}
.recommendContainer .main .songScroll .item .author{
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 20rpx;
}
</style>
<!--pages/recommend/recommend.wxml-->
<view class="recommendContainer">
  <view class="header">
    <image
      class="headerImg"
      src="../../static/images/recommendSong/recommendSong.jpg"></image>
    <text class="headerText">22/6</text>
  </view>
  <view class="main">
    <view class="header">
      <text class="headerLeft">播放全部</text>
      <text class="headerRight">全选</text>
    </view>
    <scroll-view class="songScroll" enable-flex scroll-y>
      <view class="item">
        <image class="itemImg" src="../../static/images/mylove.jpg"></image>
        <view class="author">
          <text class="songName">最美的期待</text>
          <text class="authorName">周笔畅</text>
        </view>
        <view class="iconfont icon-gengduo"></view>
      </view>
      <view class="item">
        <image class="itemImg" src="../../static/images/mylove.jpg"></image>
        <view class="author">
          <text class="songName">最美的期待</text>
          <text class="authorName">周笔畅</text>
        </view>
        <view class="iconfont icon-gengduo"></view>
      </view>
      <view class="item">
        <image class="itemImg" src="../../static/images/mylove.jpg"></image>
        <view class="author">
          <text class="songName">最美的期待</text>
          <text class="authorName">周笔畅</text>
        </view>
        <view class="iconfont icon-gengduo"></view>
      </view>
    </scroll-view>
  </view>
</view>
```
## 9、日期动态数据
- `/recommend/songs`
```html
<scroll-view class="songScroll" enable-flex scroll-y>
  <view class="item" wx:for="{{recommendList}}" wx:key="id">
    <image class="itemImg" src="{{item.album.picUrl}}"></image>
    <view class="author">
      <text class="songName">{{item.name}}</text>
      <text class="authorName">{{item.artists[0].name}}</text>
    </view>
    <view class="iconfont icon-gengduo"></view>
  </view>
</scroll-view>
<script>
import request from '../../utils/request'
// pages/recommend/recommend.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    day:'',
    month:'',
    recommendList: [],
  },
  async getReconmendList(){
    const result = await request('/recommend/songs')
    if(result.code === 200){
      console.log(result)
      this.setData({
        recommendList:result.recommend
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    this.setData({
      day,
      month
    })
    this.getReconmendList();
  }
})
</script>
```
## 10、播放歌曲

```html
<style>
  page{
  height: 100%;
}
.detailContainer{
  height: 100%;
  width: 100%;
  background-color: #8C8C8C;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.detailContainer .songName{
  color: #fff;
}
.detailContainer .songBar{
  width: 300rpx;
  height: 300rpx;
  /* border: 1px solid red; */
  position: relative;
  z-index: 1;
}
.detailContainer .songBar .needle{
  width: 220rpx;
  height: 240rpx;
  position: absolute;
  top: 54rpx;
  left: 116rpx;
  transform-origin:  32rpx 0rpx;
  transform: rotate(-30deg);
}

.detailContainer .songBar .circle{
  width: 60rpx;
  height: 60rpx;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 20rpx;
  left: 130rpx;
}

.detailContainer .songDisc{
  margin-top: -160rpx;
  width: 600rpx;
  height: 600rpx;
  position: relative;
}
.detailContainer .songDisc .disc{
  width: 600rpx;
  height: 600rpx;
}
.detailContainer .songDisc .songImg{
  width: 400rpx;
  height: 400rpx;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  border-radius: 50%;
}


/* 底部控制区域 */
.musicControl {
  position: absolute;
  bottom: 40rpx;
  left: 0;
  border-top: 1rpx solid #fff;
  width: 100%;
  display: flex;

}

.musicControl  text {
  width: 20%;
  height: 120rpx;
  line-height: 120rpx;
  text-align: center;
  color: #fff;
  font-size: 50rpx;
}

.musicControl  text.big{
  font-size: 80rpx;
}
</style>
<!--pages/detail/detail.wxml-->
<view class="detailContainer">
  <view class="songName">最美的期待</view>
  <view class="songBar">
    <image class="needle" src="../../static/images/song/needle.png"></image>
    <view class="circle"></view>
  </view>
  <view class="songDisc">
    <image class="disc" src="../../static/images/song/disc.png"></image>
    <image class="songImg" src='../../static/images/mylove.jpg'></image>
  </view>

  <!-- 底部控制播放区域 -->
  <view class="musicControl">
    <text class="iconfont icon-iconsMusicyemianbofangmoshiShuffle"></text>

    <text class="iconfont icon-shangyishou" id="prev" bindtap="handleSwitch"></text>

    <text class="iconfont {{isPlay?'icon-zanting': 'icon-bofang'}} big" bindtap="handleMusicPlay"></text>

    <text class="iconfont icon-next" id="next" bindtap="handleSwitch"></text>

    <text class="iconfont icon-iconsMusicyemianbofangmoshiPlayList"></text>
  </view>
</view>
```
## 11、点击播放和暂停按钮，实现布局的动画
```html
<view class="songBar">
  <image class="needle {{isPlay&&'active'}}" src="../../static/images/song/needle.png"></image>
  <view class="circle"></view>
</view>
<view class="songDisc {{isPlay&&'songDiscActive'}}">
  <image class="disc" src="../../static/images/song/disc.png"></image>
  <image class="songImg" src='../../static/images/mylove.jpg'></image>
</view>
<text class="iconfont {{isPlay?'icon-zanting': 'icon-bofang'}} big" bindtap="handleMusicPlay"></text>

<script>
data: {
  msg:'',
  isPlay: false,
}

// 点击播放或者暂停按钮，切换播放状态
handleMusicPlay(){
  let isPlay = this.data.isPlay;
  this.setData({
    isPlay: !isPlay
  })
}
</script>


<style>
  
.detailContainer .songBar .needle{
  width: 220rpx;
  height: 240rpx;
  position: absolute;
  top: 54rpx;
  left: 116rpx;
  transform-origin:  32rpx 0rpx;
  transform: rotate(-30deg);
  transition: all 1s;
}
.detailContainer .songBar .active{
  transform: rotate(0);
}

.detailContainer .songDisc{
  margin-top: -160rpx;
  width: 600rpx;
  height: 600rpx;
  position: relative;
}
.detailContainer .songDiscActive{
  animation: move 4s linear  infinite;
}
@keyframes move{
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>
```