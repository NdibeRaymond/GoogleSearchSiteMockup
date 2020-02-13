import React,{Component} from 'react';
import {withFormik} from 'formik';
import {SearchEngine} from "../assets/js/SearchEngine.js";

import {connect} from 'react-redux';
import * as dataActions from '../../store/actions/dataActions';


import raymond from "../assets/images/raymond.jpg";
import small_logo from "../assets/images/googlelogo_color_92x30dp.png";
import mic from "../assets/images/googlemic_color_24dp.png"




class SearchResult extends Component{
  constructor(props){
    super(props);
    this.state={
      SE:new SearchEngine(),
      query_result:[],
      suggestions: [],
      header:{},
      suggestion_divs:[],
      main_input: {},
    }
  }

  componentDidMount(){
    this.mainInputBlurDetect();
    this.inputFocusDetect();
    this.defaultFocus();
    this.setState({
      query:this.props.location.search.split("=")[1],
      suggestion_divs: document.querySelectorAll(".search_suggestions"),
      main_input: document.querySelector(".main__input"),
      header:document.querySelector(".header")
    },()=>{
      console.log(this.state.suggestion_divs);
      this.state.suggestion_divs.forEach(div=>{div.classList.add("search_static")});
      this.headerPlacement(this.state.header);
      this.search(this.state.query)
    })
  }

  headerPlacement=(header)=>{
    let observer = new IntersectionObserver(entries=>{
      if(entries[0].target.clientWidth > 720){
      if(entries[0].isIntersecting === true){
        document.querySelector("#nav-desktop").classList.remove("absoluteNav");
      }
      else{
        // console.log("is not intersectionggggsggksldk");
        document.querySelector("#nav-desktop").classList.add("absoluteNav");
      }
    }
    },{threshold:[0]});

    observer.observe(header);
  }

  defaultFocus=()=>{
    document.querySelector(".all_button").focus()
  }

  mainInputBlurDetect=()=>{
    document.addEventListener("click",(e)=>{
      console.log(e.target.href);
      if(e.target.href){
        if(e.target.href !== `${window.origin}/#`){
          return
        }
      }

      if(e.target !== this.state.main_input){
        document.querySelector(".search_div__div").classList.remove("boxshadow");
        document.querySelector(".main__input").blur();
        this.state.suggestion_divs.forEach(div=>{
          div.classList.remove("search_absolute");
          div.classList.add("search_static");
          div.setAttribute("id","");
        })

        this.setState({
          suggestions:[]
        })
      }

    })
  }

  searchForSuggestion=(e)=>{
    window.location = `${window.origin}/search?search=${e.target.innerHTML.split("").splice(0,5).join("")}`
  }

  search=(query)=>{
    let query_result  = this.state.SE.textSearch(this.props.data.all_data,query,["url","title","body"],true).splice(0,5);

    this.setState({
      query_result
    })
  }

  cleanUpAndHandleBlur=(e)=>{

    document.querySelector(".search_div__div").classList.remove("boxshadow");
    document.querySelector(".main__input").blur();

    this.state.suggestion_divs.forEach(div=>{
      div.classList.remove("search_absolute");
      div.classList.add("search_static");
      div.setAttribute("id","");
    })

    this.setState({
      suggestions:[]
    })

    this.props.handleBlur(e)
  }


  suggestionUI=(result)=>{
      this.state.suggestion_divs.forEach(div=>{
      if(result.length > 0){
        console.log("its greater than 1");
        div.classList.add("search_absolute");
        div.classList.remove("search_static");
      }
      else{
        console.log("not greater than 1");
        div.classList.remove("search_absolute");
        div.classList.add("search_satic");
      }
    })

  }

  suggestAndHandleChange=(e)=>{
    console.log(e.target.value);
    let results = [];
    if(e.target.value.length >= 5){
      results = this.suggest(e.target.value);
    }
    this.props.handleChange(e);
  }

  suggest=(value)=>{
   let suggestions  = this.state.SE.textSearch(this.props.data.all_data,value,["url","title","body"],true);

   this.setState({
     suggestions
   },()=>{
     // console.log(this.state.suggestions);
     this.suggestionUI(this.state.suggestions)
   })
  }

  resultComponents=()=>this.state.query_result.map((result,key)=>
            <div className="result" key={key}>
              <a className="a a_1" href="#">{result.url}</a>
              <a className="a a_2" href="#"><h2>{
                result.title.length < 50 ?
                result.title
                :
                result.title.split("").splice(1,50).join("")+" ..."
              }</h2></a>
              <p className="body">
                {
                  result.body.length < 120 ?
                  result.body
                  :
                  result.body.split("").slice(0,120).join("")+" ..."
                }
              </p>
            </div>)


            inputFocusDetect=()=>{

              let wrapperDiv = document.querySelector(".search_div__div");
              let input  = document.querySelector(".main__input");

              function addBoxShadow(e){
                wrapperDiv.classList.add("boxshadow");
              }

              function removeBoxShadow(e){
                wrapperDiv.classList.remove("boxshadow");
              }

              input.addEventListener("mouseover",addBoxShadow,false);

              input.addEventListener("mouseout",function(e){
                if(document.activeElement !== input){
                removeBoxShadow(e)
              }
              },false);

              input.addEventListener("focus",addBoxShadow,false)

              input.addEventListener("onblur",removeBoxShadow,false);
            }


  render(){
    return (
    <div className="search_result">
      <div className="wrapper_div">
        <header className="header">
           <nav className="nav" id="nav-desktop">
             <div className="nav__div-left">
               <img className="main__img" src={small_logo} alt="google"/>
               <form className="search_div" id="form_desktop" name="search" noValidate="noValidate" onSubmit={this.props.handleSubmit} autocomplete="off">
       					<div className="search_div__div">
       						<input type="text" className="main__input" name="search" value={this.props.values["search"]} onChange={this.suggestAndHandleChange}
                    onBlur={this.props.handleBlur} aria-label="input your search term"/>
       						<img className="mic" src={mic} alt="speech input"/>
                   <span className="search_icon">
       							<svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
       								<path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
       							</svg>
       						</span>
       					</div>

                <div className="search_suggestions boxshadow">
                  {this.state.suggestions.splice(1,10).map((suggestion,key)=>
                  <div className="suggestion" key={key}>
                  <a className="search_suggestion" onClick={this.searchForSuggestion} href="#">{suggestion.title}</a>
                  </div>)}
                </div>
       				</form>
             </div>

             <div className="nav__div-right">
               <a href="#" className="a a_2 dot_grid" arial-label="g suit"><i className="g_suit fa fa-th fa-lg" aria-hidden="true"></i> </a>
               <a href="#" className="a a_3"> <img src={raymond} className="profile" alt="profile"/>	</a>
             </div>
           </nav>

           <nav className="nav" id="nav-mobile">
             <div className="nav__div-left">
               <button className="btn" type="button" name="menu dropdown"><i className="fa fa-bars fa-lg" aria-hidden="true"></i></button>
               <img className="main__img" src={small_logo} alt="google"/>
               <a href="#" className="a a_3"> <img src={raymond} className="profile" alt="profile"/>	</a>
             </div>

             <div className="nav__div-right">
                 <form className="search_div" id="form_desktop" name="search" noValidate="noValidate" onSubmit={this.props.handleSubmit} autocomplete="off">
         					<div className="search_div__div">
         						<input type="text" className="main__input" name="search" value={this.props.values["search"]} onChange={this.suggestAndHandleChange}
                      onBlur={this.props.handleBlur} aria-label="input your search term"/>
         						<img className="mic" src={mic} alt="speech input"/>
                     <span className="search_icon">
         							<svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
         								<path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
         							</svg>
         						</span>
         					</div>

                  <div className="search_suggestions boxshadow">
                    {this.state.suggestions.splice(1,10).map((suggestion,key)=>
                    <div className="suggestion" key={key}>
                    <a className="search_suggestion" onClick={this.searchForSuggestion} href="#">{suggestion.title}</a>
                    </div>)}
                  </div>
         				</form>
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
             <a className="a_2 images" href="#"> <i className="fa fa-picture-o" aria-hidden="true"></i>Images </a>
             <a className="a_3 news" href="#"> <i className="fa fa-newspaper-o" aria-hidden="true"></i>News </a>
             <a className="a_4 videos" href="#"><i className="fa fa-caret-square-o-right" aria-hidden="true"></i>Videos</a>
             <a className="a_5 maps" href="#"><i className="fa fa-map-marker" aria-hidden="true"></i>Maps</a>
             <a className="a_6 more" href="#"><i className="fa fa-ellipsis-v" aria-hidden="true"></i>More</a>
             <a className="a_7 settings" href="#">Settings</a>
             <a className="a_8 tools" href="#">Tools</a>
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
               <span><i class="fa fa-globe fa-2x" aria-hidden="true"></i></span>
               <a href="#">Lorem Ipsum</a>
               <i class="fa fa-share-alt fa-2x" aria-hidden="true"></i>
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
               {this.resultComponents()}
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
           <div className="pagination__div">
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
             </div>
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


const mapStateToProps = state =>{
  return{
    data:state.data
  }
}

const mapDispatchToProps= dispatch =>{
  return{
    get_all_data:()=>{
      dispatch(dataActions.getAllData());
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFormik({
  mapPropsToValue: ()=>({
    name:'',
    email:'',
    phone:'',
    message:'',
  }),
  handleSubmit:(values,{setSubmitting}) =>{
    console.log("you've submitted the form. this are the submitted values: ",JSON.stringify(values));
    window.location.href = `${window.origin}/search?search=${values.search}`;
  }
})(SearchResult));
