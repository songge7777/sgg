# two
[[toc]]

## 定义分类nav对应的组件并使用，点击推荐和分类切换不同的内容
- 创建 `card` 组件
```html
<view class="mainItem" v-show="currentIndex === -1"></view>
<Card v-show="currentIndex !== -1"></Card>
```
## card组件静态布局
```html
<template>
	<view class="card">
		<swiper class="cardSwiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<view class="swiper-item">
					<image class="swiperImg" src="../../../../static/images/mylove.jpg" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image class="swiperImg" src="../../../../static/images/mylove.jpg" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="title">
			123
		</view>
		<view class="title">
			1233333-
		</view>
		<view class="goodsList">
			<view class="goods">
				<image src="../../../../static/images/mylove.jpg" class="goodsImg" mode=""></image>
				<text class="goodsName">名字</text>
				<text class="goodPrice">200</text>
			</view>
			<view class="goods">
				<image src="../../../../static/images/mylove.jpg" class="goodsImg" mode=""></image>
				<text class="goodsName">名字</text>
				<text class="goodPrice">200</text>
			</view>
			<view class="goods">
				<image src="../../../../static/images/mylove.jpg" class="goodsImg" mode=""></image>
				<text class="goodsName">名字</text>
				<text class="goodPrice">200</text>
			</view>
			<view class="goods">
				<image src="../../../../static/images/mylove.jpg" class="goodsImg" mode=""></image>
				<text class="goodsName">名字</text>
				<text class="goodPrice">200</text>
			</view>
			<view class="goods">
				<image src="../../../../static/images/mylove.jpg" class="goodsImg" mode=""></image>
				<text class="goodsName">名字</text>
				<text class="goodPrice">200</text>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="stylus">
	.card
		.cardSwiper
			.swiperImg
				width 100%
				height 350rpx
		.title
			text-align: center
		.goodsList
			display flex
			flex-wrap wrap
			justify-content space-around
			flex-direction row
			&:after
				content ''
				width 344rpx
			.goods
				.goodsImg
					width 344rpx
					height 344rpx
			
</style>
```

## 通过 vuex 获取card组件 数据
-	主页分类数据 `datas/indexCateList.json`  router `getIndexCateList`
```js
// store/modules/home.js
import request from '../../utils/request.js'
const state = {
	indexCateList:[]
};
const mutations = {
	SET_INDEXCATELIST(state,indexCateList){
			state.indexCateList = indexCateList
	},
};
const actions = {
	async getIndexCateList({commit}){
		const result = await request('/getIndexCateList')
		console.log('result', result)
		commit('SET_INDEXCATELIST',result.data)
	}
};

// Card/index.vue
import { mapState } from 'vuex';
export default{
	mounted(){
		this.getIndexCateList();
	},
	methods:{
		getIndexCateList(){
			this.$store.dispatch('getIndexCateList')
		}
	},
	computed:{
		...mapState({
			indexCateList: state => state.home.indexCateList
		})
	}
}
```
- 点击nav 动态计算card的数据
- 之前用的`index` 切换的 `nav` 现在全部换成 `currentId`
```html
<!-- /pages/index/index.vue -->
<!-- nav -->
<scroll-view class="navScroll" scroll-x="true" enable-flex>
	<view class="item" :class="{active:currentId === -1}" @click="changenav(-1)">
		推荐
	</view>
	<view class="item" v-for="(item,index) in navList" :key="item.L1Id" :class="{active:currentId === item.L1Id}" @click="changenav(item.L1Id)">
		{{item.text}}
	</view>
</scroll-view>
<!-- /card/index.vue -->
<template>
	<view class="card">
		<swiper class="cardSwiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in category.bannerUrlList" :key='index'>
				<view class="swiper-item">
					<image class="swiperImg" :src="item" mode=""></image>
				</view>
			</swiper-item>
		</swiper>  
		<view class="title">
			{{category.name}}
		</view>
		<view class="title">
			{{category.frontName}}
		</view>
		<view class="goodsList">
			<view class="goods" v-for="(goods, index) in itemList" :key="goods.id">
				<image :src="goods.primaryPicUrl" class="goodsImg" mode=""></image>
				<text class="goodsName">{{goods.name}}</text>
				<text class="goodsPrice">{{goods.counterPrice}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default{
		props:['currentId'],
		mounted(){
			this.getIndexCateList();
		},
		methods:{
			getIndexCateList(){
				this.$store.dispatch('getIndexCateList')
			}
		},
		computed:{
			...mapState({
				indexCateList: state => state.home.indexCateList
			}),
			currentCardData(){
				return this.indexCateList.find( i => i.category.parentId === this.currentId) || {}
			},
			category(){
				return  this.currentCardData.category || {}
			},
			itemList(){
				return   this.currentCardData.itemList || {}
			}
		}
	}
</script>

<style lang="stylus">
	.card
		.cardSwiper
			.swiperImg
				width 100%
				height 350rpx
		.title
			text-align: center
		.goodsList
			display flex
			flex-wrap wrap
			justify-content space-around
			flex-direction row
			&:after
				content ''
				width 344rpx
			.goods
				.goodsImg
					width 344rpx
					height 344rpx
				.goodsName
					width 344rpx
				.goodsPrice	
					width 344rpx
</style>
```

## 配置tabbar页面
- 新建页面的时候 `pages`会自动写入路径
```js
{
	"pages": [ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			"path": "pages/index/index",
			"style": {
				"navigationBarTitleText": "uni-app"
			}
		},
		{
				"path" : "pages/center/center",
				"style" :                                                                                    
				{
						"navigationBarTitleText": "个人中心",
						"enablePullDownRefresh": false
				}
				
		},
		{
				"path" : "pages/shopCart/shopCart",
				"style" :                                                                                    
				{
						"navigationBarTitleText": "购物车",
						"enablePullDownRefresh": false
				}
				
		},
		{
				"path" : "pages/category/category",
				"style" :                                                                                    
				{
						"navigationBarTitleText": "分类",
						"enablePullDownRefresh": false
				}
				
		}
    ],
	"globalStyle": {
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "uni-app",
		"navigationBarBackgroundColor": "#F8F8F8",
		"backgroundColor": "#F8F8F8"
	},
	"tabBar": {
	    "color": "#555",
	    "selectedColor": "#D43C33",
	    "list": [
	      {
	        "pagePath": "pages/index/index",
	        "text": "首页",
	        "iconPath": "/static/images/tabBar/tab-home.png",
	        "selectedIconPath": "/static/images/tabBar/tab-home-current.png"
	      },
	      {
	        "pagePath": "pages/category/category",
	        "text": "分类",
	        "iconPath": "/static/images/tabBar/tab-cate.png",
	        "selectedIconPath": "/static/images/tabBar/tab-cate-current.png"
	      },
	      {
	        "pagePath": "pages/shopcart/shopcart",
	        "text": "购物车",
	        "iconPath": "/static/images/tabBar/tab-cart.png",
	        "selectedIconPath": "/static/images/tabBar/tab-cart-current.png"
	      },
	      {
	        "pagePath": "pages/center/center",
	        "text": "个人中心",
	        "iconPath": "/static/images/tabBar/tab-my.png",
	        "selectedIconPath": "/static/images/tabBar/tab-my-current.png"
	      }
	    ]
	  },
	"uniIdRouter": {}
}
```

## 分页静态页面的搭建
```html
<template>
	<view class="categoryContainer">
		<view class="header">
			<view class="search">
				搜索商品
			</view>
		</view>
		<view class="main">
			<view class="left">
				<view class="leftItem">居家生活</view>
				<view class="leftItem">居家生活</view>
			</view>
			<scroll-view enable-flex scroll-y="true" class="rightScroll" >
				<view class="scrollItem">
					<image class="img" src="../../static/images/mylove.jpg"></image>
					<view class="goodsList">
						<view class="goods">
							<image class="goodsImg" src="../../static/images/mylove.jpg" mode=""></image>
							<text class="goodsText">sss</text>
						</view>
						<view class="goods">
							<image class="goodsImg" src="../../static/images/mylove.jpg" mode=""></image>
							<text class="goodsText">sss</text>
						</view>
						<view class="goods">
							<image class="goodsImg" src="../../static/images/mylove.jpg" mode=""></image>
							<text class="goodsText">sss</text>
						</view>
						<view class="goods">
							<image class="goodsImg" src="../../static/images/mylove.jpg" mode=""></image>
							<text class="goodsText">sss</text>
						</view>
						<view class="goods">
							<image class="goodsImg" src="../../static/images/mylove.jpg" mode=""></image>
							<text class="goodsText">sss</text>
						</view>
						<view class="goods">
							<image class="goodsImg" src="../../static/images/mylove.jpg" mode=""></image>
							<text class="goodsText">sss</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
 export default {
  data() {
   return {
		 
   }
  },
  methods: {
   
  }
 }
</script>

<style lang="stylus">
	.categoryContainer
		height 100%
		.header
			height 80rpx
			display flex
			justify-content center
			align-items center
			.search
				width 90%
				height 60rpx
				background-color #aaa
				font-size 28rpx
				text-align center
				line-height 60rpx
		.main
			display flex
			border-top 1px solid #aaa
			box-sizing border-box
			.left
				width 150rpx
				.leftItem
					width 150rpx
					height 80rpx
					font-size 28rpx
					text-align  center
					line-height 80rpx
			.rightScroll
				height calc(100vh - 80rpx)
				flex 1
				border-left 1px solid #aaa
				box-sizing border-box
				.scrollItem
					.img
						width 520rpx
						height 190rpx
						display: block
						margin: 20rpx auto
					.goodsList
						display flex
						flex-wrap wrap
						.goods
							width 33.33%
							text-align center
							.goodsImg
								width 100%
								height 144rpx
							.goodsText
								font-size: 28rpx
								
						
</style>
```

## 动态数据
- store
```js
import request from '../../utils/request.js'

const state = {
	categoryList:[],
};

const mutations = {
	SET_CATEGORYLIST(state,categoryList){
			state.categoryList = categoryList
	},
};

const actions = {
	async getCategoryList({commit}){
		const result = await request('/getCategoryData')
		commit('SET_CATEGORYLIST',result.data)
	}
};

const getters = {
	 navList(state){
		 return (state.homeData.kingKongModule || {}).kingKongList || []
	 },
};

export default {
		state,
		mutations,
		actions,
		getters
}
```
- 数据修改
```html
<template>
	<view class="categoryContainer">
		<view class="header">
			<view class="search">
				搜索商品
			</view>
		</view>
		<view class="main">
			<view class="left">
				<view
					class="leftItem"
					v-for="(item,index) in categoryList"
					:key="item.id"
					:class="{active: index === defaultIndex}"
					@click="defaultIndex = index"
				>{{item.name}}</view>
			</view>
			<scroll-view enable-flex scroll-y="true" class="rightScroll" >
				<view class="scrollItem">
					<image class="img" :src="currentCategory.imgUrl"></image>
					<view class="goodsList">
						<view class="goods" v-for="(item,indx) in goodsList" :key="item.id">
							<image class="goodsImg" :src="item.wapBannerUrl" mode=""></image>
							<text class="goodsText">{{item.name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
 export default {
  data() {
   return {
		defaultIndex:0
   }
  },
  methods: {
   getCategoryList(){
		 this.$store.dispatch('getCategoryList')
	 }
  },
	computed:{
		...mapState({
			categoryList: state => state.categorys.categoryList
		}),
		currentCategory(){
			return this.categoryList[this.defaultIndex] || {}
		},
		goodsList(){
			return this.currentCategory.subCateList || []
		}
	},
	mounted(){
		this.getCategoryList()
	}
 }
</script>
```
## 个人中心和登录逻辑的实现
- 数据存储
- 获取个人信息

- 页面模板
```html
<template>
	<div>
		<div class="header" v-if="userInfo.nickName">
			<image class="userImg" :src="userInfo.avatarUrl" mode=""></image>
			<div class='userInfo'>
				<p>{{userInfo.nickName}}</p>
			</div>
		</div>
		<div class="header" v-else>
			<image class="userImg" src="../../static/images/personal/personal.png" mode=""></image>
			<div class='userInfo' @click='toLogin'>
				<p>未登录</p>
			</div>
		</div>
		
		<div class="content">
			<h2>我的资产</h2>
			<p class='line'></p>
			<div class="myAssetList">
				<div class='assetItem'>
					<span>￥0</span>
					<span>回馈金</span>
				</div>
				<div class='assetItem'>
					<span>￥0</span>
					<span>红包</span>
				</div>
				<div class='assetItem'>
					<span>￥0</span>
					<span>优惠券</span>
				</div>
				<div class='assetItem'>
					<span>￥0</span>
					<span>津贴</span>
				</div>
				<div class='assetItem'>
					<span>￥0</span>
					<span>礼品卡</span>
				</div>
			</div>
			<!-- 列表选项 -->
			<div class="personalList">
				<div class="navItem" v-for='(item, index) in personalList' :key='index'>
					<i class='iconfont ' :class='item.icon'></i>
					<p>{{item.name}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import request from '../../utils/request.js'
	module.exports = {
		data(){
			return {
				userInfo: {},
				personalList: [
					{
						name: '我的订单',
						icon: 'icon-dingdan11'
					},
					{
						name: '我的拼团',
						icon: 'icon-pintuandingdan'
					},
					{
						name: '领红包',
						icon: 'icon-tubiaolunkuo-1'
					},
					{
						name: '我的积分',
						icon: 'icon-jifen3'
					},
					{
						name: '地址管理',
						icon: 'icon-dizhiguanli'
					},
					{
						name: '账号安全',
						icon: 'icon-dingdan11'
					},
					{
						name: '联系客服',
						icon: 'icon-zhanghaoanquan'
					},
					{
						name: '用户反馈',
						icon: 'icon-tubiaolunkuo-'
					},
					{
						name: '帮助中心',
						icon: 'icon-bangzhuzhongxin'
					},
					{
						name: '退还/售后',
						icon: 'icon-shouhou'
					}
				]
			}
		},
		mounted(){
			
		},
		methods: {
			
		},
	}
</script>

<style lang="stylus">
		
	.header
		display flex
		background #EED7B5
		padding 40upx 0
		.userImg 
			width 100upx
			height 100upx
			margin 0 50upx 0 30upx
			background #FFFFFF
			border-radius 50upx
		.userInfo
			p
				height 50upx
				line-height 50upx
				&:first-child
					font-size 28upx
				&:last-child
					font-size 24upx
	.content
		h2
			font-size 26upx
			line-height 100upx
			margin-left 5%
		.line
			width 90%
			height 2upx
			background #eee
			margin 0 auto
		.myAssetList
			width 90%
			margin 20upx auto
			display flex 
		
			.assetItem
				width 25%
				display flex
				flex-direction column
				align-items center
				font-size 24upx
				color #333333
				line-height 40upx
		.personalList
			display flex
			flex-wrap wrap
			border-top 1upx solid #EEEEEE
			.navItem
				width 33.3333%
				text-align center
				border-bottom 1upx solid #EEEEEE
				border-right 1upx solid #EEEEEE
				box-sizing border-box
				padding 30upx 0
				&:nth-child(3n)
					border-right none
				.iconfont 
					font-size 60upx
				p
					font-size 24upx
					line-height 40upx
				
</style>
```
- 登录模板
```html
<template>
	<view class="loginContainer">
		<image class="logo" src="http://yanxuan.nosdn.127.net/39c5e4583753d4c3cb868a64c2c109ea.png" mode=""></image>
		<p class="text">网易自营，精品生活家居品牌</p>
		<div class="loginMethods">
			<button class="login wechatLogin" @click="getUserInfo">微信登录</button>
			<button class="login emailLogin">邮箱登录</button>
		</div>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	mounted() {},
	methods: {
		
	}
};
</script>

<style lang="stylus">
.loginContainer
	width 100%
	height 100%
	background #F8F8F8
	display flex
	align-items center
	flex-direction column
	.logo
		width 300upx
		height 100upx
		margin-top 200upx
	.text
		font-size 26upx
		color #666
	.loginMethods
		width 80%
		margin 150upx auto
		display flex
		justify-content space-around
		.login
			width 240upx
			height 80upx
			background #41A863
			color #FFFFFF
			text-align center
			line-height 80upx
			font-size 26upx
</style>
```

-  登录获取用户信息
```js
// pages/login/login
getUserInfo(){
	wx.getUserProfile({
		desc:'获取用户信息',
		success: res => {
			console.log(res.userInfo)
			wx.setStorageSync('userInfo',res.userInfo)
			wx.reLaunch({
				url:'/pages/center/center'
			})
		}
	})
}
// pages/center/center
mounted(){
	this.userInfo = wx.getStorageSync('userInfo')
}
methods: {
	toLogin(){
		wx.navigateTo({
			url:'/pages/login/login'
		})
	}
}
```

## 点击首页card的商品跳转到详情 携带query参数带过去点击的商品进行展示
-	
```html
<!-- 商品详情页 -->
<template>
	<view class="detailContainer">
		<view class="header">
			<icon class="iconfont icon-shouye2"></icon>
			<text>网易严选 </text>
			<view class="shopCart" >
				<icon class="iconfont icon-gouwuche2"></icon>
				<text class="count">1</text>
			</view>
		</view>
		
		<!-- 内容区 -->
		<scroll-view class="content" scroll-y="true">
			<image class="detailImg" :src="goodsInfo.listPicUrl" mode=""></image>
			<view class="tag">{{goodsInfo.promTag}}</view>
			<text class="price">￥ {{goodsInfo.retailPrice}}</text>
			<view class="info">{{goodsInfo.name}}</view>
			
			
			<!-- 准备内容 -->
			<view class="list" style="margin-left: 5%;font-size: 28upx;line-height: 50upx;">
				<view>1) 100%桑蚕丝填充，丝丝精粹不掺杂</view>
				<view>2) 创新井字拉网工艺，桑蚕丝不易黏连结块</view>
				<view>3) 两种面料可选，贡缎手感细腻，竹棉清爽透气</view>
				<view>4) AB双面设计，多种活性印花不易褪色</view>
			</view>
		</scroll-view>
		
		<!-- 底部导航 -->
		<view class="detailFooter">
			<image class="service" src="http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/detail-kefu-d10f0489d2.png?imageView&type=webp" mode=""></image>
			<view class="btn buyNow">立即购买</view>
			<view  class="btn addShopCart" @click="addShopCart">加入购物车</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
			}
		},
		onLoad(option){
			this.goodsInfo = JSON.parse(option.goods)
		},
		computed:{
		},
		methods:{
		}
		
	}
</script>

<style lang="stylus">
	.detailContainer
		width 100%
		display flex
		flex-direction column
		.header
			height 90upx
			line-height 90upx
			background #FFFFFF
			display flex
			text-align center
			.iconfont
				width 90upx
				height 90upx
				font-size 50upx
			text
				flex 1
			.shopCart
				position relative
				.count
					color red
					position absolute
					top -25upx
					right 5upx
					font-size 26upx
		.content
			height calc(100vh - 190upx)
			.detailImg
				width 100%
				height 750upx
			.tag
				width 90%
				height 100upx
				line-height 100upx
				text-align center
				font-size 32upx
				color #FFFFFF
				margin 20upx auto
				background #BB2C08
				border-radius 10upx
			.price
				font-size 50upx
				color #DD1A21
				line-height 70upx
				margin-left 5%
			.info
				font-size 28upx
				color #333
				margin-left 5%
		.detailFooter
			position fixed
			bottom 0
			left 0
			height 100upx
			line-height 100upx
			border-top 1upx solid #EEEEEE
			display flex
			background #fff
			.service
				width 60upx
				height 60upx
				margin 20upx 40upx
			.btn
				width 305upx
				height 100%
				text-align center
				font-size 28upx
				&.buyNow
					color #333
					border-left 1upx solid #eee
				&.addShopCart
					background #DD1A21
					color #fff
				
</style>
```
- card
```html
<view class="goods" v-for="(goods, index) in itemList" :key="goods.id" @click="toDetail(goods)">
	<image :src="goods.primaryPicUrl" class="goodsImg" mode=""></image>
	<text class="goodsName">{{goods.name}}</text>
	<text class="goodsPrice">{{goods.counterPrice}}</text>
</view>
// 点击商品跳转到商品详情页
<script>
toDetail(goods){
	wx.navigateTo({
		url:'/pages/detail/detail?goods=' + JSON.stringify(goods)
	})
}
</script>
```

## 在购物车store当中模拟假数据,动态展示到购物车
- 
```html
<template>
	<view class="cartContainer">
		<view class="title">购物车</view>
<!-- 		<view class="header">
			<text>30天无忧退货</text>
			<text>48小时快速退货</text>
			<text>满99元免邮费</text>
		</view>
		<view class="contentContainer">
			<image class="cartImg" src="http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/noCart-d6193bd6e4.png?imageView&type=webp" mode=""></image>
			<button @click="toLogin">登录</button>
			<view class="addMore">去添加点什么吧</view>
		</view>
		 -->
				<!-- 购物车列表 -->
		<view class="cartList">
			<view class="cartItem" >
				<text class='iconfont icon-xuanzhong' ></text>
				<view class="shopItem">
					<image class="shopImg" ></image>
					<view class="shopInfo">
						<text>购物车</text>
						<text class="price">价格</text>
					</view>
				</view>
				<!-- 控制数量 -->
				<view class="countCtrl">
					<text class="add" > + </text>
					<text class="count">0</text>
					<text class="del" > - </text>
				</view>
			</view>
		</view>
		<!-- 底部下单 -->
		<view class="cartFooter">
			<text class='iconfont icon-xuanzhong' ></text>
			<text class="allSelected">已选</text>
			<view class="right">
				<text class="totalPrice">合计: </text>
				<text class="preOrder">下单</text>
			</view>
		</view>
				
	<!-- <image class="cartImg" src="http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/noCart-d6193bd6e4.png?imageView&type=webp" mode=""></image>
			<view class="hint">购物车还是空的，赶紧去购物吧</view>
	 -->
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			
		},
		computed:{
			
		}
	}
</script>

<style lang="stylus">
	/* iconfont 公共样式 */
	.cartImg
		display block
		width 248upx
		height 248upx
		margin 300upx auto 50upx

	.cartContainer
		position relative
		background #f4f4f4
		height 100%
		.title
			font-size 32upx
			line-height 80upx
			margin-left 30upx
		.header
			display flex
			background #eee
			text
				width 33.333%
				height 80upx
				line-height 80upx
				text-align center
				font-size 26upx
		.contentContainer
			
			button
				width 480upx
				height 92upx
				background #DD1A21
				color #fff
				font-size 32upx
				line-height 92upx
			.addMore
				text-align center
				font-size 26upx
				color #7f7f7f
				line-height 60rpx
		.cartList
			.cartItem
				position relative
				display flex
				height 172upx
				background #fff
				margin-top 20upx
				padding 20upx
				.iconfont
					font-size 40upx
					line-height 172upx
					margin 0 40upx
					color #999
					&.selected
						color: #BB2C08
				.shopItem
					display flex 
					.shopImg
						width 172upx
						height 172upx
						background #eee
					.shopInfo
						font-size 28upx
						display flex
						flex-direction column
						margin-left 20upx
						text
							line-height 60upx
						.price
							color: #BB2C08
				.countCtrl
					position absolute
					right 20upx
					bottom 30upx
					text
						display inline-block
						width 60upx
						height 50upx
						text-align center
						line-height 50upx
						border 1upx solid #EEEEEE
						&:nth-child(2)
							border none
							border-top 1upx solid #EEEEEE
							border-bottom 1upx solid #EEEEEE
		.cartFooter
			position absolute
			display flex	
			bottom 2rpx
			height 96upx
			line-height 96upx
			width 100%
			background #fff
			font-size 30upx
			.iconfont
				font-size 40upx
				margin 0 20upx
				color: #999
				&.selected
					color: #BB2C08
			.right 
				height 96upx
				position absolute
				right 0
				.totalPrice
					display inline-block
					height 96upx
					line-height 96upx
				.preOrder
					display inline-block
					background #DD1A21
					width 225upx
					height 96upx
					line-height 96upx
					text-align center
					font-size 28upx
					color #fff
					margin-left 30upx
		.hint
			text-align center
			font-size 28upx
					
</style>
```
- 组件获取数据
```js
// shopcart.js
const state = {
	shopCartList:[
		{
				"isChecked": true,
				"count":4,
		    "promId": 0,
		    "showPoints": false,
		    "itemTagList": [
		        {
		            "itemId": 1535004,
		            "tagId": 128111157,
		            "freshmanExclusive": false,
		            "name": "暖冬特惠",
		            "subType": 204,
		            "forbidJump": false,
		            "type": 2
		        }
		    ],
		    "rank": 1,
		    "id": 1535004,
		    "sellVolume": 4001,
		    "primaryPicUrl": "https://yanxuan-item.nosdn.127.net/f79906f1b1fe86420ea40473de66ec0e.png",
		    "soldOut": false,
		    "sortFlag": 0,
		    "commentCount": 0,
		    "onSaleTime": 1538101761748,
		    "picMode": 1,
		    "commentWithPicCount": 0,
		    "underShelf": false,
		    "status": 2,
		    "couponConflict": true,
		    "forbiddenBuy": false,
		    "promotionDesc": "暖冬特惠",
		    "limitedFlag": 204,
		    "pieceNum": 0,
		    "itemSizeTableDetailFlag": false,
		    "forbidExclusiveCal": false,
		    "rewardShareFlag": false,
		    "updateTime": 1575893634989,
		    "showCommentEntrance": true,
		    "pieceUnitDesc": "件",
		    "specialPromTag": "",
		    "counterPrice": 299,
		    "categoryL2Id": 0,
		    "retailPrice": 209,
		    "primarySkuPreSellPrice": 0,
		    "preLimitFlag": 0,
		    "itemPromValid": true,
		    "promTag": "暖冬特惠",
		    "source": 0,
		    "points": 0,
		    "primarySkuPreSellStatus": 0,
		    "extraServiceFlag": 0,
		    "flashPageLink": "",
		    "autoOnsaleTimeLeft": 0,
		    "innerData": {},
		    "saleCenterSkuId": 0,
		    "pointsStatus": 0,
		    "extraPrice": "",
		    "colorNum": 0,
		    "showTime": 0,
		    "autoOnsaleTime": 0,
		    "preemptionStatus": 1,
		    "isPreemption": 0,
		    "zcSearchFlag": false,
		    "name": "男式色拉姆内衣套装2.0",
		    "appExclusiveFlag": false,
		    "itemType": 1,
		    "listPicUrl": "https://yanxuan-item.nosdn.127.net/c2eeb1b872af1b8efc179a7515aacdaa.png",
		    "pointsPrice": 0,
		    "simpleDesc": "色拉姆发热面料，加厚升级",
		    "seoTitle": "",
		    "newItemFlag": false,
		    "buttonType": 0,
		    "primarySkuId": 1636062,
		    "displaySkuId": 1636056,
		    "productPlace": "",
		    "itemSizeTableFlag": false
		},
		{
				"isChecked": false,
				"count": 6,
		    "promId": 0,
		    "showPoints": false,
		    "itemTagList": [
		        {
		            "itemId": 1536001,
		            "tagId": 128111157,
		            "freshmanExclusive": false,
		            "name": "暖冬特惠",
		            "subType": 204,
		            "forbidJump": false,
		            "type": 2
		        }
		    ],
		    "rank": 1,
		    "id": 1536001,
		    "sellVolume": 3634,
		    "primaryPicUrl": "https://yanxuan-item.nosdn.127.net/32b8b2d07b1c4327593a4a70993eeac2.png",
		    "soldOut": false,
		    "sortFlag": 0,
		    "commentCount": 0,
		    "onSaleTime": 1538101896296,
		    "picMode": 1,
		    "commentWithPicCount": 0,
		    "underShelf": false,
		    "status": 2,
		    "couponConflict": true,
		    "forbiddenBuy": false,
		    "promotionDesc": "暖冬特惠",
		    "limitedFlag": 204,
		    "pieceNum": 0,
		    "itemSizeTableDetailFlag": false,
		    "forbidExclusiveCal": false,
		    "rewardShareFlag": false,
		    "updateTime": 1575894115275,
		    "showCommentEntrance": true,
		    "pieceUnitDesc": "件",
		    "specialPromTag": "",
		    "counterPrice": 299,
		    "categoryL2Id": 0,
		    "retailPrice": 209,
		    "primarySkuPreSellPrice": 0,
		    "preLimitFlag": 0,
		    "itemPromValid": true,
		    "promTag": "暖冬特惠",
		    "source": 0,
		    "points": 0,
		    "primarySkuPreSellStatus": 0,
		    "extraServiceFlag": 0,
		    "flashPageLink": "",
		    "autoOnsaleTimeLeft": 0,
		    "innerData": {},
		    "saleCenterSkuId": 0,
		    "pointsStatus": 0,
		    "extraPrice": "",
		    "colorNum": 0,
		    "showTime": 0,
		    "autoOnsaleTime": 0,
		    "preemptionStatus": 1,
		    "isPreemption": 0,
		    "zcSearchFlag": false,
		    "name": "女式色拉姆内衣套装2.0",
		    "appExclusiveFlag": false,
		    "itemType": 1,
		    "listPicUrl": "https://yanxuan-item.nosdn.127.net/02b61fb5700aed6761b7524d98ed0837.png",
		    "pointsPrice": 0,
		    "simpleDesc": "色拉姆发热面料，加厚升级",
		    "seoTitle": "",
		    "newItemFlag": false,
		    "buttonType": 0,
		    "primarySkuId": 1634105,
		    "displaySkuId": 1634104,
		    "productPlace": "",
		    "itemSizeTableFlag": false
		}
	]
};


// /pages/shopCart/shopCart.vue
<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			
		},
		computed:{
			...mapState({
				shopCartList: state => state.shopCart.shopCartList
			}),
		}
	}
</script>
```
## 添加购物车的操作
```js
// store/module/shopcart
const mutations = {
	ADD_SHOPCART(state,shopCart){
		state.shopCartList.push(shopCart)
	}
};
// detail.vue
computed:{
	...mapState({
		shopCartList: state => state.shopCart.shopCartList
	})
},
methods:{
	addShopCart(){
		// 判断购物车列表中，有没有当前添加的这个商品详情页数据
		// 有就添加数据 没有就push一个数据
		let obj = this.shopCartList.find(item => item.id === this.goodsInfo.id)
		if(obj){
			// 代表购物车当中已存在， 我只需要改变数量和状态
			obj.isChecked = true
			obj.count += 1
		}else{
			obj = this.goodsInfo
			// 数组响应式
			this.$set(obj,'isChecked',true)
			this.$set(obj,'count',1)
			this.$store.commit('ADD_SHOPCART', obj);
		}
	}
}	
```