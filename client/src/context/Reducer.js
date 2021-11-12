const Reducer = (state, action)=>{
  switch(action.type){
    // when the user hits the login button
    case "LOGIN_START":
      return {
        user:null,
        isFetching:true,
        error:false
      };
    // when user logs in
    case "LOGIN_SUCCESS":
      return {
        user:action.payload,
        isFetching:true,
        error:false
      };
    // if login failed
    case "LOGIN_FAILURE":
      return {
        user:null,
        isFetching:false,
        error:true
      };
      case "UPDATE_START":
        return {
          ...state,
          isFetching:true
        };
      // when user logs in
      case "UPDATE_SUCCESS":
        return {
          user:action.payload,
          isFetching:true,
          error:false
        };
      // if login failed
      case "UPDATE_FAILURE":
        return {
          user:state.user,
          isFetching:false,
          error:true
        };
    // if user logs out
    case "LOGOUT":
      return {
        user:null,
        isFetching:false,
        error:false
      };
      default:
        return state;
  }
};

export default Reducer;
