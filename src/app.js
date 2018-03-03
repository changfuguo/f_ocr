import { setStore } from 'labrador-redux';
import { authorize } from './utils/utils';
import store from './store';
import {http} from './api';
import * as envAction from './store/actions/env';



if (__DEV__) {
  console.log('当前为开发环境');
}

// 向labrador-redux注册store
setStore(store);
export default class {
    async onLaunch() {
    }
    getWXUser() {
        return new Promise((resolve, reject) => {
            wx.getUserInfo({
                complete: function(res) {
                    let errMsg = res.errMsg;
                     if (errMsg == "getUserInfo:ok") {
                        var userInfo = res.userInfo;
                        var nickName = userInfo.nickName;
                        var avatarUrl = userInfo.avatarUrl;
                        var gender = userInfo.gender //性别 0：未知、1：男、2：女
                        var province = userInfo.province
                        var city = userInfo.city
                        envAction.saveWxUserInfoAction({nickName, avatarUrl, gender, city, province});
                        resolve('')
                     } else {
                        reject('')
                     }
                }
            })
        })

    }

    checkSession(){
        return new Promise((resolve, reject) => {
            wx.checkSession({
                success: function(){
                    resolve(false);
                },
                fail: function(){
                    resolve(true);
                }
            })
        })
    }

    wxLogin() {
        return new Promise((resolve, reject) => {
            wx.login({
                success: (res) => {
                    resolve(res.code);
                },
                fail:(err) => {
                    reject(err);
                }
            })
        })
    }
    async onShow(){
        
        try{
            await this.getWXUser();
        }catch(e) {
            wx.showModal({
                title: '提示',
                content: '授权失败，可能影响后续数据保存',
            })
        }
        try{

            let status = await envAction.checkExpiresAction();
            console.log('status:' + status);
            if (status | 7) {
                let code = await this.wxLogin();
                envAction.loginAction(code, (res) => {
                    wx.hideLoading();
                }, (res) => {
                    wx.hideLoading();
                });
            }
        }
        catch(e) {
        }
    }
}
