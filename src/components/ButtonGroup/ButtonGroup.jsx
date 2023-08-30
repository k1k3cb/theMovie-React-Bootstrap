import { useState } from 'react';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const ButtonGroupComponent = ({ onCategoryChange, currentCategory }) => {
	// const [radioValue, setRadioValue] = useState('1');

	const radios = [
		{ name: 'Top 10 películas', value: '1' },
		{ name: 'Películas', value: '2' },
		{ name: 'Series', value: '3' }
	];
	return (
		<div className='text-center'>
			<ButtonGroup size='lg' className='mb-5 shadow '>
				{radios.map((radio, idx) => (
					<ToggleButton
						key={idx}
						id={`radio-${idx}`}
						type='radio'
						variant={idx % 2 ? 'outline-primary' : 'outline-success'}
						name='radio'
						value={radio.value}
						checked={currentCategory  === radio.value}
						onChange={() => onCategoryChange(radio.value)}
					>
						{radio.name}
					</ToggleButton>
				))}
			</ButtonGroup>
		</div>
	);
};

export default ButtonGroupComponent;
