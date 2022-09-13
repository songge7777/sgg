# uniapp
[[toc]]

## 购物车的修改
-	计算总价
```html
<text class="totalPrice">合计: {{allMoney}}</text>
<script>
allMoney(){
	return this.shopCartList.reduce((prev,item)=>{
		if(item.isChecked){
			prev += item.counterPrice * item.count
		}
		return prev
	},0)
},
</script>
```
- 计算选中商品的数量
```html
<text class="allSelected">已选 {{checkedNum}}</text>
<script>
checkedNum(){
	return this.shopCartList.reduce((prev,item)=>{
		if(item.isChecked){
			prev += item.count
		}
		return prev
	},0)
}
</script>
```
-	计算全选状态
```html
<text class='iconfont icon-xuanzhong' :class="isCheckAll && 'selected'"></text>
<script>
isCheckAll(){
	return this.shopCartList.every(item => item.isChecked) && this.shopCartList.length > 0
}
</script>
```
##	修改数量 当减少数量的时候,如果减少到0,要弹出模态框,确定需要删除购物车
```html
<view class="countCtrl">
	<text class="add" @click="changeNum(item,'add')"> + </text>
	<text class="count">{{item.count}}</text>
	<text class="del" @click="changeNum(item,'del', index)"> - </text>
</view>
<script>
methods:{
	changeNum(cart,type,index){
			if(type === 'add'){
				cart.count ++
			} else {
				if(cart.count > 1){
					cart.count --;
				} else {
					wx.showModal({
						title: `你确定要删除${cart.name}吗`,
						success: (res) => {
							if(res.confirm){
								// 用户点击了确定按钮
								this.$store.commit('DELE_SHOPCART',index)
							}
						} 
					})
				}
			}
	}
}
</script>

<!-- store/shopcart.js -->
<script>
const mutations = {
	DELE_SHOPCART(state,index){
		state.shopCartList.splice(index,1)
	}
};
</script>
```
-	修改单个状态
-	修改多个状态
```html
			<text class='iconfont icon-xuanzhong' :class="isCheckAll && 'selected'" @click="changeIsCheckAll"></text>
<script>
methods:{
	// 修改全选或者全不选
	changeIsCheckAll(){
		let currentFlag = !this.isCheckAll
		this.shopCartList.forEach(item => {
			if(item.isChecked === currentFlag) return
			item.isChecked = currentFlag
		})
	}
}
</script>

```
