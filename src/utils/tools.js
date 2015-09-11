var IMAGE_BASE_URL = "http://7xkvcu.com1.z0.glb.clouddn.com/";

var tools = {
  get_image_url: function(img, type) {
    return IMAGE_BASE_URL + img + ((type === 2) ? "?vframe/png/offset/1" : "");
  }
}

module.exports = tools;