import config from "../../config";

export default {
  onShareAppMessage: () => {
    const promise = new Promise(resolve => {
      resolve({ 
        path: `pages/login/index`,
        title: config.name,
      })
    })
    return {
      path: 'pages/login/index',
      title: config.name,
      promise
    }
  }
}