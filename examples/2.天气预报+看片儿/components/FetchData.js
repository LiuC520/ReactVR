const api = "http://zhwnlapi.etouch.cn/Ecalender/api/v2/weather?date=20170526&citykey="
// const ipapi = "http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json"
const ipapi = "https://api.map.baidu.com/location/ip?ak=xNmE9vBpE10dFSu9Mbyxv9A8ZHChaElZ&coor=bd09ll"
const appkey = "99817661"
let fetchOption = {
    method: 'GET',
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Access-Control-Allow-Origin':'*',
        
    },
};

module.exports={
    getData:(url,isip)=>{
        let newurl = null
        if(isip){
            newurl = ipapi
        }else{
            newurl = api + url+'&app_key='+appkey
        }
        return new Promise((resolve,reject)=>{
            fetch(newurl,fetchOption).then(
                res=>{
                    if(res.ok){
                        res.json().then(obj=>{
                                resolve(obj)
                            
                            // if(obj.status === 1000){
                            //     resolve(obj.data)
                            // }else{
                            //     reject(obj.desc)
                            // }
                        })
                    }else{
                        reject("网络错误")
                    }
                    
                }
            ).catch(
                e=>reject(e)
            )
        })
        
    },
    getX:(r,du)=>{
        return(
            r * Math.cos( du *  Math.PI / 180)
        )
    },
    getZ:(r,du)=>{
        return(
            r * Math.sin(du *  Math.PI / 180)
        )
    },
}