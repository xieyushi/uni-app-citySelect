<template>
	<view>
		<view class="input">
			<input placeholder="输入城市名或拼音查询" placeholder-style="font-size: 13px" :value="inputName" @input="bindKeyInput" @blur="bindBlur" />
		</view>

		<view class="container-inner">
			<view class="searchLetter touchClass">
				<view class="thishotText" @click="hotCity">
					<view style="margin-top:0;">当前</view>
					<view style="margin-top:0;">热门</view>
				</view>
				<view v-for="(item, idx) in searchLetter" :key="idx" style="color:#8BC34A;font-size:20upx;" :data-letter="item.name"
				 @click="clickLetter">
					{{ item.name }}
				</view>
			</view>

			<view class="container">

				<view v-if="isShowLetter">
					<view class="showSlectedLetter">
						{{ toastShowLetter }}
					</view>
				</view>

				<scroll-view scroll-y="true" v-bind:style="{height: winHeight + 'px'}" :scroll-into-view="scrollTopId">
					<view class="ul" id="completelist">
						<view class="li" v-for="(item, idx) in completeList" :key="idx" :data-city="item.city" :data-code="item.code"
						 @click="bindCity">
							{{ item.city }}
						</view>
					</view>


					<view class="selectCity">
						<view class="hotcity-common" @click="reGetLocation" id="currentcity">重新定位城市</view>
						<view class="thisCityName" @click="bindCity" :data-code="currentCityCode" :data-city="currentCity">{{ currentCity }}</view>

						<view class="hotcity-common">热门城市</view>
						<view class="weui-grids">
							<view class="weui-grid" :data-code="110000" data-city="北京市" @click="bindCity">
								<view class="weui-grid__label">北京市</view>
							</view>
							<view class="weui-grid" :data-code="310000" data-city="上海市" @click="bindCity">
								<view class="weui-grid__label">上海市</view>
							</view>
							<view class="weui-grid" :data-code="440100" data-city="广州市" @click="bindCity">
								<view class="weui-grid__label">广州市</view>
							</view>
						</view>
						<view class="weui-grids">
							<view class="weui-grid" :data-code="440300" data-city="深圳市" @click="bindCity">
								<view class="weui-grid__label">深圳市</view>
							</view>
							<view class="weui-grid" :data-code="330100" data-city="杭州市" @click="bindCity">
								<view class="weui-grid__label">杭州市</view>
							</view>
							<view class="weui-grid" :data-code="320100" data-city="南京市" @click="bindCity">
								<view class="weui-grid__label">南京市</view>
							</view>
						</view>
						<view class="weui-grids">
							<view class="weui-grid" :data-code="420100" data-city="武汉市" @click="bindCity">
								<view class="weui-grid__label">武汉市</view>
							</view>
							<view class="weui-grid" :data-code="120000" data-city="天津市" @click="bindCity">
								<view class="weui-grid__label">天津市</view>
							</view>
							<view class="weui-grid" :data-code="610100" data-city="西安市" @click="bindCity">
								<view class="weui-grid__label">西安市</view>
							</view>
						</view>
					</view>

					<view class="selection" v-for="(item, idx) in cityList" :key="idx">
						<view class="item_letter" :id="item.initial">{{ item.initial }}</view>
						<view class="item_city" v-for="(cityItem, index) in item.cityInfo" :key="index" :data-code="cityItem.code"
						 :data-city="cityItem.city" @click="bindCity">
							{{cityItem.city}}
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import city from '../../common/city.js';
	export default {
		data() {
			return {
				searchLetter: [],
				showLetter: '',
				winHeight: 0,
				cityList: [],
				isShowLetter: false,
				// 置顶id
				scrollTopId: '',
				hotcityList: [],
				inputName: '',
				completeList: [],
				condition: false,
				detailAddress: '',
				toastShowLetter: '',
				currentCity: ''
			};
		},
		onLoad() {

			console.log(city);
			const searchLetter = city.searchLetter;
			const cityList = city.cityList();
			const sysInfo = uni.getSystemInfoSync();
			console.log(sysInfo);
			const winHeight = sysInfo.windowHeight;
			const itemH = winHeight / searchLetter.length;
			let tempArr = [];

			searchLetter.map(
				(item, index) => {
					let temp = {};
					temp.name = item;
					temp.tHeight = index * itemH;
					temp.bHeight = (index + 1) * itemH;
					tempArr.push(temp);
				}
			);

			this.winHeight = winHeight;
			this.itemH = itemH;
			this.searchLetter = tempArr;
			this.cityList = cityList;
			this.getLocation();
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
								console.log(data.data.result.address_component);
								this.currentCity = data.data.result.address_component.city;
							}
						});
					}
				});
			},
			clickLetter(e) {
				const showLetter = e.currentTarget.dataset.letter;
				this.toastShowLetter = showLetter;
				this.isShowLetter = true;
				this.scrollTopId = showLetter;

				const self = this;
				setTimeout(() => {
					self.isShowLetter = false;
				}, 500);
			},
			reGetLocation() {
				this.getLocation();
			},
			// 选择城市
			bindCity(e) {
				this.condition = true;
				//缓存选择的城市
				uni.setStorageSync('selectCity', e.currentTarget.dataset.city);
				uni.navigateBack({
					delta: 1
				});
			},
			hotCity() {
				this.scrollTopId = 'currentcity';
			},
			bindScroll(e) {
				console.log(e.detail);
			},
			bindBlur(e) {
				this.inputName = '';
			},
			bindKeyInput(e) {
				this.inputName = e.mp.detail.value;
				// 空搜索框时 取消匹配显示
				if (this.inputName.length < 1) {
					this.completeList = [];
				}
				this.scrollTopId = 'completelist';
				this.auto();
			},
			auto() {
				let inputSd = this.inputName.trim();
				let sd = inputSd.toLowerCase();
				let num = sd.length;
				const cityList = city.cityObjs;
				let finalCityList = [];

				let temp = cityList.filter(
					item => {
						let text = item.short.slice(0, num).toLowerCase();
						// eslint-disable-next-line
						return (text && text == sd);
					}
				);

				// 在城市数据中，添加简拼到“shorter”属性，就可以实现简拼搜索
				let tempShorter = cityList.filter(
					itemShorter => {
						if (itemShorter.shorter) {
							let textShorter = itemShorter.shorter.slice(0, num).toLowerCase();
							// eslint-disable-next-line
							return (textShorter && textShorter == sd);
						}
					}
				);

				let tempChinese = cityList.filter(
					itemChinese => {
						let textChinese = itemChinese.city.slice(0, num);
						// eslint-disable-next-line
						return (textChinese && textChinese == sd);
					}
				);

				if (temp[0]) {
					temp.map(
						item => {
							let testObj = {};
							testObj.city = item.city;
							testObj.code = item.code;
							finalCityList.push(testObj);
						}
					);
					this.completeList = finalCityList;
				} else if (tempShorter[0]) {
					tempShorter.map(
						item => {
							let testObj = {};
							testObj.city = item.city;
							testObj.code = item.code;
							finalCityList.push(testObj);
						}
					);
					this.completeList = finalCityList;
				} else if (tempChinese[0]) {
					tempChinese.map(
						item => {
							let testObj = {};
							testObj.city = item.city;
							testObj.code = item.code;
							finalCityList.push(testObj);
						}
					);
					this.completeList = finalCityList;
				}
			}
		}
	};
</script>

<style>
	.container-inner {
		display: flex;
		flex-direction: row-reverse;
	}

	.container {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		padding: 10upx;

	}

	input {
		text-align: center;
		font-size: 32upx;
		padding: 5px;
	}

	.searchLetter {
		flex-shrink: 0;
		width: 80upx;
		text-align: center;
		display: flex;
		flex-direction: column;
		color: #666;
	}

	.searchLetter view {
		margin-top: 10upx;
	}

	.touchClass {
		background-color: #fff;
		color: #fff;
		padding-top: 16upx;
		padding-bottom: 16upx;
	}

	.showSlectedLetter {
		background-color: rgba(0, 0, 0, 0.5);
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 50%;
		left: 50%;
		margin: -100upx;
		width: 200upx;
		height: 200upx;
		border-radius: 20upx;
		font-size: 52upx;
		z-index: 1;
	}

	.selection {
		display: flex;
		width: 100%;
		flex-direction: column;
		margin-top: 10upx;
	}

	.selectCity {
		padding: 16upx;
		background-color: #f5f5f5;
		margin-bottom: -10upx;
	}

	.item_letter {
		display: flex;
		background-color: #f5f5f5;
		height: 40upx;
		padding-left: 34upx;
		align-items: center;
		font-size: 24upx;
		color: #666;
	}

	.item_city {
		display: flex;
		background-color: #fff;
		height: 100upx;
		padding-left: 34upx;
		align-items: center;
		border-bottom: 1upx solid #ededed;
		font-size: 24upx;
		color: #666;
	}

	.hotcity-common {
		font-size: 24upx;
		color: #666;
		padding-bottom: 0;
		margin: 8upx 0;
		margin-left: 16upx;
	}

	.hotcity {
		padding-right: 50upx;
		margin: auto;
	}

	.thisCityName {
		display: inline-block;
		border: 1upx solid #8BC34A;
		border-radius: 8upx;
		padding: 10upx 0;
		font-size: 24upx;
		color: #8BC34A;
		text-align: center;
		min-width: 149.5upx;
		margin: 16upx 0;
	}

	.thishotText {
		color: #8BC34A;
		font-size: 20upx;
		margin: 0 !important;
	}

	.slectCity {
		border-color: #8BC34A !important;
	}

	.slectCity view {
		color: #8BC34A !important;
	}

	.weui-grid {
		padding: 10upx 0;
		width: 200upx;
		box-sizing: border-box;
		border: 1upx solid #ececec;
		border-radius: 8upx;
		background-color: white;
		margin: 8upx 0;
	}

	.weui-grids {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border: none;
	}

	.weui-grid__label {
		display: block;
		text-align: center;
		color: #333;
		font-size: 24upx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.ul {
		display: block;
		color: grey;
		margin-left: 20upx;
	}

	.li {
		display: block;
		font-weight: 100;
		font-size: 28upx;
		padding: 16upx 0;
	}

	input {
		background-color: #eee;
	}

	.input {
		padding: 16upx;
		border-bottom: 1upx solid #f1f1f1;
	}

	.county {
		display: flex;
		flex-wrap: wrap;
	}

	view {
		display: block;
	}
</style>
