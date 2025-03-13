module.exports = [
  {
    // http://localhost:9527/dev-api/api/iot/upload_log/JA_RO2_CRL20SWYZEDJ2090037/list
    url: '/api/user_map/aggs_by_param',
    type: 'post',
    response: config => {
      return { 'code': 1, 'message': 'Success', 'data': { 'series': [{ 'subKey': '设备数', 'recordCount': null, 'deviceCount': [] }], 'legendData': null, 'statList': null, 'xaxis': null, 'yaxis': [] }, 'total': 1, 'current': 1, 'hash': '1', 'version': 1, 'instance_id': null }
    }
  }
]

