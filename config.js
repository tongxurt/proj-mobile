const host = "https://y.veogo.cn" 
const name = ''

/**
 * 时间戳转换为可读时间格式
 * @param {number} timestamp - 时间戳（秒或毫秒）
 * @returns {string} 格式化后的时间字符串 YYYY-MM-DD HH:mm:SS
 */
const formatTimestamp = (timestamp) => {
  if (!timestamp) return ''
  // 判断是否为毫秒时间戳（13位），如果是秒时间戳（10位）则转换为毫秒
  const time = timestamp.toString().length === 13 ? timestamp : timestamp * 1000
  
  const date = new Date(time)
  
  // 获取各个时间部分
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export default {
  host,
  name,
  formatTimestamp,
}
