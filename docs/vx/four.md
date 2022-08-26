# four

## 列表视频 多个视频同时播放的问题
- 当前保存一个 video 实例，每次播放的时候将上一个实例 停止，同时更换点击的实例，将当前点击的实例进行播放
```html
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
<script>
data: {
    currentVideo:'',
    vid:'',
},
  videoClick(event){
    const id = event.currentTarget.id
    // 怎么保证视频上下文只有一个(单例模式)
    const newVideo = wx.createVideoContext(id)
    const currentVideo = this.data.currentVideo
    const vid = this.data.vid;
    // 之前已经存在 video 实例
    if(currentVideo){
      console.log('===再次')
      // 当前已有的和点击进来的 不一样 就暂停 
      // 同时 要播放点击的视频
      if(id !== vid){
        currentVideo.stop()
        this.setData({
          currentVideo:newVideo,
          vid:id,
        })
        newVideo.play();
      }
    }else{
        this.setData({
        currentVideo:newVideo,
        vid:id,
      })
      // 之前没有video实例
        newVideo.play();
    }
  }
</script>








const vid = event.currentTarget.id
    if(!this.player){
      this.player = wx.createVideoContext(vid)
      this.player.play();
      this.setData({
        vid
      })
    }else{
      if(vid !== this.data.vid){
        this.player.pause();
        this.player = wx.createVideoContext(vid)
        this.player.play();
        this.setData({
          vid
        })
      }
    }
```