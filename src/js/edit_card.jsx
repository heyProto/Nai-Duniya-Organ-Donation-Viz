import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Card from './card.jsx';
import JSONSchemaForm from '../../lib/js/react-jsonschema-form';

export default class editToStinkCoverVizCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      dataJSON: {},
      mode: "col16",
      publishing: false,
      schemaJSON: undefined,
      fetchingData: true,
      optionalConfigJSON: {},
      optionalConfigSchemaJSON: undefined,
      uiSchemaJSON: {}
    }
    this.toggleMode = this.toggleMode.bind(this);
  }

  exportData() {
    let getDataObj = {
      step: this.state.step,
      dataJSON: this.state.dataJSON,
      schemaJSON: this.state.schemaJSON,
      optionalConfigJSON: this.state.optionalConfigJSON,
      optionalConfigSchemaJSON: this.state.optionalConfigSchemaJSON
    }
    getDataObj["name"] = getDataObj.dataJSON.data.introduction.title.substr(0,225); // Reduces the name to ensure the slug does not get too long
    return getDataObj;
  }

  componentDidMount() {
    // get sample json data based on type i.e string or object.
    if (this.state.fetchingData){
      axios.all([
        axios.get(this.props.dataURL),
        axios.get(this.props.schemaURL),
        axios.get(this.props.optionalConfigURL),
        axios.get(this.props.optionalConfigSchemaURL),
        axios.get(this.props.uiSchemaURL)
      ])
      .then(axios.spread((card, schema, opt_config, opt_config_schema, uiSchema) => {
        let stateVars = {
          fetchingData: false,
          dataJSON: card.data,
          schemaJSON: schema.data,
          optionalConfigJSON: opt_config.data,
          optionalConfigSchemaJSON: opt_config_schema.data,
          uiSchemaJSON: uiSchema.data,
          description: card.data.data.organ_description.description_for_heart
        }
        this.setState(stateVars);
      }));
    }
  }

  onChangeHandler({formData}) {
    switch (this.state.step) {
      case 1:
        this.setState((prevStep, prop) => {
          let dataJSON = prevStep.dataJSON;
          dataJSON.data.cover_image = formData;
          return {
            dataJSON: dataJSON
          }
        })
        break;
      case 2:
        this.setState((prevState, prop) => {
          let dataJSON = prevState.dataJSON;
          dataJSON.data.introduction = formData;
          return {
            dataJSON: dataJSON
          }
        })
        break;
      case 3:
        this.setState((prevState, prop) => {
          let dataJSON = prevState.dataJSON;
          dataJSON.data.map_info = formData;
          return {
            dataJSON: dataJSON
          }
        })
        break;
      case 4:
        this.setState((prevState, prop) => {
          let dataJSON = prevState.dataJSON;
          dataJSON.data.organ_description = formData;
          return {
            dataJSON: dataJSON
          }
        })
        break;
    }
  }

   onSubmitHandler({formData}) {
    switch(this.state.step) {
      case 1:
      case 2:
      case 3:
        this.setState((prevStep, prop) => {
          return {
            step: prevStep.step + 1
          }
        });
        break;
      case 4:
        if (typeof this.props.onPublishCallback === "function") {
          this.setState({ publishing: true });
          let publishCallback = this.props.onPublishCallback();
          publishCallback.then((message) => {
            this.setState({ publishing: false });
          });
        }
        break;
    }
  }

  renderSEO() {
    let d = this.state.dataJSON.data;
    let seo_blockquote = '<blockquote>'+ d.introduction.title + d.introduction.description +'</blockquote>'
    return seo_blockquote;
  }

  getFormData() {
    switch(this.state.step) {
      case 1:
        return this.state.dataJSON.data.cover_image;
        break;
      case 2:
        return this.state.dataJSON.data.introduction;
        break;
      case 3:
        // console.log(this.state.dataJSON.data.data_points, "4th step sample")
        return this.state.dataJSON.data.map_info;
        break;
      case 4:
        // console.log(this.state.dataJSON.data.data_points, "4th step sample")
        return this.state.dataJSON.data.organ_description;
        break;
    }
  }

  getSchemaJSON() {
    switch(this.state.step){
      case 1:
        // console.log(this.state.schemaJSON, "1th step schema")
        return this.state.schemaJSON.properties.data.properties.cover_image;
        break;
      case 2:
        // console.log(this.state.schemaJSON, "1th step schema")
        return this.state.schemaJSON.properties.data.properties.introduction;
        break;
      case 3:     
        // console.log(this.state.schemaJSON, "4th step schema")   
        return this.state.schemaJSON.properties.data.properties.map_info;
        break;
      case 4:     
        // console.log(this.state.schemaJSON, "4th step schema")   
        return this.state.schemaJSON.properties.data.properties.organ_description;
        break;
    }
  }

  showLinkText() {
    switch(this.state.step) {
      case 1:
      case 2:
      case 3:
        return '';
        break;
      case 4:
        return '< Back';
        break;
    }
  }

  showButtonText() {
    switch(this.state.step) {
      case 1:
      case 2:
      case 3:
        return 'Next';
        break;
      case 4:
        return 'Publish';
        break;
    }
  }

  getUISchemaJSON() {
    switch(this.state.step) {
      case 1:
      case 2:
      case 3:
      case 4:
        return {}
        break;
      default:
        return {};
        break;
    }
  }

  onPrevHandler() {
    let prev_step = --this.state.step;
    this.setState({
      step: prev_step
    });
  }

  toggleMode(e) {
    let element = e.target.closest('a'),
      mode = element.getAttribute('data-mode');

    this.setState((prevState, props) => {
      let newMode;
      if (mode !== prevState.mode) {
        newMode = mode;
      } else {
        newMode = prevState.mode
      }

      return {
        mode: newMode
      }
    })
  }

  render() {
    if (this.state.fetchingData) {
      return(<div>Loading</div>)
    } else {
      return (
        <div className="proto-container">
          <div className="ui grid form-layout">
            <div className="row">
              <div className="four wide column proto-card-form protograph-scroll-form">
                <div>
                  <div className="section-title-text">Fill the form</div>
                  <div className="ui label proto-pull-right">
                    toOrganCoverVizCard
                  </div>
                </div>
                <JSONSchemaForm schema={this.getSchemaJSON()}
                  onSubmit={((e) => this.onSubmitHandler(e))}
                  onChange={((e) => this.onChangeHandler(e))}
                  uiSchema={this.getUISchemaJSON()}
                  formData = {this.getFormData()}>
                  <br/>
                  <a id="protograph-prev-link" className={`${this.state.publishing ? 'protograph-disable' : ''}`} onClick={((e) => this.onPrevHandler(e))}>{this.showLinkText()} </a>
                  <button type="submit" className={`${this.state.publishing ? 'ui primary loading disabled button' : ''} default-button protograph-primary-button`}>{this.showButtonText()}</button>
                </JSONSchemaForm>
              </div>
              <div className="twelve wide column proto-card-preview proto-share-card-div">
                <div className="protograph-menu-container">
                  <div className="ui compact menu">
                    <a className={`item ${this.state.mode === 'col16' ? 'active' : ''}`}
                      data-mode='col16'
                      onClick={this.toggleMode}
                    >
                      Col16
                    </a>
                    <a className={`item ${this.state.mode === 'col4' ? 'active' : ''}`}
                      data-mode='col4'
                      onClick={this.toggleMode}
                    >
                      Col4
                    </a>
                  </div>
                </div>
                <div className="protograph-app-holder">
                  <Card
                    mode={this.state.mode}
                    dataJSON={this.state.dataJSON}
                    schemaJSON={this.state.schemaJSON}
                    optionalConfigJSON={this.state.optionalConfigJSON}
                    optionalConfigSchemaJSON={this.state.optionalConfigSchemaJSON}
                    desc={this.state.description}
                    animation={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
