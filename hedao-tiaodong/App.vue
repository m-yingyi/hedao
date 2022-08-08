<script>
	export default {
		onLaunch: function() {
		    // uni.getSystemInfo({
		    //     success:function(e){
		    //         Vue.prototype.statusBar = e.statusBarHeight
		    //  
		    //         if(e.platform == 'android') {
		    //             Vue.prototype.customBar = e.statusBarHeight + 50
		    //         }else {
		    //             Vue.prototype.customBar = e.statusBarHeight + 45
		    //         }
		    //     }
		    // })
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, textarea, p, blockquote, th, td, hr, button, article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section, sumary {
	    margin: 0;
	    padding: 0;
	}
	a, a:link, a:visited, a:hover, a:active , a:focus {
	    text-decoration: none;
	}
	input, select, textarea {
	    -webkit-appearance: none;
	}
	ol, ul {
	    list-style: none;
	}
	.txtgray {
	    color: #999;
	    font-weight: normal;
	}
	.flex {
		display: flex;
	}
	.align-center{
		align-items: center;
	}
	.justify-between{
		justify-content: space-between;
	}
	.justify-center{
		justify-content: center;
	}
	.theme-color{
		color: #37a2f2 !important;
	}
	.theme-bg-color {
		background-color: #37a2f2 !important;
		color: white !important;
	}
	.no-data {
		font-size: 28upx;
		color: #999999;
		text-align: center;
		padding: 88upx 0;
	}
	.bg-white {
		background-color: #fff !important;
	}
</style>
