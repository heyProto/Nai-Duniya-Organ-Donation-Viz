import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class toOrganCoverVizCard extends React.Component {

  constructor(props) {
    super(props)

    let stateVar = {
      fetchingData: true,
      dataJSON: {},
      schemaJSON: undefined,
      optionalConfigJSON: {},
      optionalConfigSchemaJSON: undefined,
      languageTexts: undefined,
      animation: true
    };

    if (this.props.dataJSON) {
      stateVar.fetchingData = false;
      stateVar.dataJSON = this.props.dataJSON;
    }

    if (this.props.optionalConfigJSON) {
      stateVar.optionalConfigJSON = this.props.optionalConfigJSON;
    }

    if (this.props.optionalConfigSchemaJSON) {
      stateVar.optionalConfigSchemaJSON = this.props.optionalConfigSchemaJSON;
    }

    this.state = stateVar;
  }

  exportData() {
    return this.props.selector.getBoundingClientRect();
  }

  componentDidMount() {
    if (this.state.fetchingData) {
      axios.all([
        axios.get(this.props.dataURL),
        axios.get(this.props.optionalConfigURL),
        axios.get(this.props.optionalConfigSchemaURL)
      ])
      .then(axios.spread((card, opt_config, opt_config_schema) => {
        this.setState({
          fetchingData: false,
          dataJSON: card.data,
          optionalConfigJSON: opt_config.data,
          optionalConfigSchemaJSON: opt_config_schema.data,
          description: card.data.data.organ_description.description_for_heart
        });
      }));
    } else {
      this.setState({
        description: this.props.desc,
        animation: this.props.animation
      })
      this.componentDidUpdate()
    }
  }

  componentDidUpdate() {
    console.log(this.props.mode, this.state.animation, "mode")
    if (this.state.animation){
      if (this.props.mode === "col16") {
        // draw white line
        console.log("col16")
        let white_line = Snap("#white-line"); 
        let myPathC = white_line.path("M576 364 583 364 604 369 623 369 649.942529 343.567164 675.390805 328.522388 671.62069 312.537313 677.275862 309.716418 677.275862 300.313433 689.528736 292.791045 692.356322 270.223881 698.011494 258.940299 706.494253 230.731343 716.862069 195 719 187 731 187").attr({
          class: "white-line-path",
          id: "path-2",
          fill: "none",
          strokeWidth: "3",
          stroke: "#ffffff",
          strokeDasharray: "9 9",
          strokeDashOffset: "283.0320129394531"
        });
        let lenC = myPathC.getTotalLength();

        myPathC.attr({
          stroke: '#fff',
          strokeWidth: 3,
          fill: 'none',
          "stroke-dasharray": "283.0320129394531 283.0320129394531",
          "stroke-dashoffset": "283.0320129394531"
        }).animate({"stroke-dashoffset": 0}, 5000,mina.linear);

        // draw ambulance moving on white line
   
        let white_car = white_line.image("https://cdn.protograph.pykih.com/9e058a64d0949988645e/img/amb-icon.png");

        white_car.attr({
          id:"white-obj",
          class:"white-ball"
        });  

        let white_line_group = white_line.g( white_car ),
          movePoint;

        setTimeout( function() {
          Snap.animate(0, lenC, function( value ) {
            movePoint = myPathC.getPointAtLength( value );
             white_line_group.transform( 't' + parseInt(movePoint.x - 585) + ',' + parseInt( movePoint.y - 198) + 'r' + (movePoint.alpha - 120));
          }, 5000,mina.linear);
        });

        // animate white line and ambulance continuously

        setInterval(function(){
          myPathC.attr({
            stroke: '#fff',
            strokeWidth: 3,
            fill: 'none',
            "stroke-dasharray": "283.0320129394531 283.0320129394531",
            "stroke-dashoffset": "283.0320129394531"
          }).animate({"stroke-dashoffset": 0}, 5000,mina.linear);

          setTimeout( function() {
            Snap.animate(0, lenC, function( value ) {
              movePoint = myPathC.getPointAtLength( value );
               white_line_group.transform( 't' + parseInt(movePoint.x - 585) + ',' + parseInt( movePoint.y - 198) + 'r' + (movePoint.alpha - 120));
            }, 5000,mina.linear);
          });
        }, 5000)

        // draw green line

        let green_line = Snap("#green-line"); 
        let myPath = green_line.path("M575 371.014925 580.655172 371.014925 603.275862 375.716418 625.896552 375.716418 657.942529 346.567164 683.390805 331.522388 679.62069 315.537313 685.275862 312.716418 685.275862 303.313433 697.528736 295.791045 700.356322 273.223881 706.011494 261.940299 714.494253 233.731343 724.862069 198 726 195 730 195").attr({
          class: "green-line-path",
          id: "path-1",
          fill: "none",
          strokeWidth: "3",
          stroke: "#00FF83",
          strokeDasharray: "9 9",
          strokeDashOffset: "283.0320129394531"
        });
        let len = myPath.getTotalLength();

        myPath.attr({
          stroke: '#00FF83',
          strokeWidth: 3,
          fill: 'none',
          "stroke-dasharray": "283.0320129394531 283.0320129394531",
          "stroke-dashoffset": "283.0320129394531"
        }).animate({"stroke-dashoffset": 0}, 2500,mina.linear);
   
        let green_car = green_line.image("https://cdn.protograph.pykih.com/9e058a64d0949988645e/img/amb-icon.png");

        green_car.attr({
          id:"green-obj",
          class:"green-ball"
        });  

        let green_line_group = green_line.g( green_car ),
          movePoint1;

        setTimeout( function() {
          Snap.animate(0, lenC, function( value ) {
            movePoint1 = myPath.getPointAtLength( value );
             green_line_group.transform( 't' + parseInt(movePoint1.x - 577) + ',' + parseInt( movePoint1.y - 200) + 'r' + (movePoint1.alpha - 120));
          }, 2500,mina.linear);
        });

        setInterval(function(){
          myPath.attr({
            stroke: '#00FF83',
            strokeWidth: 3,
            fill: 'none',
            "stroke-dasharray": "283.0320129394531 283.0320129394531",
            "stroke-dashoffset": "283.0320129394531"
          }).animate({"stroke-dashoffset": 0}, 2500,mina.linear);

          setTimeout( function() {
            Snap.animate(0, lenC, function( value ) {
              movePoint1 = myPath.getPointAtLength( value );
               green_line_group.transform( 't' + parseInt(movePoint1.x - 577) + ',' + parseInt( movePoint1.y - 200) + 'r' + (movePoint1.alpha - 120));
            }, 2500,mina.linear);
          });
        }, 5000)
      } else {
        console.log("col4")
        // draw white line
        let white_line = Snap("#white-line"); 
        let myPathC = white_line.path("M0 122.538462 4.83225806 122.538462 19.3290323 126 32.4451613 126 51.0441973 108.392652 68.6117167 97.9770379 66.0091212 86.9104478 69.9130145 84.9575201 69.9130145 78.4477612 78.3714498 73.2399541 80.3233964 57.6165327 84.2272896 49.804822 90.0831294 30.2755454 97.240267 5.53846154 98.716129 0 107 0").attr({
          class: "white-line-path",
          id: "path-2",
          fill: "none",
          strokeWidth: "3",
          stroke: "#ffffff",
          strokeDasharray: "9 9",
          strokeDashOffset: "195.697021484375"
        });
        let lenC = myPathC.getTotalLength();

        myPathC.attr({
          stroke: '#fff',
          strokeWidth: 3,
          fill: 'none',
          "stroke-dasharray": "195.697021484375 195.697021484375",
          "stroke-dashoffset": "195.697021484375"
        }).animate({"stroke-dashoffset": 0}, 5000,mina.linear);

        // draw ambulance moving on white line
   
        let white_car = white_line.image("https://cdn.protograph.pykih.com/9e058a64d0949988645e/img/amb-icon.png");

        white_car.attr({
          id:"white-obj",
          class:"white-ball"
        });  

        let white_line_group = white_line.g( white_car ),
          movePoint;

        setTimeout( function() {
          Snap.animate(0, lenC, function( value ) {
            movePoint = myPathC.getPointAtLength( value );
             white_line_group.transform( 't' + parseInt(movePoint.x - 10) + ',' + parseInt( movePoint.y - 15) + 'r' + (movePoint.alpha - 120));
          }, 5000,mina.linear);
        });

        // animate white line and ambulance continuously
        setInterval(function(){
          myPathC.attr({
            stroke: '#fff',
            strokeWidth: 3,
            fill: 'none',
            "stroke-dasharray": "195.697021484375 195.697021484375",
            "stroke-dashoffset": "195.697021484375"
          }).animate({"stroke-dashoffset": 0}, 5000,mina.linear);

          setTimeout( function() {
            Snap.animate(0, lenC, function( value ) {
              movePoint = myPathC.getPointAtLength( value );
               white_line_group.transform( 't' + parseInt(movePoint.x - 10) + ',' + parseInt( movePoint.y - 15) + 'r' + (movePoint.alpha - 120));
            }, 5000,mina.linear);
          });
        }, 5000)

        // draw green line
        let green_line = Snap("#green-line"); 
        let myPath = green_line.path("M0.333658854 128.675354 4.24183953 128.675354 19.8745622 131.924465 35.5072849 131.924465 57.6536421 111.779977 75.2404551 101.382822 72.6350013 90.3358452 76.543182 88.3863787 76.543182 81.8881569 85.0109068 76.6895794 86.9649972 61.0938472 90.8731778 53.295981 96.7354488 33.8013157 103.900447 9.10807292 104.686849 7.03483073 107.451172 7.03483073").attr({
          class: "green-line-path",
          id: "path-1",
          fill: "none",
          strokeWidth: "3",
          stroke: "#00FF83",
          strokeDasharray: "9 9",
          strokeDashOffset: "195.697021484375"
        });
        let len = myPath.getTotalLength();

        myPath.attr({
          stroke: '#00FF83',
          strokeWidth: 3,
          fill: 'none',
          "stroke-dasharray": "195.697021484375 195.697021484375",
          "stroke-dashoffset": "195.697021484375"
        }).animate({"stroke-dashoffset": 0}, 2500,mina.linear);
   
        let green_car = green_line.image("https://cdn.protograph.pykih.com/9e058a64d0949988645e/img/amb-icon.png");

        green_car.attr({
          id:"green-obj",
          class:"green-ball"
        });  

        let green_line_group = green_line.g( green_car ),
          movePoint1;

        setTimeout( function() {
          Snap.animate(0, lenC, function( value) {
            movePoint1 = myPath.getPointAtLength( value );
             green_line_group.transform( 't' + parseInt(movePoint1.x - 6) + ',' + parseInt( movePoint1.y - 20) + 'r' + (movePoint1.alpha - 120));
          }, 2500,mina.linear);
        });

        setInterval(function(){
          myPath.attr({
            stroke: '#00FF83',
            strokeWidth: 3,
            fill: 'none',
            "stroke-dasharray": "195.697021484375 195.697021484375",
            "stroke-dashoffset": "195.697021484375"
          }).animate({"stroke-dashoffset": 0}, 2500,mina.linear);

          setTimeout( function() {
            Snap.animate(0, lenC, function( value ) {
              movePoint1 = myPath.getPointAtLength( value );
               green_line_group.transform( 't' + parseInt(movePoint1.x - 6) + ',' + parseInt( movePoint1.y - 20) + 'r' + (movePoint1.alpha - 120));
            }, 2500,mina.linear);
          });
        }, 5000)
      }
      this.setState({
        animation: false
      })
    }
  }

  handleClick(e){
    document.getElementById('intro-div').style.display = "none";
    document.getElementsByClassName('human-body')[0].style.display = "block"
  }

  handleMobileClick(e){
    document.getElementById('mobile-intro-div').style.top = 0;
    document.getElementById('mobile-intro-div').style.position = 'absolute';
    document.getElementById('mobile-intro-div').style.zIndex = 100;
  }

  handleBackClick(e){
    document.getElementById('mobile-intro-div').style.top = '250px';
  }

  handleHeartClick(e){
    let elem = document.getElementsByClassName('organ-selection-button');
    for (let i=0; i<elem.length; i++){
      elem[i].classList.remove('active-tab')
    }
    document.getElementById('heart').classList.add('active-tab')
    let data = this.state.dataJSON.data;
    this.setState({
      description: data.organ_description.description_for_heart
    })
  }

  handleKidneyClick(e){
    let elem = document.getElementsByClassName('organ-selection-button');
    for (let i=0; i<elem.length; i++){
      elem[i].classList.remove('active-tab')
    }
    document.getElementById('kidney').classList.add('active-tab')
    let data = this.state.dataJSON.data;
    this.setState({
      description: data.organ_description.description_for_kidney
    })
  }

  handleLiverClick(e){
    let elem = document.getElementsByClassName('organ-selection-button');
    for(let i=0; i<elem.length; i++){
      elem[i].classList.remove('active-tab')
    }
    document.getElementById('liver').classList.add('active-tab')
    let data = this.state.dataJSON.data;
    this.setState({
      description: data.organ_description.description_for_liver
    })
  }

  renderCol16() {
    if (this.state.fetchingData ){
      return(<div>Loading</div>)
    } else {
      let data = this.state.dataJSON.data;
      return(
        <div className="organ-cover-area">
          <div className="white-time-text"><span>{data.map_info.line_1_text}</span><br/>{data.map_info.line_1_time}</div>
          <img src={data.cover_image.desktop} className="desktop-cover-image"/>
          <svg id="white-line" className="white-line" width="165px" height="210px" viewBox="0 0 165 198" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs></defs>
            <g id="organ_cover_2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(-576.000000, -185.000000)">
        
            </g>
          </svg>
          <img className="hospital" src="https://cdn.protograph.pykih.com/9e058a64d0949988645e/img/hospital-icon.png"/>
          <div className="source-location">अस्पताल</div>
          <svg id="green-line" className="green-line" width="185px" height="210px" viewBox="0 0 165 200" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs></defs>
            <g id="organ_cover_2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(-571.000000, -191.000000)">
              
            </g>              
          </svg>
          <img className="airport" src="https://cdn.protograph.pykih.com/9e058a64d0949988645e/img/airport-icon.png"/>
          <div className="destination-location">हवाई अड्डा</div>
          <div className="distance-text">{data.map_info.distance}</div>
          <div className="time-text"><span>{data.map_info.line_2_text}</span><br/>{data.map_info.line_2_time}</div>
          <div id="intro-div" className="intro-div">
            <div className="intro-text-title">{data.introduction.title}</div>
            <div className="intro-text">{data.introduction.description}</div>
            <div className="button-text" onClick={(e) => this.handleClick(e)}><strong>{data.introduction.button_text}</strong></div>
          </div>
          <div id="" className="human-body">
            <img src="https://cdn.protograph.pykih.com/9e058a64d0949988645e/img/human-body.png" className="body-img"/>
            <div className="organ-selection">
              <div id="heart" className="organ-selection-button active-tab" onClick={(e)=>{ this.handleHeartClick(e) }}>दिल</div>
              <div id="kidney" className="organ-selection-button" onClick={(e)=>{ this.handleKidneyClick(e) }}>किडनी</div>
              <div id="liver" className="organ-selection-button" onClick={(e)=>{ this.handleLiverClick(e) }}>लीवर</div>
            </div>
            <div className="organ-description">{this.state.description}</div>
          </div>
        </div>
      )
    }
  }

  renderCol4() {
    if (this.state.fetchingData) {
      return (<div>Loading</div>)
    } else {
       let data = this.state.dataJSON.data;
        return(
        <div className="organ-cover-area-mobile">
          <div className="white-time-text"><span>{data.map_info.line_1_text}</span><br/>{data.map_info.line_1_time}</div>
          <img src={data.cover_image.mobile} className="mobile-cover-image"/>
          <svg id="white-line" className="white-line" width="116px" height="150px" viewBox="0 0 116 142" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs></defs>
            <g id="organ_cover_2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(0.000000, 0.000000)">
        
            </g>
          </svg>
          <img className="hospital" src="https://cdn.protograph.pykih.com/9e058a64d0949988645e/img/hospital-icon.png"/>
          <div className="source-location">अस्पताल</div>
          <svg id="green-line" className="green-line" width="116px" height="142px" viewBox="0 0 116 142" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs></defs>
            <g id="organ_cover_2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">

            </g>
          </svg>
          <img className="airport" src="https://cdn.protograph.pykih.com/9e058a64d0949988645e/img/airport-icon.png"/>
          <div className="destination-location">हवाई अड्डा</div>
          <div className="distance-text">{data.map_info.distance}</div>
          <div className="time-text"><span>{data.map_info.line_2_text}</span><br/>{data.map_info.line_2_time}</div>
          <div id="mobile-intro-div" className="mobile-intro-div">
            <div className="intro-text-title">{data.introduction.title}</div>
            <div className="intro-text">{data.introduction.mobile_description}</div>
            <div id="back-button" className="button-text" onClick={(e) => this.handleBackClick(e)}><strong>वापस</strong></div>
          </div>
          <div id="mobile-button" className="button-text" onClick={(e) => this.handleMobileClick(e)}><strong>{data.introduction.button_text}</strong></div>
        </div>
      )
    }
  }

  render() {
    switch(this.props.mode) {
      case 'col16' :
        return this.renderCol16();
        break;
      case 'col4':
        return this.renderCol4();
        break;
    }
  }

  getLanguageTexts(languageConfig) {
    let language = languageConfig ? languageConfig : "hindi",
      text_obj;

    switch(language.toLowerCase()) {
      case "hindi":
        text_obj = {
          font: "'Sarala', sans-serif"
        }
        break;
      default:
        text_obj = {
          font: undefined
        }
        break;
    }
    return text_obj;
  }
}

    // <path className="white-line-path" id="path-2" stroke="#FFFFFF" strokeWidth="3" d="M576 364 583 364 604 369 623 369 649.942529 343.567164 675.390805 328.522388 671.62069 312.537313 677.275862 309.716418 677.275862 300.313433 689.528736 292.791045 692.356322 270.223881 698.011494 258.940299 706.494253 230.731343 716.862069 195 719 187 731 187" strokeDasharray="283.0320129394531, 283.0320129394531" strokeDashoffset="283.0320129394531">
    //           </path>

    // <path className="green-line-path" id="path-1" d="M575 371.014925 580.655172 371.014925 603.275862 375.716418 625.896552 375.716418 657.942529 346.567164 683.390805 331.522388 679.62069 315.537313 685.275862 312.716418 685.275862 303.313433 697.528736 295.791045 700.356322 273.223881 706.011494 261.940299 714.494253 233.731343 724.862069 198 726 195 730 195" stroke="#00FF83" strokeWidth="3">
    //           </path>