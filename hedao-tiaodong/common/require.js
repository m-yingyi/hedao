import API from './api';

// 需要登录的，都写到这里，否则就是不需要登录的接口
const methodsToken = []

// const baseUrl = 'https://api.hedaoapp.com/api';
const baseUrl = 'https://testapi.hedaoapp.com/api';
const tokenHead = 'Bearer ';

const post = (url, data, callback) => {
	let token = uni.getStorageSync('token') || '';
	uni.request({
		url: baseUrl + url,
		data,
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': tokenHead + token,
			// 'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
		},
		method: 'POST',
		success: (res) => {
			console.log(res)
			if (res.statusCode == 200) {
				callback(res.data);
			} else {
				if (res.statusCode == 401) {
					uni.showToast({
						title: '请登录',
						duration: 3000,
						icon: 'none',
						complete() {
							uni.clearStorage();
							uni.switchTab({
								url: '../../pages/mine/index'
							})
						}
					});
					
					return;
				}
			}

		},
		fail:(err)=>{
			
		}
	})

}
const put = (url, data, callback) => {
	let token = uni.getStorageSync('token') || '';
	uni.request({
		url: baseUrl + url,
		data,
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': tokenHead + token,
			// 'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
		},
		method: 'PUT',
		success: (res) => {
			console.log(res)
			if (res.statusCode == 200) {
				callback(res.data);
			} else {
				if (res.statusCode == 401) {
					uni.showToast({
						title: '请登录',
						duration: 3000,
						icon: 'none',
						complete() {
							uni.clearStorage();
							uni.switchTab({
								url: '../../pages/mine/index'
							})
						}
					});
					
					return;
				}
			}

		},
		fail:(err)=>{
			
		}
	})

}

const get = (url, data, callback) => {
	uni.showLoading({
		title: '加载中'
	});
	let token = uni.getStorageSync('token') || '';
	uni.request({
		url: baseUrl + url,
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
			'Authorization': tokenHead + token,
		},
		method: 'GET',
		data,
		success: (response) => {
			if (response.statusCode == 401) {
				uni.showToast({
					title: '请登录',
					duration: 3000,
					icon: 'none',
					complete() {
						uni.clearStorage();
						uni.switchTab({
							url: '../../pages/mine/index'
						})
						// uni.reLaunch({
						// 	url: '../../pages/mine/index'
						// })
					}
				});
				
				return;
			}
			uni.hideLoading();
			callback(response.data);
		},
		fail: (error) => {
			uni.hideLoading();
			if (error && error.response) {
				showError(error.response);
			}
		},
		complete: () => {
			setTimeout(function() {
				uni.hideLoading();
			}, 250);
		}
	});
}

export default {
	get,
	post,
	put,
}

