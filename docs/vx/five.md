# 谷粒云音乐
[[toc]]

## 1、初始化歌曲详情信息
- 路由传值
- `wx.setNavigationBarTitle`修改导航头
```html
<view class="songName">{{songDetail.name}}</view>
<image class="songImg" src='{{songDetail.picUrl}}'></image>

<script>
import request from '../../utils/request'
data: {
    msg:'',
    isPlay: false,
    songId: '',
    songDetail:'',
}
async onLoad(options) {
    const songId = options.songId;
    this.setData({
      songId,
    })
    // 存储了歌曲id之后 我们想让歌曲播放
    // 1、根据id获取歌曲的详情
    await  this.getSongDetail()
    // 2、还要获取一下播放歌曲的路径
    console.log('options',options)
},
async getSongDetail(){
    const data = await request('/song/detail',{ids:this.data.songId})
    if(data.code === 200){
      this.setData({
        songDetail:data.songs[0].al
      })
      // 获取歌曲信息 立马展示当前页面的头部信息
      wx.setNavigationBarTitle({
        title:data.songs[0].al.name
      })
    }
    console.log('data', data)
}
</script>
```
## 2、获取歌曲的播放路径 创建背景音乐
- `wx.setNavigationBarTitle` 主要title和src 必填
```js
async onLoad(options) {
    const songId = options.songId;
    this.setData({
      songId,
    })
    // 存储了歌曲id之后 我们想让歌曲播放
    // 1、根据id获取歌曲的详情
    await  this.getSongDetail()
    // 2、还要获取一下播放歌曲的路径
    await this.getSongUrl()
    // 3、播放歌曲
    this.setData({
      isPlay: true
    })
    if(!this.player){
      // 判断有没有音频播放管理器对象，如果没有直接创建，如果没有直接创建修改src和title
      this.player = wx.getBackgroundAudioManager()
    }

    this.player.src = this.data.songUrl;
    this.player.title = this.data.songDetail;
    console.log('options',options)
}
```

## 3、处理暂停和播放
```js
// 点击播放或者暂停按钮，切换播放状态
handleMusicPlay(){
    let isPlay = this.data.isPlay;
    this.setData({
      isPlay: !isPlay
    })
    this.playOrPauseMusic()
},

// 点击播放 或者 暂停歌曲
playOrPauseMusic(){
    let isPlay = this.data.isPlay
    isPlay?this.player.play():this.player.pause();
}
```
## 4、系统内置的播放
- 这里有系统内置的播放状态，  我们的按钮播放要与他同步
- 利用 播放器的监听事件 `onPlay` 和 `onPause`
```js
async onLoad(options) {
    const songId = options.songId;
    this.setData({
      songId,
    })
    // 存储了歌曲id之后 我们想让歌曲播放
    // 1、根据id获取歌曲的详情
    await  this.getSongDetail()
    // 2、还要获取一下播放歌曲的路径
    await this.getSongUrl()
    // 3、播放歌曲
    this.setData({ 
      isPlay: true
    })
    if(!this.player){
      // 判断有没有音频播放管理器对象，如果没有直接创建，如果没有直接创建修改src和title
      this.player = wx.getBackgroundAudioManager()
    }
    this.player.src = this.data.songUrl;
    this.player.title = this.data.songDetail.name;

    // 这里有系统内置的播放状态，  我们的按钮播放要与他同步
    this.player.onPlay(()=>{
      this.setData({
        isPlay:true
      })
    })
    this.player.onPause(()=>{
      this.setData({
        isPlay:false 
      })
    })
  }
```

## 5、利用 npm 包 进行通讯
-  npm在小程序当中使用
-  初始化包  npm init
-  npm i pubsub-js  
-  每安装一个包都要去工具当中构建一次npm   让小程序可以找到

## 6、上一曲下一曲逻辑， 消息的订阅和发布
-   
```js
// recommend.js
// 订阅详情页 点击上一曲或者下一曲 
PubSub.subscribe('songType',(msg,type)=>{
    // 根据当前保存的歌曲id 找到当前这首歌
    let index = this.data.recommendList.findIndex(item => item.id ===     Number(this.data.songId));
    let newIndex = 0;
    if(type === 'next'){
    newIndex = index === this.data.recommendList.length - 1 ? 0 : index + 1
    }else{
    newIndex = index === 0 ? this.data.recommendList.length - 1 : index - 1
    }
    PubSub.publish('newSongId', this.data.recommendList[newIndex].id)
    this.setData({
    songId:this.data.recommendList[newIndex].id
    })
})

// detail.js
// 订阅
PubSub.subscribe('newSongId',async (msg,id)=>{
    this.setData({
        songId:id,
    })
    // 存储了歌曲id之后 我们想让歌曲播放
    // 1、根据id获取歌曲的详情
    await  this.getSongDetail()
    // 2、还要获取一下播放歌曲的路径
    await this.getSongUrl()
    // 3、播放歌曲
    this.setData({
    isPlay: true
    })
    this.player = wx.getBackgroundAudioManager()
    this.player.src = this.data.songUrl;
    this.player.title = this.data.songDetail.name;
})
// 点击上一首和下一首
handleSwitch(event){
    let type = event.currentTarget.id;
    console.log(type)
    PubSub.publish('songType',type)
}


```

## 7、绑定歌曲自然播放结束
```js
// 绑定歌曲自然播放结束
this.player.onEnded(()=>{
    // 播放完成就是切换下一首
    PubSub.publish('songType','next')
})
```

## 8、进度条布局
```html
<view class="progress">
    <text class="currentTime">{{startTime}}</text>
    <view class="progressBar">
      <view class="timeBar" style="width:{{width}}">
        <view class="circle"></view>
      </view>
    </view>
    <text class="totaltTime">{{totaltTime}}</text>
</view>

<style>
/* 进度条 */
.progress{
  display: flex;
  align-items: center;
}
.progress .progressBar{
  position: relative;
  width: 450rpx;
  height: 4rpx;
  background-color: #fff;
  margin: 0 10rpx;
}
.progress .progressBar .timeBar{
  position: absolute;
  left: 0;
  top: 0;
  width: 100rpx;
  height: 4rpx;
  background-color: red;
}
.progress .progressBar .timeBar .circle{
  position: absolute;
  right:  -10rpx;
  top: -8rpx;
  width: 20rpx;
  height: 20rpx;
  background-color: saddlebrown;
  border-radius: 50%;
}
</style>
```

<!-- ## 9、动态设置播放时间 和 进度条的宽度 -->