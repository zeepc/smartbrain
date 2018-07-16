import React from 'react';

//FaceRecognition component. Uses Clarifai API.
const FaceRecognition = ({ imageUrl }) => {
	return (
		<div className='center pa4 ma'> 
			<div className='absolute mt2'>
			<img alt='' src={imageUrl} width='500px' height='auto' />
			</div>
		</div>

	);
}

export default FaceRecognition;