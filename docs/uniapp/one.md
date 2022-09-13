# uniapp
[[toc]]

## 项目配置
-  服务端和完成的项目导入 `hbuilderX`
-  首先在终端启动服务端 `npm start`
-  然后运行完成版项目在小程序的开发工具

## 配置`hbuilderX`关联微信开发者工具
-  1、`hbuilderX`的运行，配置自己的小程序安装路径
-  2、在微信开发者工具中开启端口
-  3、启动项目需要在项目`manifest.json`配置文件中 小程序配置中 填写自己的appId(注意:每个项目都要重新配置`manifest.json`文件)

## 电商app-首页
-  导航配置
-  导入图片字体等资源
-  首页头部布局
```html
 <!-- pages/index/index.vue -->
<template>
	<view class="indexContainer">
		<view class="header">
			<image class="logo" src="../../static/images/logo.png" mode=""></image>
			<view class="search">
				<text class="iconfont icon-sousuo"></text>	
				<input placeholder="搜索商品" placeholder-class="place" type="text">
			</view>
			<button class="btn">心源</button>
		</view>
	</view>
</template>

<script>
	export default{
		
	}
</script>

<style lang="stylus">
	.indexContainer
		height 100%
		.header
			height 80rpx
			display flex
			align-items center
			.logo
				width 120rpx
				height 40rpx
				margin 0 20rpx
			.search
				height 60rpx
				border 2rpx solid #aaa
				box-sizing border-box
				flex: 1
				display flex
				align-items center
			.place
				font-size  28rpx
				color red
			.iconfont
				margin 0 10rpx
			.btn
				width 140rpx
				height 60rpx
				text-align center
				line-height 60rpx
				padding 0 10rpx
				font-size 28rpx
				margin: 0 10rpx
</style>


/* pages/index/index.vue */
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="stylus">
	/*每个页面公共css */
	@import url("./static/iconfont/iconfont.styl");
	page
		height 100%
		// background-color red
</style>
```

## 首页nav的布局
```html
<scroll-view class="navScroll" scroll-x="true" enable-flex>
	<view class="item active">
		推荐
	</view>
	<view class="item">
		居家生活
	</view>
</scroll-view>
<style lang="stylus">
.navScroll
		height 80rpx
		display: flex
		.item
			width 140rpx
			height 80rpx
			text-align center
			line-height 80rpx
			font-size 28rpx
			box-sizing border-box
			&.active
				border-bottom 1px solid red
</style>
```
## 首页轮播和三个图标列表的布局
```html
<scroll-view class="mainScroll" scroll-y="true">
	<view class="mainItem">
		<!-- 轮播图 -->
		<swiper class="mainSwiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" >
			<swiper-item class="mainItem">
				<view class="swiper-item">
						<image src="../../static/images/mylove.jpg" mode="" class="mainImg"></image>
				</view>
			</swiper-item>
			<swiper-item class="mainItem">
				<view class="swiper-item">
						<image src="../../static/images/mylove.jpg" mode="" class="mainImg"></image>
				</view>
			</swiper-item>
			<swiper-item class="mainItem">
				<view class="swiper-item">
						<image src="../../static/images/mylove.jpg" mode="" class="mainImg"></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 图标列表 -->
		<view class="iconList" >
			<view class="iconItem">
				<image src="../../static/images/mylove.jpg" class="iconImg"></image>
				<text class="iconText">网易自营品牌</text>
			</view>
			<view class="iconItem">
				<image src="../../static/images/mylove.jpg" class="iconImg"></image>
				<text class="iconText">30天无忧退货</text>
			</view>
			<view class="iconItem">
				<image src="../../static/images/mylove.jpg" class="iconImg"></image>
				<text class="iconText">48小时快速退款</text>
			</view>
		</view>
	</view>

</scroll-view>
<style>
.mainScroll
	height calc(100vh - 160rpx)
	.mainItem
		.mainImg
			width 100%
			height 350rpx
	.iconList
		height 32rpx
		display flex
		justify-content  space-around
		margin-top 10rpx
		.iconItem
			height 32rpx
			display flex
			aglin-item center
			.iconImg
				width 32rpx
				height 32rpx
			.iconText
				font-size: 24rpx
</style>
```
## 10个分类列表的布局
```html
<!-- 10个分类列表 -->
<view class="categoryList">
	<view class="category">
		<img src="../../static/images/mylove.jpg" class="catImg">
		<text class="catText">居家生活</text>
	</view>
	<view class="category">
		<img src="../../static/images/mylove.jpg" class="catImg">
		<text class="catText">居家生活</text>
	</view>
	<view class="category">
		<img src="../../static/images/mylove.jpg" class="catImg">
		<text class="catText">居家生活</text>
	</view>
	<view class="category">
		<img src="../../static/images/mylove.jpg" class="catImg">
		<text class="catText">居家生活</text>
	</view>
	<view class="category">
		<img src="../../static/images/mylove.jpg" class="catImg">
		<text class="catText">居家生活</text>
	</view>
	<view class="category">
		<img src="../../static/images/mylove.jpg" class="catImg">
		<text class="catText">居家生活</text>
	</view>
	<view class="category">
		<img src="../../static/images/mylove.jpg" class="catImg">
		<text class="catText">居家生活</text>
	</view>
	<view class="category">
		<img src="../../static/images/mylove.jpg" class="catImg">
		<text class="catText">居家生活</text>
	</view>
	<view class="category">
		<img src="../../static/images/mylove.jpg" class="catImg">
		<text class="catText">居家生活</text>
	</view>
</view>

<style>
.categoryList
	display flex
	flex-wrap wrap
	.category
		flex-shrink 0
		display flex
		width 20%
		flex-direction column
		align-items center
		.catImg
			width 110rpx
			height 110rpx
			border-radius 30rpx
			margin 20rpx 0
		.catText
			font-size 28rpx
</style>
```

## 楼层的组件拆分和布局
```html
<!-- components/Floor/index.vue -->
<template>
	<view class="floor">
		<image src="../../../../static/images/mylove.jpg" class="floorImg"></image>
		<scroll-view class="floorScroll" scroll-x="true" enable-flex>
			<view class="item">
				<image src="../../../../static/images/mylove.jpg" class="itemImg"></image>
				<text class='itemText'>xxxxxxxxxxxx</text>
			</view>
			<view class="item">
				<image src="../../../../static/images/mylove.jpg" class="itemImg"></image>
				<text class='itemText'>xxxxxxxxxxxx撒大声地所</text>
			</view>
			<view class="item">
				<image src="../../../../static/images/mylove.jpg" class="itemImg"></image>
				<text class='itemText'>xxxxxxxxxxxx</text>
			</view>
			<view class="item">
				<image src="../../../../static/images/mylove.jpg" class="itemImg"></image>
				<text class='itemText'>xxxxxxxxxxxx</text>
			</view>
			<view class="item">
				<image src="../../../../static/images/mylove.jpg" class="itemImg"></image>
				<text class='itemText'>xxxxxxxxxxxx</text>
			</view>
			<view class="item">
				<image src="../../../../static/images/mylove.jpg" class="itemImg"></image>
				<text class='itemText'>xxxxxxxxxxxx</text>
			</view>
		</scroll-view>
	</view>
</template>
<style lang="stylus">
.floor
	.floorImg
		width 100%
		height 375rpx
	.floorScroll
		height 300rpx
		display flex
		.item
			width 200rpx
			margin-right 20rpx
			flex-shrink 0
			.itemImg
				width 200rpx
				height 200rpx
			.itemText
				font-size 28rpx
				display -webkit-box
				-webkit-box-orient vertical
				-webkit-line-clamp 2
				overflow hidden
</style>

/* pages/index */
<Floor></Floor>
			
<script>
import Floor from './components/Floor/index.vue';
export default{
		components:{
			Floor
		}
}
</script>
```

## 搭建服务
- `uni.request`请求
- `guiguShop_server`  运行`npm run start`开启服务

## 封装请求工具，安装vuex，请求获取首页的数据保存到vuex
```js
// store/modules/home.js
import request from '../../utils/request.js'
const state = {
	homeData:{}
};
const mutations = {
	SET_HOMEDATA(state,homeData){
			state.homeData = homeData
	}
};
const actions = {
	async getHomeData({commit}){
		const result = await request('/getHomeData')
		commit('SET_HOMEDATA',result.d ata)
	}
};
const getters = {};
export default {
		state,
		mutations,
		actions,
		getters
}

// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import home from './modules/home';
Vue.use(Vuex)

const state = {};
const mutations = {};
const actions = {};
const getters = {};

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	modules:{
		home
	}
})

// utils/config.js
export default{
	host:'http://localhost:3001'
}
// utils/request.js
import config from './config.js'
export default function request(url,data={},method='GET'){
	return new Promise((resolve,reject)=>{
			wx.request({
				url: config.host + url,
				data,
				method,
				success:(res)=>{
					resolve(res)
				},
				fail:(err)=>{
					reject(err)
				}
			})
	})
}
```

## 通过getters计算navList和iconList展示nav和图标及从官网获取轮播图片进行展示
- 在首页请求数据
- 动态数据 10个分类 KingKongModule.KingKongList, 通过getters计算得到
- 轮播图 动态数据需要去网易严选拿取
- 小图标 动态数据中`policyDescList`获取, 通过getters计算得到
```html
<!-- store/modules/home.js -->
<script>
const getters = {
	 navList(state){
		 return (state.homeData.kingKongModule || {}).kingKongList || []
	 },
	 iconList(state){
		 return state.homeData.policyDescList || []
	 }
};
</script>
<!-- pages/index/index.vue -->
<!-- nav -->
<scroll-view class="navScroll" scroll-x="true" enable-flex>
	<view class="item" :class="{active:currentIndex === -1}" @click="changenav(-1)">
		推荐
	</view>
	<view class="item" v-for="(item,index) in navList" :key="item.L1Id" :class="{active:currentIndex === index}" @click="changenav(index)">
		{{item.text}}
	</view>
</scroll-view>
<!-- 轮播图 -->
<swiper class="mainSwiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" >
	<swiper-item class="mainItem" v-for="(item,index) in imgList" :key="index">
		<view class="swiper-item">
				<image :src="item" mode="" class="mainImg"></image>
		</view>
	</swiper-item>
</swiper>
</view>
<!-- 图标列表 -->
<view class="iconList" >
	<view class="iconItem" v-for="(item, index) in iconList" :key="item.desc">
		<image :src="item.icon" class="iconImg"></image>
		<text class="iconText">{{item.desc}}</text>
	</view>
</view>
<script>
import {mapState,mapGetters} from 'vuex';
export default{
	data(){
		return{
			currentIndex:-1,
			imgList:[
				'https://yanxuan.nosdn.127.net/static-union/166192596737b102.jpg?type=webp&imageView&quality=75&thumbnail=750x0',
			  'https://yanxuan.nosdn.127.net/ee7df235430b16679beb0eae03de130f.jpg?type=webp&imageView&quality=75&thumbnail=750x0',
			  'https://yanxuan.nosdn.127.net/b12b2033013125c245b41bd3dca9dd04.jpg?type=webp&imageView&quality=75&thumbnail=750x0'
			]
		}
	},
	components:{
		Floor
	},
	mounted(){
		this.getHomeData()
	},
	methods:{
		getHomeData(){
			this.$store.dispatch('getHomeData')
		},
		changenav(i){
			this.currentIndex = i
		}
	},
	computed:{
		...mapState({
			homeData:state=> state.home.homeData
		}),
		...mapGetters(['navList','iconList'])
	}
}
</script>
```
## 计算10个分类列表数据和floor组件数据进行展示及查看更多的设置
```html
<!-- 10个分类列表 -->
<view class="categoryList">
	<view class="category" v-for="(item,index) in navList" :key="item.L1Id">
		<image :src="item.picUrl" class="catImg"></image>
		<text class="catText">{{item.text}}</text>
	</view>
</view>
<!-- 楼层 -->
<Floor v-for="(floor,index) in floorList" :key="index" :floor='floor'></Floor>
<!-- store/modules/home.js -->
<script>
computed:{
	...mapState({
		homeData:state=> state.home.homeData
	}),
	...mapGetters(['navList','iconList','floorList'])
}
</script>

<script>
const getters = {
	 navList(state){
		 return (state.homeData.kingKongModule || {}).kingKongList || []
	 },
	 iconList(state){
		 return state.homeData.policyDescList || []
	 },
	 floorList(state){
		 return state.homeData.categoryModule || []
	 }
};
</script>

<!-- pages/index/components/Floor/index.vue -->
<template>
	<view class="floor">
		<image :src="floor.titlePicUrl" class="floorImg"></image>
		<scroll-view class="floorScroll" scroll-x="true" enable-flex>
			<view class="item" v-for="(item,index) in floor.itemList" :key="item.id">
				<image :src="item.showPicUrl" class="itemImg"></image>
				<text class='itemText'>{{item.simpleDesc}}</text>
			</view>
			<view class="item single">查看更多>></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
			props:['floor'],
	}
</script>

<style lang="stylus">
.floor
	.floorImg
		width 100%
		height 375rpx
	.floorScroll
		height 300rpx
		display flex
		flex-direction row
		.single
			width 200rpx
			height 300rpx
			text-align center
			line-height 300rpx
		.item
			width 200rpx
			margin-right 20rpx
			flex-shrink 0
			.itemImg
				width 200rpx
				height 200rpx
			.itemText
				font-size 28rpx
				display -webkit-box
				-webkit-box-orient vertical
				-webkit-line-clamp 2
				overflow hidden
</style>
```