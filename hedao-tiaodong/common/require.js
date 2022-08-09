import API from './api';

// 需要登录的，都写到这里，否则就是不需要登录的接口
const methodsToken = []

const baseUrl = 'http://api.hedaoapp.com/api';

const post = (url, data, callback) => {
	let token = uni.getStorageSync('token') || '';
	uni.request({
		url: baseUrl + url,
		data,
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': token,
			// 'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
		},
		method: 'POST',
		success: (res) => {
			console.log(res)
			if (res.statusCode == 200) {
				callback(res.data);
			}
		},
		fail:(err)=>{
			
		}
	})

}

const get = (url, callback) => {
	uni.showLoading({
		title: '加载中'
	});
	let token = uni.getStorageSync('token') || '';
	uni.request({
		url: url,
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
			'Authorization': token,
		},
		method: 'GET',
		success: (response) => {
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
}

