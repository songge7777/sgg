# 硅谷云音乐

## 列表视频 多个视频同时播放的问题
- 当前保存一个 video 实例，每次播放的时候将上一个实例 停止，同时更换点击的实例，将当前点击的实例进行播放
- 如何保证只有一个视频在播放  (利用单例模式)
- 首先保证只有一个执行上下文对象(创建的视频实例),存到我们的this上
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
      // 如何保证只有一个视频在播放  (利用单例模式)
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
## 图片做优化
- poster属性 封面
- 图片和视频切换  保证了当前只能有一个视频展示
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

## 内网演示
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

## 保存当前播放时间， 切换回来的时候 变成继续播放
- `VideoContext.seek`
```js
// 添加历史 播放记录
addHistoryRecord(){
  let obj = this.data.playRecordList.find(item => item.vid ===this.data.vid)
  if(obj){
    // 如果查找到之前的播放记录，那么这次我需要跳转到位置
    this.player.seek(obj.currentTime)
  }
}
```

## 播放完成删除历史记录
- vedio 事件`bindended`
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

## 上拉触底 下拉刷新
- 下拉刷新 需要配置 `scroll-view` 的 `refresher-enabled` 为 `true` 和下拉刷新标识 `refresher-triggered` 为`false`
  - 当用户下拉刷新的时候，需要重新发请求获取列表数据 绑定事件`bindrefresherrefresh`
  - 用户下拉刷新的时候, 会出现标识(三个点), 当数据请求回来了, 需要取消标识(去掉三个点) 
    - 下拉刷新标识 `refresher-triggered`
  - 上拉触底后，需要添加新的视列表数据，目前没有api，模拟手动添加数据，绑定`bindscrolltolower`

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
  const rs = await request('/video/group',{id:this.data.navId})
  if(rs.code === 200){
    const videoList = rs.datas.map(item => item.data)
    setTimeout(()=>{
      this.setData({
        refresherFlag: false,
        videoList
      })
    },2000)
  }
}
</script>
```

## 自定义原生分享和自定义分析
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
### 禁止分享
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