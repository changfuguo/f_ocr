export const OCR_REQUEST_HOST  = __DEV__? 'http://127.0.0.1:8360' : 'https://www.febody.com';


export const WX_LOGIN_URL = OCR_REQUEST_HOST + '/user/login';
export const WX_CHECK_SESSION_STATUS_URL = OCR_REQUEST_HOST + '/user/isExpire';



export const MAX_IMAGE_SIZE = 3 * 1024 * 1024;


export const BUTTOM_TABBAR_HEIGHT = 50;

export const MAX_STORAGE_NUMBER = 10;


export const SELECT_IMAGE_ERROR = {
    CANCEL_SELECT_ERROR: '取消选择图片',
    EXCEED_ULTRALIMIT_ERROR: '图片大小超过3M限制',
    EXCEED_SIZE_ERROR: '图片宽度最小为15px，最大为4096px',
    GET_IMAGEINFO_ERROR: '获取图片信息失败',
    UNKOWN_ERROR: '位置错误，请重试'
}
export const LOGIN_STATUS = {
    SESSION_IS_EMPTY: 1,
    SESSION_IS_NOEXIST: 2,
    SESSION_IS_EXPIRES: 4,
    SESSION_IS_VALIDATEE: 8
}
