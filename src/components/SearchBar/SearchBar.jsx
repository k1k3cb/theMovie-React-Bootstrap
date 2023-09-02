import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, cleanSearch }) => {
	const [search, setSearch] = useState('');

	useEffect(() => {
		if (cleanSearch) {
			clearSearch();
		}
	}, [cleanSearch]);

	const searchedWord = e => {
		const searchTerm = e.target.value;
		// console.log(searchTerm);
		setSearch(searchTerm);
		onSearch(searchTerm);
	};

	const clearSearch = () => {
		setSearch('');
		onSearch(''); // Esto vaciará la búsqueda
	};

	return (
		<InputGroup className='mb-5 w-75 m-auto'>
			<InputGroup.Text>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='16'
					height='16'
					fill='currentColor'
					className='bi bi-search'
					viewBox='0 0 16 16'
				>
					<path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
				</svg>
			</InputGroup.Text>
			<Form.Control
				placeholder='Búsqueda por Título | Overview | Título Original'
				value={search}
				onChange={searchedWord}
			/>
		</InputGroup>
	);
};

export default SearchBar;
