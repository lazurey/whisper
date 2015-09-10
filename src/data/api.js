'use strict';

var BASE_URL = 'http://kz-api.devapps.cn';
var BASE_AUTH_KEY = 'tbMG2VEO5sBLFpmZ/7snYsx0uzYHPRFNlRtLHNCThsz6ytXXrqE06klNx28phvCM7Wq5ui7wLElYT0XrucpxWhtZCY+8dzAjc9aGEBpabsA=';

var _ = require('lodash');
var request = require('superagent');
var prefix = require('superagent-prefix')(BASE_URL);

function urlencode(query) {
  return '?' + _.map(query, function (v, k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(v);
    }).join('&');
}

function endPoint(path, mode, useDefaults) {
  mode = (mode) ? mode.toUpperCase() : 'GET';
  useDefaults = _.isUndefined(useDefaults) ? true : useDefaults;

  var defaults = {
  };


  function fetch(query, headers) {
    headers = headers || {'X-DevComs-Auth': BASE_AUTH_KEY};

    var req = prefix(request(mode, path));

    // form GET request
    if (mode === 'GET') {
      var q = useDefaults ? _.defaults({}, query, defaults) : query;
      req.query(q)
        .set(headers)
        .send();
    }
    // form POST request
    else if (mode === 'POST') {
      req.query(defaults)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(query);
    }

    return new Promise(function (fulfill, reject) {
      req.end(function (error, res) {
        if (error) {
          reject({
            status: res.status,
            msg: res.body.error
          });
        } else {
          fulfill({
            meta: res.body.meta || {},
            objects: _.isArray(res.body) ?
              res.body :
            res.body.objects || _.omit(res.body, 'meta')
          });
        }
      });
    });
  }

  fetch.toString = function (query) {
    return BASE_URL + urlencode(_.defaults({}, query, defaults));
  };

  return fetch;
}

module.exports = {
  // BASIC GET REQUESTS //
  hot_pics: endPoint('/picture/home', 'get')

};