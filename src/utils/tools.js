const IMAGE_BASE_URL = "http://7xkvcu.com1.z0.glb.clouddn.com/",
    WECHAT_RE = "http://mp.weixin.qq.com/mp/redirect?url=",
    APP_ORIGINAL = "https%3A%2F%2Fitunes.apple.com%2Fcn%2Fapp%2Fkizz%2Fid1031704971%3Fl%3Dzh%26ls%3D1%26mt%3D8",
    APP_URL_HUMAN = "https://itunes.apple.com/cn/app/kizz/id1031704971?l=zh&ls=1&mt=8";

const tools = {
  get_image_url: function(img, type) {
    return IMAGE_BASE_URL + img + ((type === 2) ? "?vframe/png/offset/1" : "");
  },

  update_wx_title: function(title) {
    let body = document.getElementsByTagName('body')[0];
    document.title = title;
    let iframe = document.createElement("iframe");
    iframe.setAttribute("src", "/assets/images/loading.gif");
    
    iframe.addEventListener('load', function() {
      setTimeout(function() {
        iframe.removeEventListener('load');
        document.body.removeChild(iframe);
      }, 10);
    });
    document.body.appendChild(iframe);
  },

  is_wechat: function() {
    let ua = window.navigator.userAgent.toLowerCase();
    return (ua.match(/MicroMessenger/i) == 'micromessenger');
  },

  getGender: function(code) {
    let gender_arr = ["未知", "男", "女"];
    return (gender_arr[code] || "未知");
  },

  APP_URL: APP_URL_HUMAN,

  APP_SLOGAN: "粑粑麻麻你们别输在起跑线上哟 发自KIZZ APP"
}

module.exports = tools;