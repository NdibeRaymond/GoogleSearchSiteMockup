// import React,{Component} from 'react';
import Fuse from "fuse.js";




export class SearchEngine{

  textSearch=(data,search_text,_keys=[],should_sort=false,_threshold=0.2,_location=0,_distance=100,max_pattern_length=100,min_match_charlength=1)=>{
    let newData = data;
    if(search_text !== undefined && search_text!==""){

    var options = {
      shouldSort: should_sort,
      threshold: _threshold,
      location: _location,
      distance: _distance,
      maxPatternLength: max_pattern_length,
      minMatchCharLength: min_match_charlength,
      keys:_keys};

      let fuse = new Fuse(newData, options);
      newData = fuse.search(search_text);
  }

  return newData
  };

}
