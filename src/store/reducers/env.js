import { handleActions } from 'redux-actions'
import immutable from 'seamless-immutable'
import * as types from '../types/env'
import {MAX_STORAGE_NUMBER} from '../../config/app'

try {
  var res = wx.getSystemInfoSync()
} catch (e) {
  // Do something when catch error
}
// 初始state
export const INITIAL_STATE = immutable({
    wxUserInfo: {
        nickName: '',
        avatarUrl: ''
    },
    menuStatus: 'close',
    system: res,
    history:[] //该history 是方便查看本地历史用的，暂时不 有timestamp, url, session: {minX,minY, maxX,maxY},result

})

export default handleActions({
  [types.SAVE_WX_USERINFO]: (state, data) => {
      let wxUserInfo = Object.assign({}, state.userInfo, data.payload);
      return state.merge({wxUserInfo});
  }
}, INITIAL_STATE)
