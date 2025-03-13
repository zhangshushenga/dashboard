module.exports = [
  {
    url: '/api/day_change/vw_change',
    type: 'get',
    response: config => {
      return {
        'code': 1,
        'message': 'Success',
        'data': {
          'series': [
            {
              'key': '当前虚拟墙数量',
              'value': [
                144792,
                144965
              ]
            },
            {
              'key': '记忆图总数',
              'value': [
                null,
                72971
              ]
            }
          ],
          'xaxis': [
            '2022-04-11',
            '2022-04-12'
          ]
        },
        'total': 1,
        'current': 1,
        'hash': '1',
        'version': 1
      }
    }
  }
]

