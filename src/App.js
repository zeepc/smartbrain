import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import Clarifai from 'clarifai';
import Rank from './components/rank/Rank';
import ImageLinkForm  from './components/imagelinkform/ImageLinkForm';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Particles from 'react-particles-js';
import './App.css';
import 'tachyons';


//define the app for Clarifai API, and add the API key. 
const app = new Clarifai.App({
 apiKey:process.env.REACT_APP_CLARIFAI_API_KEY
});

//Particles.js background properties.
const particlesOpt = {
            		particles: {
            			number:{
            				value: 60,
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
			imageUrl: ''
		}
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}
//listen for image link submission and call the Clarifai API to find a human face on the picture. 
	onButtonSubmit = () => {
		console.log('click');
		this.setState({imageUrl: this.state.input});
			app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
    		function(response) {
      	// do something with response
        console.log(response)
    	},
    	function(err) {
      console.log('errrorroorroorororro!!!!!')
    }
  	);
	}
// Render method for components. 
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
      <FaceRecognition  imageUrl = {this.state.imageUrl}/> 
      </div>
    );
  }
}

export default App;
