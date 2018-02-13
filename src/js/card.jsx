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
      languageTexts: undefined
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
          optionalConfigSchemaJSON: opt_config_schema.data
        });
      }));
    }
  }

  renderCol16() {
    if (this.state.fetchingData ){
      return(<div>Loading</div>)
    } else {
      let data = this.state.dataJSON.data;
      console.log(data, "data")
      return(
        <div className="organ-cover-area">
          <div className="white-time-text"><span>{data.map_info.line_1_text}</span><br/>{data.map_info.line_1_time}</div>
          <img src={data.cover_image.desktop} className="desktop-cover-image"/>
          <svg className="white-line" width="165px" height="194px" viewBox="0 0 165 194" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs></defs>
            <g id="organ_cover_2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(-576.000000, -185.000000)">
              <polyline className="white-line-path" id="Path-2-Copy-2" stroke="#FFFFFF" strokeWidth="3" points="576 364 583 364 604 369 623 369 649.942529 343.567164 675.390805 328.522388 671.62069 312.537313 677.275862 309.716418 677.275862 300.313433 689.528736 292.791045 692.356322 270.223881 698.011494 258.940299 706.494253 230.731343 716.862069 195 719 187 731 187"></polyline>
            </g>
          </svg>
          <svg className="green-line" width="165px" height="194px" viewBox="0 0 165 194" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <polyline className="green-line-path" id="path-1" points="575 371.014925 580.655172 371.014925 603.275862 375.716418 625.896552 375.716418 657.942529 346.567164 683.390805 331.522388 679.62069 315.537313 685.275862 312.716418 685.275862 303.313433 697.528736 295.791045 700.356322 273.223881 706.011494 261.940299 714.494253 233.731343 724.862069 198 726 195 730 195"></polyline>
              <filter x="-5.5%" y="-3.6%" width="111.0%" height="109.4%" filterUnits="objectBoundingBox" id="filter-2">
                  <feMorphology radius="1.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                  <feOffset dx="0" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                  <feMorphology radius="1.5" operator="erode" in="SourceAlpha" result="shadowInner"></feMorphology>
                  <feOffset dx="0" dy="2" in="shadowInner" result="shadowInner"></feOffset>
                  <feComposite in="shadowOffsetOuter1" in2="shadowInner" operator="out" result="shadowOffsetOuter1"></feComposite>
                  <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                  <feColorMatrix values="0 0 0 0 0.0117647059   0 0 0 0 0.933333333   0 0 0 0 0.219607843  0 0 0 0.543195199 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
              </filter>
            </defs>
            <g id="organ_cover_2" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd" transform="translate(-571.000000, -191.000000)">
                <g id="Path-2-Copy">
                    <use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1"></use>
                    <use stroke="#01EF36" strokeWidth="3" xlinkHref="#path-1"></use>
                </g>
            </g>
          </svg>
          <div className="organ-selection">
            <div className="organ-selection-button">दिल</div>
            <div className="organ-selection-button">किडनी</div>
            <div className="organ-selection-button">लीवर</div>
            <div className="organ-selection-button mobile-more-info-button"><span className="info-icon">i</span></div>
          </div>
          <div className="distance-text">{data.map_info.distance}</div>
          <div className="time-text"><span>{data.map_info.line_2_text}</span><br/>{data.map_info.line_2_time}</div>
          <div className="intro-text">{data.map_info.description}</div>
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
          <svg className="white-line" width="165px" height="194px" viewBox="0 0 165 194" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs></defs>
            <g id="organ_cover_2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(-576.000000, -185.000000)">
              <polyline className="white-line-path" id="Path-2-Copy-2" stroke="#FFFFFF" strokeWidth="3" points="576 364 583 364 604 369 623 369 649.942529 343.567164 675.390805 328.522388 671.62069 312.537313 677.275862 309.716418 677.275862 300.313433 689.528736 292.791045 692.356322 270.223881 698.011494 258.940299 706.494253 230.731343 716.862069 195 719 187 731 187"></polyline>
            </g>
          </svg>
          <svg className="green-line" width="165px" height="194px" viewBox="0 0 165 194" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <polyline className="green-line-path" id="path-1" points="575 371.014925 580.655172 371.014925 603.275862 375.716418 625.896552 375.716418 657.942529 346.567164 683.390805 331.522388 679.62069 315.537313 685.275862 312.716418 685.275862 303.313433 697.528736 295.791045 700.356322 273.223881 706.011494 261.940299 714.494253 233.731343 724.862069 198 726 195 730 195"></polyline>
              <filter x="-5.5%" y="-3.6%" width="111.0%" height="109.4%" filterUnits="objectBoundingBox" id="filter-2">
                  <feMorphology radius="1.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                  <feOffset dx="0" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                  <feMorphology radius="1.5" operator="erode" in="SourceAlpha" result="shadowInner"></feMorphology>
                  <feOffset dx="0" dy="2" in="shadowInner" result="shadowInner"></feOffset>
                  <feComposite in="shadowOffsetOuter1" in2="shadowInner" operator="out" result="shadowOffsetOuter1"></feComposite>
                  <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                  <feColorMatrix values="0 0 0 0 0.0117647059   0 0 0 0 0.933333333   0 0 0 0 0.219607843  0 0 0 0.543195199 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
              </filter>
            </defs>
            <g id="organ_cover_2" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd" transform="translate(-571.000000, -191.000000)">
                <g id="Path-2-Copy">
                    <use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1"></use>
                    <use stroke="#01EF36" strokeWidth="3" xlinkHref="#path-1"></use>
                </g>
            </g>
          </svg>
          <div className="distance-text">{data.map_info.distance}</div>
          <div className="time-text"><span>{data.map_info.line_2_text}</span><br/>{data.map_info.line_2_time}</div>
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