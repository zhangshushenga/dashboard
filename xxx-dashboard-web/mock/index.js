const Mock = require('mockjs')
const { param2Obj } = require('./utils')

const menu = require('./menu')
const user = require('./user')
const role = require('./role')
const article = require('./article')
const search = require('./remote-search')
const stat = require('./stat-data')
const shooter = require('./data-log')
const userList = require('./user-list')
const uploadLog = require('./upload-log')
const roleList = require('./role-list')
const map = require('./map')
const device = require('./device')
const deviceInfo = require('./device-info')
const sweepRecord = require('./sweep-record')
const userMap = require('./user-map')
const screen = require('./screen')
const metrics = require('./metrics')
const recommend = require('./recommend')
const testDevice = require('./test-device.js')
const eventTracking = require('./event-tracking.js')
const dayChange = require('./day-change.js')
const trouble = require('./trouble.js')
const notification = require('./notification.js')

const mocks = [
  ...dayChange,
  ...eventTracking,
  ...recommend,
  ...menu,
  ...user,
  ...role,
  ...article,
  ...search,
  ...stat,
  ...shooter,
  ...userList,
  ...uploadLog,
  ...roleList,
  ...map,
  ...device,
  ...deviceInfo,
  ...sweepRecord,
  ...userMap,
  ...metrics,
  ...testDevice,
  ...screen,
  ...trouble,
  ...notification
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

module.exports = {
  mocks,
  mockXHR
}
