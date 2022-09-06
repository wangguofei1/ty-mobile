import Vue from "vue"
const state = {
  userName: '',
  token: '',
  user: {},
  delegateType: '',
  medicineList: [],
  userInfoList: {},
  newGateway: {}
}
const mutations = {
  SET_USER_NAME(state, name) {
    localStorage.setItem('delegateName', name)
    state.userName = name
  },
  SET_TOKEN(state, token) {
    localStorage.setItem('delegateToken', token)
    state.token = token
  },
  SET_WX_TYPE(state, type) {
    localStorage.setItem('delegateType', type)
    state.delegateType = type
  },
  SET_MEDICINE_List(state, medicineList) {
    localStorage.setItem('medicineList', medicineList)
    state.medicineList = medicineList
  },
  SET_USERINFO_List(state, userInfoList) {
    localStorage.setItem('userInfoList', userInfoList)
    state.userInfoList = userInfoList
  },
  SET_NEW_GATEWAY(state, newGateway) {
    localStorage.setItem('newGateway', newGateway)
    state.newGateway = newGateway
  },
  SET_USER(state, user) {
    localStorage.setItem('user', user)
    state.user = user
  }
}
const actions = {
  // 设置name
  setUserName({
    commit
  }, name) {
    commit('SET_USER_NAME', name)
  },
  setToken({
    commit
  }, token) {
    commit('SET_TOKEN', token)
  },
  setWxType({
    commit
  }, type) {
    commit('SET_WX_TYPE', type)
  },
  setMedicineList({
    commit
  }, medicineList) {
    commit('SET_MEDICINE_List', medicineList)
  },
  setUserInfoList({
    commit
  }, userInfoList) {
    commit('SET_USERINFO_List', userInfoList)
  },
  setNewGateway({
    commit
  }, newGateway) {
    commit('SET_NEW_GATEWAY', newGateway)
  },
  setUser({
    commit
  }, user) {
    commit('SET_USER', user)
  }
}
export default {
  state,
  mutations,
  actions
}
