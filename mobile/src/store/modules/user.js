const user = {
    state:{
        id:'',
        name:'seven',
        sex:1,
        avater:'',
        w_id:'',
        openid:'',
        phone:'',
        address:{} 
    },
    mutations:{
        SET_ID: (state, id) => {
            state.id = id
        },
        SET_WID: (state, w_id) => {
            state.w_id = w_id
        },
        SET_OPENID: (state, openid) => {
            state.openid = openid
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATER: (state, avater) => {
            state.avater = avater
        },
        SET_SEX: (state, sex) => {
            state.sex = sex
        },
        SET_PHONE: (state, phone) => {
            state.phone = phone
        },
        SET_ADDRESS: (state, address) => {
            state.address = address
        },
    },
    actions:{
        // 获取用户信息
        GetUserInfo({ commit }, userInfo){
            commit('SET_ID', userInfo._id)
            commit('SET_NAME', userInfo.name)
            commit('SET_AVATER', userInfo.avater)
            commit('SET_WID', userInfo.w_id)
            commit('SET_OPENID', userInfo.openid)
            commit('SET_SEX', userInfo.sex)
            commit('SET_PHONE', userInfo.phone)
            if(userInfo.address){
                commit('SET_ADDRESS', userInfo.address)
            }else{
                commit('SET_ADDRESS', {})
            }
        },
        ClearUserInfo({ commit }){
            commit('SET_ID', '')
            commit('SET_NAME', '')
            commit('SET_AVATER', '')
            commit('SET_WID', '')
            commit('SET_OPENID', '')
            commit('SET_SEX', '')
            commit('SET_PHONE', '')
            commit('SET_ADDRESS', '')
        }
    }
}

export default user