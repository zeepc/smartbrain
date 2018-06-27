import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import ImageLinkForm  from './components/imagelinkform/ImageLinkForm';
import Particles from 'react-particles-js';
import './App.css';
import 'tachyons';


const particlesOpt = {
            		particles: {
            			number:{
            				value: 40,
            				density: {
            					enable: true,
            					value_area: 800
            				}
            			}
            		}
            	}

class App extends Component {
	constructor(){
		super();
		this.state= {
			input: '',
		}
	}

	onInputChange = (event) => {
		console.log(event.target.value);
	}

	onButtonSubmit = () => {
		console.log('click');
	}

  render() {
    return (
      <div className="App">
      <Particles  className= 'particles' params={particlesOpt}/>
      <Navigation />
      <Logo /> 
      <Rank />
      <ImageLinkForm 
      onInputChange= {this.onInputChange} 
      onButtonSubmit={this.onButtonSubmit}/>
      {/*
      <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
