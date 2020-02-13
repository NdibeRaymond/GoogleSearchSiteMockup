import API from '../../components/assets/js/api';

export const getAllData=()=>{
  return dispatch => {
    API.get_all_data(res=>{
      console.log("data: ",res);
      dispatch({
        type:'GOT_DATA',
        payload:res
      })

    })
  }
}
