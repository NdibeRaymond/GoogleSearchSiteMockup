const defaultState={
  all_data:[]
}

const data = (state=defaultState,action)=>{
  switch(action.type){
    case 'GOT_DATA':
      console.log("got data was triggered",action.payload);
      return {
        ...state,
        all_data:action.payload
      }

    default:
      return state
  }
}

export default data;
