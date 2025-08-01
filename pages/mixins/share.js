import config from "../../config";

export default {
  onShareAppMessage: () => {
    const promise = new Promise(resolve => {
      const res = uni.getStorageSync('userInfo')
      if (res) {
        try {
          const {userId} = JSON.parse(res)
          resolve({ 
            path: `pages/login/login?id=${userId}`,
            title: config.name,
          })
        } catch (error) {
          resolve({ 
            path: `pages/login/login`,
            title: config.name,
          })
        }
      } else {
        resolve({
          path: `pages/login/login`,
          title: config.name,
        })
      }
    })
    return {
      path: 'pages/login/login?id=1',
      title: config.name,
      promise
    }
  }
}