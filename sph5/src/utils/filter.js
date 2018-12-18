export function  orderstatus(type){
    let arr = ['未支付','已支付','已完成']
    return arr[type]
}
export function getTime(time){
    return new Date(parseInt(time) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ").substr(0, 10); 
}
export function toFixedTwo(num){
    let number = parseFloat(num);
    return number.toFixed(2);
}
// 交易状态
export function trastatusA(status){
    
}
export function trastatusB(status,expressid){
    let strarr = ['待发货','已发货','已完成']
    if(expressid){
        if(status==2){
            return '已完成'
        }else{
            return '已发货'
        }
    }else{
        return '待发货'
    }
}

// 是否大于当前时间
export function comparetime(timestamp){
    let nowtime = parseInt(Date.now()/1000);
    if(nowtime>timestamp) return false;
    else return true;
}

export function timea(){
    return '123';
}
export function imgurl(src){
    let host = 'https://www.shoubei9.com/image';
    return host + src;
}