import React from 'react';
import './FaceRecognition.css';

//FaceRecognition component. Uses Clarifai API.
const FaceRecognition = ({ imageUrl, box }) => {
	return (
		<div className='center pa4 ma'> 
			<div className='absolute mt2'>
			<img id='inputimage' alt='' src={imageUrl} width='500px' height='auto' />
				<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
				</div>
			</div>
		</div>

	);
}

export default FaceRecognition;