export default{
    setOpenid (state, value) {
      state.setOpenid = value || '';
    },
    setUserInfo (state, value) {
      state.userInfo = value || {};
    },
    setAppToken (state, value) {
      state.appToken = value || {};
    },
  };