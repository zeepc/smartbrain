import React from 'react';

//FaceRecognition component. Uses Clarifai API.
const FaceRecognition = ({ imageUrl}) => {
	return (
		<div className='center pa4'> 
			<img alt='' src={'https://samples.clarifai.com/face-det.jpg'}/>
		</div>

	);
}

export default FaceRecognition;