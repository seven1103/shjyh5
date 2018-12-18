const getters = {
    userid: state => state.user.id,
    username: state => state.user.name,
    usersex: state => state.user.sex,
    useravater: state => state.user.avater,
    userwid : state => state.user.w_id,
    userphone: state => state.user.phone,
    useraddress : state => {
        return {
            provice:state.user.address.provice,
            city   :state.user.address.city,
            county :state.user.address.county,
            info   :state.user.address.info
        }
    }
}

export default  getters