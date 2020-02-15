import React,{Component} from 'react';
import {withFormik} from 'formik';
import {SearchEngine} from "../assets/js/SearchEngine.js";

import {connect} from 'react-redux';
import * as dataActions from '../../store/actions/dataActions';

import google_assistant from "../assets/images/google_assistant-512.png";
import raymond from "../assets/images/raymond.jpg";
import big_logo from "../assets/images/googlelogo_color_272x92dp.png";
import mic from "../assets/images/googlemic_color_24dp.png"
import shield from "../assets/images/shield_security.png"


class Home extends Component {

  constructor(props){
    super(props);
    this.state={
      SE: new SearchEngine(),
      suggestions: [],
      search_div__div:{},
      suggestion_div: {},
      main_input:{}
    }
  }

  async UNSAFE_componentWillMount(){
    if(this.props.data.all_data){
      if(Array.isArray(this.props.data.all_data)){
        if(this.props.data.all_data.length === 0){
      await this.props.get_all_data();
    }
    }
    else{
      if(Object.keys(this.props.data.all_data).length === 0){
        await this.props.get_all_data();
      }
    }
  }
  else{
    await this.props.get_all_data()
  }
  }

  componentDidMount(){
    this.setState(
      { search_div__div: document.querySelector(".search_div__div"),
        suggestion_div: document.querySelector(".suggestions"),
        main_input: document.querySelector(".main__input")
      },()=>{
        this.autoFocus(this.state.main_input);
        this.inputFocusDetect();
        this.mainInputBlurDetect();
      }
    )
  }

  autoFocus=(main_input)=>{
    main_input.focus()
  }

  mainInputBlurDetect=()=>{
    document.addEventListener("click",(e)=>{
      console.log(e.target.href);
      console.log(this.state.suggestions);
      console.log(e.target !== this.state.main_input
        && e.target.getAttribute("to_romove") === undefined
        && e.target.getAttribute("to_romove") === null);

        console.log(e.target.getAttribute("to_romove") !== undefined
        && e.target.getAttribute("to_romove") !== null);
      if(e.target.href){
        if(e.target.href !== `${window.origin}/#`){
          return
        }
      }

      if(e.target !== this.state.main_input
        && (e.target.getAttribute("to_romove") === undefined
        || e.target.getAttribute("to_romove") === null)){
        this.state.search_div__div.classList.remove("boxshadow");
        document.querySelector(".main__input").blur();
        this.state.suggestion_div.classList.remove("absolute");
        this.state.search_div__div.classList.remove("suggestion_collapsed");
        this.state.suggestion_div.classList.add("static");
        this.setState({
          suggestions:[]
        })
      }
      else{
        if(e.target.getAttribute("to_romove") !== undefined
        && e.target.getAttribute("to_romove") !== null){
          this.removeSuggestion(e.target.getAttribute("to_romove"))
        }
      }

    })
  }



  searchForSuggestion=(e)=>{
    window.location = `${window.origin}/search?search=${e.target.innerHTML.split("").splice(0,5).join("")}`
  }

  removeSuggestion=(value)=>{
    // console.log(value,this.state.suggestions);
    // let new_suggestions = this.state.suggestions.filter(suggestion=>suggestion !== value);
    // console.log(new_suggestions);
    // this.setState({suggestions:new_suggestions},()=>{
    //   console.log(this.state.suggestions.length);
    //   this.suggestionUI(this.state.suggestions)
    // });
  }

  // cleanUpAndHandleBlur=(e)=>{
  //
  //   document.querySelector(".search_div__div").classList.remove("boxshadow");
  //   document.querySelector(".main__input").blur();
  //   this.state.suggestion_div.classList.remove("absolute");
  //   this.state.suggestion_div.classList.add("static");
  //   this.state.suggestion_div.setAttribute("id","");
  //
  //   this.setState({
  //     suggestions:[]
  //   })
  //
  //   this.props.handleBlur(e)
  //
  // }

  suggestionUI=(result)=>{

      if(result.length > 0){
        console.log("its greater than 1");
        this.state.suggestion_div.classList.add("absolute");
          this.state.search_div__div.classList.add("suggestion_collapsed");
        this.state.suggestion_div.classList.remove("static");
      }
      else{
        console.log("not greater than 1");
        this.state.suggestion_div.classList.remove("absolute");
          this.state.search_div__div.classList.remove("suggestion_collapsed");
        this.state.suggestion_div.classList.add("static");
      }

  }

  suggestAndHandleChange=(e)=>{
    console.log(e.target.value);
    if(e.target.value.length >= 5){
      this.suggest(e.target.value);
    }
    this.props.handleChange(e);
  }

  suggest=(value)=>{
   let suggestions  = this.state.SE.textSearch(this.props.data.all_data,value,["url","title","body"],true).splice(0,10);
   console.log(suggestions);

   this.setState({
     suggestions:suggestions
   },()=>{
     console.log(this.state.suggestions);
     this.suggestionUI(this.state.suggestions)
   })
  }

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
  <>
  <div className="wrapper_div">
    <header>
      <nav className="nav">
        <div className="nav__div-left">
          <button className="btn" type="button" name="menu dropdown"><i className="fa fa-bars fa-lg" aria-hidden="true"></i></button>
          <a href="#" className="a a_1">All</a>
          <a href="#" className="a a_2">Gmail</a>
          <a href="#" className="a a_3">Images</a>
        </div>

        <div className="nav__div-right">
          <a href="#" className="a a_1"><img className="assistant" src={google_assistant} alt="google assistant"/></a>
          <a href="#" className="a a_2" arial-label="g suit"><i className="g_suit fa fa-th fa-lg" aria-hidden="true"></i> </a>
          <a href="#" className="a a_3"> <img src={raymond} className="profile" alt="profile"/>	</a>
        </div>

      </nav>
    </header>
    <main>

      <img className="main__img" src={big_logo} alt="google"/>

      <form className="search_div" name="search" noValidate="noValidate" onSubmit={this.props.handleSubmit} autoComplete="off">
        <div className="search_div__div">
          <span className="search_icon">
            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          </span>
          <input type="text" className="main__input" name="search" value={this.props.values["search"]} onChange={this.suggestAndHandleChange}
             aria-label="input your search term"/>
          <img className="mic" src={mic} alt="speech input"/>
        </div>
      </form>

      <div className="main__section1">
        <div className="suggestions">
          {this.state.suggestions.splice(0,9).map((suggestion,key)=>
          <div className="suggestion" key={key}>
          <div>
            <i className="suggestion-history-icon fa fa-history" aria-hidden="true"></i>
            <a className="search_suggestion" onClick={this.searchForSuggestion} href="#">{suggestion.title}</a>
          </div>
          <span className="search_suggestion-remove">
            <i className="search_suggestion-remove-icon fa fa-times" aria-hidden="true"></i>
            <span className="search_suggestion-remove-word" to_romove={suggestion.title}>Remove</span></span>
          </div>)}

        <div className="button__div">
          <button type="button" className="button" name="button">Google Search</button>
          <button type="button" className="button" name="button">I'm feeling Lucky</button>
        </div>
        </div>

        <div className="main__section1__div-2 desktop">
          <img src={shield} alt=""/>
          <h3>&nbsp;It's Safer Internet Day. &nbsp;</h3>
          <a href="#">Take a 2-minute Security Checkup to strengthen your account</a>
        </div>
        <div className="main__section1__div-2 mobile">
          <a href="#">Take a Checkup for Safer Internet Day</a>
        </div>
      </div>

      <div className="main__section2">
        <h3 className="h3 desktop">Google offered in:&nbsp;&nbsp;</h3>
        <div className="">
          <a href="#">Hausa</a>
          &nbsp;
          &nbsp;
          <a href="#">Igbo</a>
          &nbsp;
          &nbsp;
          <a href="#">Èdè Yorùbá</a>
          &nbsp;
          &nbsp;
          <a href="#">Nigerian Pidgin</a>
        </div>

      </div>

    </main>
  </div>
  <footer>
    <div className="footer-top">
      Nigeria
    </div>
    <div className="footer-bottom">
      <div className="footer-bottom__group1">
        <a className="a_1" href="#">Advertising</a>
        &nbsp;
        &nbsp;
        &nbsp;
        <a className="a_2" href="#">Business</a>
        &nbsp;
        &nbsp;
        &nbsp;
        <a className="a_3" href="#">About</a>
        &nbsp;
        &nbsp;
        &nbsp;
        <a className="a_4" href="#">How Search works</a>
      </div>
      <div className="footer-bottom__group2">
        <a className="a_1" href="#">Privacy</a>
        &nbsp;
        &nbsp;
        &nbsp;
        <a className="a_2" href="#">Terms</a>
        &nbsp;
        &nbsp;
        &nbsp;
        <a className="a_3" href="#">Settings</a>
      </div>
    </div>

  </footer>
  </>

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
    search_text:'',
  }),
  handleSubmit:(values,{setSubmitting}) =>{
    console.log("you've submitted the form. this are the submitted values: ",JSON.stringify(values));
    window.location.href = `${window.origin}/search?search=${values.search}`;
  }
})(Home));
