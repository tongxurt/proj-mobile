import config from "./config";

async function request({
  url,
  method,
  data,
  header,
}) {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync('token')
    const newHeader = {
      Authorization: token,
      'content-type': 'application/json'
    }
    uni.request({
      url: `${config.host}${url}`,
      method,
      data,
      header: header || newHeader,
      success: async (res) => {
        resolve(res.data)
      },
      fail: res => {
        reject(res)
      }
    })
  })
}
export default request


function parseUrlParams(url) {
  // 找到 '?' 后面的部分
  const queryString = url.split('?')[1];
  if (!queryString) {
      return {};
  }

  // 分割参数
  const params = queryString.split('&');
  const paramsObj = {};

  // 遍历参数并添加到对象
  params.forEach(param => {
      const [key, value] = param.split('=');
      if (key) {
          // 解码 URI 组件并添加到对象
          paramsObj[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
      }
  });

  return paramsObj;
}