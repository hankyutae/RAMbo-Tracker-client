import React, { Component } from "react";
import API from '../../services/api-service';
import DatePicker from "react-datepicker";
import helper from "../../services/helper.services";
import "react-datepicker/dist/react-datepicker.css";
import "./Symptom.css";
import faces from '../../Media/FACES_NewBW.jpg'
import face1 from '../../Media/single_face1.png'
import face2 from '../../Media/single_face2.png'
import face3 from '../../Media/single_face3.png'
import face4 from '../../Media/single_face4.png'
import face5 from '../../Media/single_face5.png'

class Symptom extends Component {
  state = {
    symptomName: "",
    symptomSeverity: 4,
    symptomTime: new Date(),
    pastUserSymptoms: [],
    pastSymptomVal: "",
    symptomSelectIsHidden: false,
    symptomInputDisabled: false
  };

  componentDidMount() {
    /* Api.doFetch('TODO')
    .then(res => { */
    //})
    this.setState({ pastUserSymptoms: helper.preExisting() });
    //})
    //.catch(e => console.log(e))
  }

  handleSymptomSubmit = e => {
    e.preventDefault();
    let sym = {};
    sym.type='symptom';
    sym.symptom = e.target["user-symptom"].value;
    sym.severity = this.state.symptomSeverity;
    sym.time = this.state.symptomTime;
    sym.symptom = this.state.pastSymptomVal ? this.state.pastSymptomVal : sym.symptom;
    API.doFetch('/event','POST',sym).then(res=>{
      /* res.name = res.type; */
      console.log(res);
      this.props.updateEvents(res);
      this.props.closeModal('addSymptomsModal');//this functions is passed in from dashboard to close the modal, it should be placed int the 'then' of api call to ensure it only runs in happy case 
     }).catch((res)=> {
     console.log(res)
     this.setState({error: res.error})}); 
  };

  handleTimeChange = date => {
    this.setState({
      symptomTime: date
    });
  };

  handleSeverityChange = sev => {
    console.log(sev.target.value);
    this.setState({
      symptomSeverity: sev.target.value
    });
  };

  handleSymptomChange = sym => {
    this.setState({
      pastSymptomVal: sym.target.value
    });
  };

  addSymptomClick = e => {
    e.preventDefault();
    const symptomSelectIsHidden = this.state.symptomSelectIsHidden;
    this.setState({
      symptomSelectIsHidden: !symptomSelectIsHidden,
      symptomInputDisabled: true
    });
  };

  render() {
    let savedSymptoms = this.state.pastUserSymptoms.map((item, index) => {
      return (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      );
    });

    return (
      <div className="symptom-container">
      <section className="symptom-container">
        <h2>Log a Symptom</h2>
        <form onSubmit={e => this.handleSymptomSubmit(e)}>
          <div id="user-input-container">
            <label htmlFor="user-symptom">Add New Symptom</label>
            <br />
            <input
              name="symptom"
              id="user-symptom"
              type="text"
              placeholder="bloated.."
              disabled={this.state.symptomSelectIsHidden}
            />
          </div>

          <div id="select">
            <button id="select-preexisting" className='user-button' onClick={e => this.addSymptomClick(e)}>
              Choose Saved Symptom
            </button>
            {this.state.symptomSelectIsHidden ? (
              <>
                <label htmlFor="symptom-select"></label>
                <select
                  id="symptom-select"
                  onChange={this.handleSymptomChange}
                  value={this.state.pastSymptomVal}
                >
                  {savedSymptoms}
                </select>{" "}
              </>
            ) : (
              <></>
            )}
          </div>

          <div id="date">
            <label htmlFor="date-select">Date and Time:</label>
            <DatePicker
              id="date-select"
              selected={this.state.symptomTime}
              onChange={this.handleTimeChange}
              showTimeSelect
              withPortal
              dateFormat="Pp"
            />
          </div>

          <label 
              id='radio-label'
              htmlFor='radio'>
              Rate the Severity
            </label>
            <br/>
          <div className='radio-container'>

              <div className='radio-buttons-1'>
                <label className='radio-label'> 
                  <input id='radio-1' type='radio' value='1' 
                    checked={this.state.symptomSeverity === '1'}
                    onChange={e => this.handleSeverityChange(e)} />
                  <img className='face' src={face1} alt='face1'/>
                </label>
              </div>

              <div className='radio-buttons-2'>
                <label className='radio-label'> 
                  <input id='radio-1' type='radio' value='2'
                  checked={this.state.symptomSeverity === '2'}
                  onChange={e => this.handleSeverityChange(e)} />
                  <img className='face' src={face2} alt='face1'/>
                </label>
              </div>

              <div className='radio-buttons-3'>
                <label className='radio-label'> 
                  <input id='radio-1' type='radio' value='3'
                  checked={this.state.symptomSeverity === '3'}
                  onChange={e => this.handleSeverityChange(e)} />
                  <img className='face' src={face3} alt='face1'/>
                </label>
              </div>

              <div className='radio-buttons-4'>
                <label className='radio-label'> 
                  <input id='radio-1' type='radio' value='4'
                  checked={this.state.symptomSeverity === '4'}
                  onChange={e => this.handleSeverityChange(e)} />
                  <img className='face' src={face4} alt='face1'/>
                </label>
              </div>

              <div className='radio-buttons-5'>
                <label className='radio-label'> 
                  <input id='radio-1' type='radio' value='5'
                  checked={this.state.symptomSeverity === '5'}
                  onChange={e => this.handleSeverityChange(e)} />
                  <img className='face' src={face5} alt='face1'/>
                </label>
              </div>
        
              
          </div>
              {/* <img className="wong-severity" src={faces} alt=""/> */}
            {/* <p id="severity-desc">(Low - Extreme)</p>   */}
          

          <br />
          {this.state.error && <h3 className='symptom-error'>{this.state.error}</h3>}
          <div id='submit-button'>
            <button className="user-button" type="submit">
              Submit Symptom
            </button>
          </div>
        </form>
      </section>
      </div>
    );
  }
}

export default Symptom;
