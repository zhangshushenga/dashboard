module.exports = [
  {
    // http://localhost:9527/dev-api/api/iot/upload_log/JA_RO2_CRL20SWYZEDJ2090037/list
    url: '/api/iot/upload_log/.*/list',
    type: 'get',
    response: config => {
      return {
        'code': 1,
        'current': 1,
        'data': [{
          'createTime': 1601279258888,
          'createTimeDate': 1601279258888,
          'fileId': '3320e3f3-9e3e-4255-a746-0a8d258a7ab0',
          'upload': false
        }, {
          'createTime': 1601279248045,
          'createTimeDate': 1601279248045,
          'fileId': 'ae898a34-0191-416e-ab87-52751ac2f3f5',
          'upload': false
        }, {
          'createTime': 1601279247988,
          'createTimeDate': 1601279247988,
          'fileId': '45f04c16-f29d-4219-9aff-102049aba07e',
          'upload': false
        }, {
          'createTime': 1601279063810,
          'createTimeDate': 1601279063810,
          'fileId': '23f10693-6dce-4f30-ad0c-cddff5c57335',
          'upload': false
        }, {
          'createTime': 1601278809044,
          'createTimeDate': 1601278809044,
          'fileId': '699ad9c0-493d-453c-8c8c-790df1cf5c78',
          'upload': false
        }, {
          'createTime': 1601278076747,
          'createTimeDate': 1601278076747,
          'fileId': '8a13cde2-c004-4044-b06f-89fb5ad9670d',
          'fileSize': 0,
          'upload': true
        }, {
          'createTime': 1601278057126,
          'createTimeDate': 1601278057126,
          'fileId': 'dbda392e-a146-4046-a183-e296bc18bbd1',
          'fileSize': 45,
          'upload': true
        }, {
          'createTime': 1601277976256,
          'createTimeDate': 1601277976256,
          'fileId': 'feee0545-596c-4cd9-8cac-4ba89480ab1c',
          'upload': false
        }, {
          'createTime': 1601277828154,
          'createTimeDate': 1601277828154,
          'fileId': '66434183-3c39-41aa-9b59-36b1bed59f75',
          'upload': false
        }, {
          'createTime': 1601277534988,
          'createTimeDate': 1601277534988,
          'fileId': '711852ad-ef0e-4642-855f-1960cf7007bc',
          'upload': false
        }],
        'hash': '1',
        'message': 'Success',
        'total': 1,
        'version': 1
      }
    }
  },
  {
    url: '/api/iot/upload_log/.*/.*/download',
    type: 'get',
    response: config => {
      return { 'code': 1, 'current': 0, 'hash': '1', 'message': 'Success', 'total': 0, 'version': 1 }
    }
  },
  // {
  //   url: '/api/iot/upload_log/.*/.*/check',
  //   type: 'get',
  //   response: config => {
  //     return { 'code': 1, 'current': 0, 'hash': '1', 'message': 'Success', 'total': 0, 'version': 1 }
  //   }
  // },
  {
    url: '/api/iot/upload_log/.*/.*/check',
    type: 'get',
    response: config => {
      return { 'code': 1, 'current': 0, 'data': { 'url': 'xxx', 'size': 2222 }, 'hash': '1', 'message': 'Success', 'total': 0, 'version': 1 }
    }
  }
]
