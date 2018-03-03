
export function authorize(scope){
    return new Promise((resolve, reject) => {
          wx.getSetting({
            success(res) {
                if (!res.authSetting[scope]) {
                    wx.authorize({
                        scope: scope,
                        success(err) {
                            resolve('')
                        },
                        fail(err) {
                            reject('')
                        }
                    })
                }
            }
        })
    });
}