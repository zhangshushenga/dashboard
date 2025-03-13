// 用户名称显示规则
/**
 *
 * @param {*} userName 用户名称
 *
 中文：头像上显示账户名称的最后两个字
 字母：
 没有空格的情况下，显示前一个字母大写
 有空格的情况下，显示前两个单词的首字母大写
 */
export function userNameRule(userName) {
  // console.log(userName)
  if (isChinese(userName)) {
    return userName.substring(userName.length - 2, userName.length)
  }

  if (isLetter(userName) || isHaveSpace(userName)) {
    if (!isHaveSpace(userName)) {
      return userName.substring(0, 1).toUpperCase()
    } else {
      const arr = userName.trim().split(' ')
      return arr[0].substring(0, 1).toUpperCase() + arr[1].substring(0, 1).toUpperCase()
    }
  }
  return userName
}

/**
 *
 * @param {*} str
 * @returns 是否是中文
 */
function isChinese(str) {
  var re = /[^\u4e00-\u9fa5]/
  if (re.test(str)) return false
  return true
}

/**
 * @param {*} str
 * @returns 是否是字母
 */
function isLetter(str) {
  var re = /^[a-zA-Z]+$/
  return re.test(str)
}

/**
 * @param {*} str
 * @returns 是否有空格
 */
function isHaveSpace(str) {
  var judgeFn = new RegExp(/\s+/g)
  return judgeFn.test(str)
}

