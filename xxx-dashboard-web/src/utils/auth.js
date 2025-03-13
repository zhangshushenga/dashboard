import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  var inFifteenMinutes = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 3)
  return Cookies.set(TokenKey, token, { expires: inFifteenMinutes })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
