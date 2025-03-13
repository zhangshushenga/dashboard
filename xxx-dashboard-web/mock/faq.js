module.exports = [
  {
    url: 'api/faq/categories',
    type: 'get',
    response: config => {
      return {
        'code': 0,
        'message': 'success',
        'data': [
          {
            'id': 33,
            'name': 'RIV',
            'iconUrl': 'https://xxx-cluster-test-feedback-service.s3.us-west-2.amazonaws.com/public/faq/category/image 2.png',
            'sub': [
              {
                'id': 37,
                'name': 'Register/Login/Setting'
              },
              {
                'id': 40,
                'name': 'Live voice'
              },
              {
                'id': 38,
                'name': 'Device binding'
              },
              {
                'id': 41,
                'name': 'Two-way voice'
              },
              {
                'id': 39,
                'name': 'Live picture'
              },
              {
                'id': 42,
                'name': 'Camera'
              }
            ]
          },
          {
            'id': 34,
            'name': 'Batman',
            'iconUrl': 'https://xxx-cluster-test-feedback-service.s3.us-west-2.amazonaws.com/public/faq/category/image 7.png',
            'sub': []
          },
          {
            'id': 35,
            'name': 'App',
            'iconUrl': 'https://xxx-cluster-test-feedback-service.s3.us-west-2.amazonaws.com/public/faq/category/40.png',
            'sub': []
          }
        ]
      }
    }
  },
  {
    url: '/api/faq/category',
    type: 'post',
    response: config => {
      return {
        'code': 0,
        'message': 'success',
        'data': {
          'id': 43,
          'name': 'test'
        }
      }
    }
  },
  {
    url: '/api/faq/category/sort',
    type: 'post',
    response: config => {
      return {
        'code': 0,
        'message': 'success'
      }
    }
  },
  {
    url: '/api/faq/category/.*',
    type: 'put',
    response: config => {
      return {
        'code': 0,
        'message': 'success'
      }
    }
  },
  {
    url: '/api/faq/category/.*',
    type: 'delete',
    response: config => {
      return {
        'code': 0,
        'message': 'success'
      }
    }
  },
  {
    url: '/api/faq/list',
    type: 'get',
    response: config => {
      return {
        'code': 0,
        'message': 'success',
        'data': [
          {
            'id': 123,
            'title': 'How to adjust the volume of mobile phone during two-way call？',
            'subCategory': 37,
            'subCategoryText': 'Register/Login/Setting',
            'status': 0,
            'updateTime': '2023-02-28 18:06:05'
          },
          {
            'id': 124,
            'title': 'How to adjust the volume of mobile phone during two-way call？',
            'subCategory': 37,
            'subCategoryText': 'Register/Login/Setting',
            'status': 0,
            'updateTime': '2023-02-28 18:06:06'
          },
          {
            'id': 125,
            'title': 'How to adjust the volume of mobile phone during two-way call？',
            'subCategory': 37,
            'subCategoryText': 'Register/Login/Setting',
            'status': 0,
            'updateTime': '2023-02-28 18:06:07'
          },
          {
            'id': 126,
            'title': 'How to adjust the volume of mobile phone during two-way call？',
            'subCategory': 37,
            'subCategoryText': 'Register/Login/Setting',
            'status': 0,
            'updateTime': '2023-02-28 18:06:08'
          },
          {
            'id': 127,
            'title': 'How to adjust the volume of mobile phone during two-way call？',
            'subCategory': 37,
            'subCategoryText': 'Register/Login/Setting',
            'status': 0,
            'updateTime': '2023-02-28 18:35:13'
          }
        ]
      }
    }
  },
  {
    url: '/api/faq/sort',
    type: 'post',
    response: config => {
      return {
        'code': 0,
        'message': 'success'
      }
    }
  },
  {
    url: '/api/faq/.*/deploy',
    type: 'post',
    response: config => {
      return {
        'code': 0,
        'message': 'success'
      }
    }
  }, {
  // 获取faq详情
    url: '/api/faq/.*',
    type: 'get',
    response: config => {
      return {
        'code': 0,
        'message': 'success',
        'data': {
          'id': 43,
          'title': "What should I do if the vacuum doesn't run over rugs with dark patterns or other dark surfaces?",
          'content': "1. The Wyze Robot Vacuum may not operate on dark or black floors/carpets. \n2. The vacuum's built-in cliff sensors emit infrared light which may not reflect on a dark surface, causing the vacuum to be unable to clean over it. \n3. There currently is no setting or update to change this behavior.\nWorkaround:  Tape the four cliff sensors with white paper to disable the cliff sensors. (Do NOT use this workaround if there are any stairs/cliffs in the environment.)\r",
          'subCategory': 38,
          'status': 1,
          'updateTime': '2023-02-27 16:00:37'
        }
      }
    }
  },
  {
    url: '/api/faq/.*/undeploy',
    type: 'post',
    response: config => {
      return {
        'code': 0,
        'message': 'success'
      }
    }
  },
  {
    url: '/api/faq/.*',
    type: 'put',
    response: config => {
      return {
        'code': 0,
        'message': 'success'
      }
    }
  },
  {
    url: '/api/faq/.*',
    type: 'delete',
    response: config => {
      return {
        'code': 0,
        'message': 'success'
      }
    }
  }
]
