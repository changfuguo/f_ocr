import { createAction } from 'redux-actions'
import { getStore } from 'labrador-redux'
import {http} from '../../api';

import * as types from '../types/env'

import {WX_LOGIN_URL, 
    WX_CHECK_SESSION_STATUS_URL,
}  from '../../config/app';
import {LOGIN_STATUS} from '../../config/app';

export const saveWxUserInfo = createAction(types.SAVE_WX_USERINFO);

export const saveWxUserInfoAction = createAction(types.SAVE_WX_USERINFO_ACTION, (user) => {
    let {dispatch} = getStore();
    dispatch(saveWxUserInfo(user));
});

export const loginAction = createAction(types.SEND_LOGIN_ACTION, (code, success, fail) => {
    let {dispatch, getState} = getStore();
    let state = getState();
    let {   nickName, avatarUrl, gender} = state.env.wxUserInfo;
    let setSessionAction = createAction(types.SET_SESSIONID_REDUCER);

    console.log('WX_LOGIN_URL:' +WX_LOGIN_URL);
    return http.commonRequest(
            'POST',
            WX_LOGIN_URL,
            {
                code,
                nickName,
                avatarUrl,
                gender
            },
            (data) => {
                debugger;
                if (data.errno == 0){
                    success && success(data.data);
                    console.log(data);
                    // 如果有错误，则设置成空下次进来的话再请求
                    let {sessionid, is_push_result} = data.data;
                    dispatch(setSessionAction({sessionid, is_push_result}));
                } else {
                    fail && fail(data.errmsg);
                }
            },
            (res) => {
                fail && fail(res);
            }
        )
})

export const checkExpiresAction = createAction(types.CHECK_EXPIRES_ACTION, () => {
    let sessionid = wx.getStorageSync('sessionid');
    return new Promise((resolve, reject) => {
        if (!sessionid) {
            return resolve(LOGIN_STATUS.SESSION_IS_EMPTY);
        }

        http.commonRequest('POST', WX_CHECK_SESSION_STATUS_URL, {
            sessionid
        }, (data) => {
            if(data.errno == 0) {
                resolve(data.status);
            } else {
                resolve(LOGIN_STATUS.SESSION_IS_EMPTY);
            }
        }, (res) => {
            reject(LOGIN_STATUS.SESSION_IS_EMPTY);
        })
    })
})
