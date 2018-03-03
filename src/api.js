import { getStore } from 'labrador-redux'

export const WX_APPID = 'wx3de0a24b27759e47';
// export const debug = process.env.NODE_ENV !== 'production'
export const debug = false
export const VERSION = '1.0.0'

const commonParams = {
  appversion: VERSION,
  // datatype: 'miniapp'
}
// 添加一些公共参数
function wrapParams(params) {
  params.channel = getStore().getState().channel
  return params
}

const ts = function () {
  return '?ts=' + new Date().getTime()
}
const fullUrlReg = /^(https:\/\/|\http:\/\/||\/\/)/;
const BASE_URL = 'https://www.febody.com/admin/';
const OCR_URL = BASE_URL + 'ocr/';
export const http = {
  commonRequest (method, url, data = {}, noCache) {
    
    return wx.request({
            url: noCache ? url : (url + ts()),
            data: {
                ...wrapParams(data),
                ...commonParams
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            method,
            dataType: 'json'
        })
    },
    get (url, data, noCache) {
        return http.commonRequest('GET', url, data, noCache)
    },
    post (url, data, noCache) {
        return http.commonRequest('POST', url, data, noCache)
    },
    OcrRequest(method, url, data = {} , noCache) {
        if (!fullUrlReg.test(url)) {
            url = url.replace(/^(\.\/|\/)/,'');
        }
        url = OCR_URL + url;
        return http.commonRequest(method, url, data, noCache)
    }
}
