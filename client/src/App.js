import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import Signin from './components/signin/Signin';
import Register from './components/register/Register';
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
			imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
		}
	}

  componentDidmount() {
    fetch('http://localhost:3000')
    .then(response => response.json())
    .then(console.log)
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(height,width);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}
//listen for image link submission and call the Clarifai API to find a human face on the picture. 
	onButtonSubmit = () => {
		console.log('click');
		this.setState({imageUrl: this.state.input});
			app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    	.catch(err => console.log(err));
	}

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route });
  }
// Render method for components. 
  render() {
    return (
      <div className="App">
      <Particles  className='particles' params={particlesOpt}/>
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
      {this.state.route === 'home' ?
          <div>
            <Logo /> 
            <Rank />
            <ImageLinkForm onInputChange= {this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={this.state.box} imageUrl ={this.state.imageUrl}/>  
          </div>
          : (

            this.state.route === 'signin' 
            ? <Signin onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;
