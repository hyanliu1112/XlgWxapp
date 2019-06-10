const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 封装微信的request
const request=({url,data={},method='Get'})=>{

  return new Promise((resolve,reject)=>{

    wx.request({
      url: 'https://api.xiaoletgou.com/lite/wx/'+url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'X-Litemall-Token': wx.getStorageSync('token')
      },
      success: function (res) {

        if (res.statusCode == 200) {
         
          resolve(res.data.data);
          
        } else {
          reject(res.data);
        }

      },
      fail: function (err) {
        reject(err)
      }
    
    })
  })
}

module.exports = {
  formatTime: formatTime,
  request: request
}
