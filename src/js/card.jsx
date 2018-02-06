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
          optionalConfigSchemaJSON: opt_config_schema.data,
          languageTexts: this.getLanguageTexts(card.data.data.language)
        });
      }));
      this.showCounter();
    }
  }

  showCounter() {
    setTimeout(function(){
      $('.single-counter').each(function () {
        $(this).prop('Counter',0).animate({
          Counter: $(this).text()
        },{
            duration: 2000,
            easing: 'swing',
            step: function (now) {
              $(this).text(Math.ceil(now));
            }
        });
      });
    },100)
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

  renderCol16() {
    if (this.state.fetchingData ){
      return(<div>Loading</div>)
    } else {
      let data = this.state.dataJSON.data;
      return(
        <div className="organ-cover-area">
          <div className="tab-buttons">
            <div className="single-tab">सामान्य रास्ता</div>
            <div className="single-tab active-tab right-tab"> ग्रीन कॉरिडोर</div>
          </div>
          <img src="organ_cover_background.png" className="desktop-cover-image"/>
          <svg className="white-line" width="165px" height="194px" viewBox="0 0 165 194" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs></defs>
            <g id="organ_cover_2" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd" transform="translate(-572.000000, -181.000000)">
              <polyline className="white-line-path" id="Path-2" stroke="#ffffff" strokeWidth="1" points="572 368.298507 577.655172 368.298507 600.275862 373 622.896552 373 654.942529 343.850746 680.390805 328.80597 676.62069 312.820896 682.275862 310 682.275862 300.597015 694.528736 293.074627 697.356322 270.507463 703.011494 259.223881 711.494253 231.014925 721.862069 195.283582 724.689655 184 736 189.641791"></polyline>
            </g>
          </svg>
          <svg className="green-line" width="165px" height="194px" viewBox="0 0 165 194" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs></defs>
            <g id="organ_cover_2" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd" transform="translate(-572.000000, -181.000000)">
              <polyline className="green-line-path" id="Path-2" stroke="green" strokeWidth="2" points="572 368.298507 577.655172 368.298507 600.275862 373 622.896552 373 654.942529 343.850746 680.390805 328.80597 676.62069 312.820896 682.275862 310 682.275862 300.597015 694.528736 293.074627 697.356322 270.507463 703.011494 259.223881 711.494253 231.014925 721.862069 195.283582 724.689655 184 736 189.641791"></polyline>
            </g>
          </svg>
          <div className="organ-selection">
            <div className="organ-selection-button active-tab">दिल</div>
            <div className="organ-selection-button">किडनी</div>
            <div className="organ-selection-button">लीवर</div>
            <div className="organ-selection-button mobile-more-info-button"><span className="info-icon">i</span></div>
          </div>
          <div className="distance-text">11 km</div>
          <div className="time-text"><span>रीन कॉरिडोर के जरिए</span><br/>7 Min</div>
          <div className="intro-text">
            बीते दो साल में इंदौर प्राधिकरण ने ग्रीन कॉरिडर की संख्या इतनी बढ़ा दी की शहर ने अब देश के बड़े शहरों को अंग दान में पछाड़ दिया है। बीते दो साल में इंदौर प्राधिकरण ने ग्रीन कॉरिडर की संख्या इतनी बढ़ा दी की शहर ने अब देश के बड़े शहरों को अंग दान में पछाड़ दिया है। बीते दो साल में इंदौर प्राधिकरण ने ग्रीन कॉरिडर की संख्या इतनी बढ़ा दी की शहर ने अब देश के बड़े शहरों को अंग दान में पछाड़ दिया है।
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
        <div className="ms-cover">
          <div className="banner-image-div">
            <img src={data.banner_image.desktop}/>
          </div>
          <div className="employed-counter counter">
            <div className="single-counter ec-1">2</div>
            <div className="single-counter ec-2">1</div>
            <div className="single-counter ec-3">3</div>
            <div className="single-counter ec-4">7</div>
          </div>
          <div className="killed-counter counter">
            <div className="single-counter kc-1">4</div>
            <div className="single-counter kc-2">1</div>
            <div className="single-counter kc-3">4</div>
          </div>
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
}
