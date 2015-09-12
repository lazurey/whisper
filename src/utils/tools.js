var IMAGE_BASE_URL = "http://7xkvcu.com1.z0.glb.clouddn.com/";



var WECHAT_RE = "http://mp.weixin.qq.com/mp/redirect?url=",
    APP_ORIGINAL = "https%3A%2F%2Fitunes.apple.com%2Fcn%2Fapp%2Fkizz%2Fid1031704971%3Fl%3Dzh%26ls%3D1%26mt%3D8",
    APP_URL_HUMAN = "https://itunes.apple.com/cn/app/kizz/id1031704971?l=zh&ls=1&mt=8";

var tools = {
  get_image_url: function(img, type) {
    return IMAGE_BASE_URL + img + ((type === 2) ? "?vframe/png/offset/1" : "");
  },
  update_wx_title: function(title) {
    // 这个太黑魔法了
    // var $body = $('body')
    // document.title = ‘title’
    // // hack在微信等webview中无法修改document.title的情况
    // var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
    //   setTimeout(function() {
    //     $iframe.off('load').remove()
    //   }, 0)
    // }).appendTo($body)
    console.log("updating");
    var body = document.getElementsByTagName('body')[0];
    document.title = title;
    var iframe = document.createElement("iframe");
    iframe.setAttribute("src", "/assets/images/loading.gif");
    
    iframe.addEventListener('load', function() {
      setTimeout(function() {
        iframe.removeEventListener('load');
        document.body.removeChild(iframe);
      }, 10);
    });

    document.body.appendChild(iframe);
  },
  APP_URL: WECHAT_RE + APP_ORIGINAL
}

module.exports = tools;