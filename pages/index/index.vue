<template>
	<view class="content">
		<view class="location" @tap="selectCityPage">
			<text class="city">{{selectCity}}</text>
			<button >选择城市</button>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {selectCity:''}
		},
		onLoad() {
			//判断城市数据,如果没有,就重新请求一次.
			if (this.selectCity) {} else {
				this.getLocation();
			}
			//抓取活动

		},
		onShow() {
			const selectCity = uni.getStorageSync('selectCity');
			if(selectCity){
				this.selectCity = selectCity;
			}
		},
		methods: {
			getLocation() {
				uni.getLocation({
					type: 'wgs84',
					success: res => {
						console.log(res);
						let latitude = res.latitude;
						let longitude = res.longitude;
						uni.request({
							url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude +
								'&key=UGMBZ-S5AKU-YQGV3-47M5J-BAQ62-ZBBJW',
							success: data => {
								console.log(data);
								this.selectCity = data.data.result.address_component.city;
							}
						});
					}
				});
			},
			selectCityPage() {
				uni.navigateTo({
					url: "../cityselect/cityselect"
				})
			}

		}
	}
</script>

<style>
	.city {
		line-height: 44upx;
		font-size: 32upx;
		text-align: center;
		width: auto;
		margin-right: 100upx;
		margin-left: 100upx;
	}
	.location{
		display: flex;
		align-items: center;
	}
</style>
