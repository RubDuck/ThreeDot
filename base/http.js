const DEFAULT = {
  header:{
    'content-type': 'application/x-www-form-urlencoded',
    'App-Language': 'zh_CN',
  },
  'method':'POST'
} 
const API = "http://localhost:3000";
const http = {
  request: function(options){
    let opts = Object.assign({},DEFAULT,options);
    opts.header = Object.assign({}, DEFAULT.header, options.header);
    opts.url = API + opts.url;
    return new Promise((reslove,reject)=>{
      function success(res){
        reslove(res)
        console.log(res)
      }
      function fail(err){
        reject(err)
         console.log(err)
      }
      opts.success = success
      opts.fail = fail
      wx.request(opts)
    })
  }
}

module.exports = http;