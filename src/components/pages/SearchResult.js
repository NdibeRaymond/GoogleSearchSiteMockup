import React,{Component} from 'react';
import {withFormik} from 'formik';
import * as Yup from 'yup';

import raymond from "../assets/images/raymond.jpg";
import small_logo from "../assets/images/googlelogo_color_92x30dp.png";
import mic from "../assets/images/googlemic_color_24dp.png"




class SearchResult extends Component{
  constructor(){
    super();
    this.state={}
  }

  render(){
    return (
    <div className="search_result">
      <div className="wrapper_div">
        <header>
           <nav className="nav">
             <div className="nav__div-left">
               <img className="main__img" src={small_logo} alt="google"/>
               <form className="search_div">
       					<div className="search_div__div">
       						<input type="text" className="main__input" name="" value="" aria-label="input your search term"/>
       						<img className="mic" src={mic} alt="speech input"/>
                   <span className="search_icon">
       							<svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
       								<path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
       							</svg>
       						</span>
       					</div>
       				</form>
             </div>

             <div className="nav__div-right">
               <a href="#" className="a a_2" arial-label="g suit"><i className="g_suit fa fa-th fa-lg" aria-hidden="true"></i> </a>
               <a href="#" className="a a_3"> <img src={raymond} className="profile" alt="profile"/>	</a>
             </div>

           </nav>
           <nav className="nav_2">
             <a className="a_1 all_button" href="#">
               <span className="search_icon" style={{height:"16px",width:"16px"}}>
                 <svg focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path d="M10 2v2a6 6 0 0 1 6 6h2a8 8 0 0 0-8-8z" fill="#34A853"></path>
                   <path d="M10 4V2a8 8 0 0 0-8 8h2c0-3.3 2.7-6 6-6z" fill="#EA4335"></path>
                   <path d="M4 10H2a8 8 0 0 0 8 8v-2c-3.3 0-6-2.69-6-6z" fill="#FBBC04"></path>
                   <path d="M22 20.59l-5.69-5.69A7.96 7.96 0 0 0 18 10h-2a6 6 0 0 1-6 6v2c1.85 0 3.52-.64 4.88-1.68l5.69 5.69L22 20.59z" fill="#4285F4">
                   </path>
                 </svg>
               </span>All</a>
             <a className="a_2" href="#"> <i className="fa fa-picture-o" aria-hidden="true"></i>Images </a>
             <a className="a_3" href="#"> <i className="fa fa-newspaper-o" aria-hidden="true"></i>News </a>
             <a className="a_4" href="#"><i className="fa fa-caret-square-o-right" aria-hidden="true"></i>Videos</a>
             <a className="a_5" href="#"><i className="fa fa-map-marker" aria-hidden="true"></i>Maps</a>
             <a className="a_6" href="#"><i className="fa fa-ellipsis-v" aria-hidden="true"></i>More</a>
             <a className="a_7" href="#">Settings</a>
             <a className="a_8" href="#">Tools</a>
           </nav>
         </header>
         <main>
           <div className="result_stat">
             <h3 className="h3">About 4,510,000,000 results (0.64 seconds)</h3>
           </div>
           <div className="all">
             <aside className="wikipedia">
               <h2>Lorem Ipsum</h2>

               <div className="divider">
               <span>o</span>
               <a href="#">Lorem Ipsum</a>
               </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, qu
                is nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu f
                ugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culp
                a qui officia deserunt mollit anim id est laborum.
              </p>
             </aside>

             <section className="results">
               <div className="result">
                 <a className="a a_1" href="#">lorem.ipsum.dolor.com</a>
                 <a className="a a_2" href="#"><h2>Lorem ipsum dolor</h2></a>
                 <p className="body">
                   Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                   tempor incididunt ut labore et dolore magna aliqua.
                 </p>
               </div>

               <div className="result">
                 <a className="a a_1" href="#">lorem.ipsum.dolor.com</a>
                 <a className="a a_2" href="#"><h2>Lorem ipsum dolor</h2></a>
                 <p className="body">
                   Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                   tempor incididunt ut labore et dolore magna aliqua.
                 </p>
               </div>

               <div className="result">
                 <a className="a a_1" href="#">lorem.ipsum.dolor.com</a>
                 <a className="a a_2" href="#"><h2>Lorem ipsum dolor</h2></a>
                 <p className="body">
                   Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                   tempor incididunt ut labore et dolore magna aliqua.
                 </p>
               </div>
             </section>

           </div>

           <section className="related">
             <h2>Searches related to Lorem Ipsum dolor</h2>
             <div className="links">
               <a className="a_1" href="#"> lorem <span>ipsum</span></a>
               <a className="a_2" href="#">lorem <span>ipsum doro</span></a>
               <a className="a_3" href="#">lorem <span>ipsum sit</span></a>
               <a className="a_4" href="#">lorem am <span>ipsum</span></a>
               <a className="a_5" href="#">lorem <span>sit ipsum</span></a>
               <a className="a_6" href="#">lorem <span>dor ipsum</span></a>
               <a className="a_7" href="#">lorem <span>si ipsum</span></a>
               <a className="a_8" href="#">lorem <span>j ipsum</span></a>
             </div>
           </section>

           <section className="pagination">
             <a href="#">1</a>
             <a href="#">2</a>
             <a href="#">3</a>
             <a href="#">4</a>
             <a href="#">5</a>
             <a href="#">6</a>
             <a href="#">7</a>
             <a href="#">8</a>
             <a href="#">9</a>
             <a href="#">10</a>
             <a className="next" href="#">Next</a>
           </section>
         </main>

      </div>
      <footer>
        <div className="footer-top">
          <span className="country">Nigeria</span>
          <span className="seperator">|</span>
          <span className="large_dot"></span>
          <h4><span className="city">Awka South</span> - Based on your past activity - Use precise location - Learn more</h4>
        </div>
        <div className="footer-bottom">
            <a className="a_1" href="#">Help</a>
            <a className="a_2" href="#">Send feedback</a>
            <a className="a_3" href="#">Privacy</a>
            <a className="a_4" href="#">Terms</a>
        </div>

      </footer>
    </div>
    )
  }
}


export default withFormik({
  mapPropsToValue: ()=>({
    name:'',
    email:'',
    phone:'',
    message:'',
  }),
  validationSchema: Yup.object().shape({
    name:Yup.string().min(3,"come on!, you name is smaller than three characters").required("you must give us your name"),
    email:Yup.string().email("You need to give us a valid email").required("you need to give your email"),
    phone:Yup.string().min(11,"your phone number is not complete").max(15,"your phone number is too long").required("we need a phone number to reach you by"),
    message:Yup.string().min(500,"you need to provide us with more details").required("This message field is required")
  }),
  handleSubmit:(values,{setSubmitting}) =>{
    console.log("you've submitted the form. this are the submitted values: ",JSON.stringify(values));
    alert("you have submitted the form");
  }
})(SearchResult);
