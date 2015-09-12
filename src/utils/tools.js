var IMAGE_BASE_URL = "http://7xkvcu.com1.z0.glb.clouddn.com/";



var WECHAT_RE = "http://mp.weixin.qq.com/mp/redirect?url=",
    APP_ORIGINAL = "https%3A%2F%2Fitunes.apple.com%2Fcn%2Fapp%2Fkizz%2Fid1031704971%3Fl%3Dzh%26ls%3D1%26mt%3D8",
    APP_URL_HUMAN = "https://itunes.apple.com/cn/app/kizz/id1031704971?l=zh&ls=1&mt=8";

var tools = {
  get_image_url: function(img, type) {
    return IMAGE_BASE_URL + img + ((type === 2) ? "?vframe/png/offset/1" : "");
  },
  APP_URL: WECHAT_RE + APP_ORIGINAL
}

module.exports = tools;