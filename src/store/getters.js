const getters = {
  userName: state =>state.app.userName|| localStorage.getItem('delegateName'),
  token: state => state.app.token||localStorage.getItem('delegateToken') ,
  user: state => state.app.user,
  delegateType: state =>  state.app.delegateType|| localStorage.getItem('delegateType'),
  medicineList: state => state.app.medicineList,
  userInfoList: state => state.app.userInfoList,
  newGateway: state => state.app.newGateway
}
export default getters
