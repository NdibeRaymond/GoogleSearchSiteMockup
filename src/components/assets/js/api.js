import data from "../data/dataset.json";


const API={
  get_all_data:(success)=>{
  success(data)
}
};

export default API;
