define({ "api": [  {    "type": "get",    "url": "/classify/goods/:id/:page",    "title": "获取某一个分类下新的商品列表数据",    "examples": [      {        "title": "Example usage:",        "content": "curl -i https://life-test.blued.com/life/classify/goods/99/1",        "type": "curl"      }    ],    "name": "getGoods",    "group": "classify____",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>分类id</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "page",            "description": "<p>第几页的数据</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "code",            "description": "<p>200 success 500 failture</p>"          },          {            "group": "Success 200",            "type": "Array",            "optional": false,            "field": "data",            "description": "<p>该频道下商品信息</p>"          },          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "isEnd",            "description": "<p>当前分类下所有商品是否拉取完毕</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "routes/classify.js",    "groupTitle": "classify____",    "sampleRequest": [      {        "url": "http://47.104.231.146:8080/life/classify/goods/:id/:page"      }    ]  },  {    "type": "get",    "url": "/detail/judge/:id/:status",    "title": "为文章点赞或者踩",    "examples": [      {        "title": "Example usage:",        "content": "curl -i https://life-test.blued.com/life/detail/judge/20180929575611074/1",        "type": "curl"      }    ],    "name": "judgeArticle",    "group": "detail____",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>文章id</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>用户态度 0 踩 1 喜欢 2 无态度</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "code",            "description": "<p>200 success 500 failture</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "attitude",            "description": "<p>用户对于本文章的态度 0 踩 1 喜欢 2 无态度</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "routes/detail.js",    "groupTitle": "detail____",    "sampleRequest": [      {        "url": "http://47.104.231.146:8080/life/detail/judge/:id/:status"      }    ]  },  {    "type": "get",    "url": "/index/articles/:tabId/:page",    "title": "获取某一个频道下的文章列表数据  page下标从1开始",    "examples": [      {        "title": "Example usage:",        "content": "curl -i https://life-test.blued.com/life/index/articles/10/1",        "type": "curl"      }    ],    "name": "GetArticles",    "group": "index___",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "tabId",            "description": "<p>频道id</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "page",            "description": "<p>获取第几页的数据</p>"          }        ]      }    },    "success": {      "fields": {        "Reponse 200": [          {            "group": "Reponse 200",            "type": "Number",            "optional": false,            "field": "code",            "description": "<p>200</p>"          },          {            "group": "Reponse 200",            "type": "Object",            "optional": false,            "field": "data",            "description": "<p>该频道下文章信息 {articles, count}</p>"          }        ]      },      "examples": [        {          "title": "Response 200 Example",          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: {articles, count}\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/index.js",    "groupTitle": "index___",    "sampleRequest": [      {        "url": "http://47.104.231.146:8080/life/index/articles/:tabId/:page"      }    ]  }] });
