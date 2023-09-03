import { useEffect, useState } from 'react';

import { v4 } from 'uuid';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { getMovies, getSeries } from '../../constants/Api';
import SearchBar from '../SearchBar/SearchBar';
import MovieCard from '../MovieCard/MovieCard';
import ButtonGroupComponent from '../ButtonGroup/ButtonGroup';

const MainComponent = ({ movies, setMovies }) => {	
	const [filteredMovies, setFilteredMovies] = useState([]);
	const [currentCategory, setCurrentCategory] = useState('1');
	const [noResults, setNoResults] = useState(false);
	const [cleanSearchInput, setCleanSearchInput] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let moviesData;
				if (currentCategory === '1') {
					moviesData = await getMovies();
					const top10Movies = moviesData.results.slice(0, 10);
					setMovies(top10Movies);
					setFilteredMovies(top10Movies);
				} else if (currentCategory === '2') {
					moviesData = await getMovies();
					setMovies(moviesData.results);
					setFilteredMovies(moviesData.results);
				} else if (currentCategory === '3') {
					moviesData = await getSeries();
					setMovies(moviesData.results);
					setFilteredMovies(moviesData.results);
				}

				setNoResults(false);
				setCleanSearchInput(true);
			} catch (error) {
				console.log(error);
			}
		};

		console.log('filteredMovies:', filteredMovies);
		console.log('movies:', movies);

		fetchData();
	}, [currentCategory]); // Ejecutar el efecto cuando cambie la categoría actual

	const handleSearch = searchTerm => {
		const filtered = movies.filter(movie => {
			const title = movie.title ? movie.title.toLowerCase() : ''; // Verificar si movie.title es undefined
			const overview = movie.overview ? movie.overview.toLowerCase() : ''; // Verificar si movie.overview es undefined
			const originalTitle = movie.original_title
				? movie.original_title.toLowerCase()
				: ''; // Verificar si movie.original_title es undefined
			const originalName = movie.original_name
				? movie.original_name.toLowerCase()
				: ''; // Verificar si movie.original_name es undefined

			return (
				title.includes(searchTerm.toLowerCase()) ||
				overview.includes(searchTerm.toLowerCase()) ||
				originalTitle.includes(searchTerm.toLowerCase()) ||
				originalName.includes(searchTerm.toLowerCase())
			);
		});
		//guardamos el resultado de la busqueda
		setFilteredMovies(filtered);

		// Verificar si no hay resultados
		if (filtered.length === 0) {
			setNoResults(true);
		} else {
			setNoResults(false);
		}
	};

	//al pulsar en el boton cambiamos la categoria
	const handleCategoryChange = category => {
		setCurrentCategory(category);
		setCleanSearchInput(false);
	};
	return (
		<div className='my-5'>
			<h1 className='text-center '>Buscador de películas</h1>;
			<SearchBar onSearch={handleSearch} cleanSearch={cleanSearchInput} />
			<ButtonGroupComponent
				onCategoryChange={handleCategoryChange}
				currentCategory={currentCategory} // Pasar la categoría actual al componente ButtonGroupComponent
			/>
			<Container fluid>
				<Row xs={1} md={3} lg={4} className='g-3 '>
					{filteredMovies.length === 0 ? (
						<h3 className='text-center w-100 text-white'>
							No se encontraron resultados.
						</h3>
					) : (
						filteredMovies.map(movie => (
							<Col key={v4()} className='d-flex justify-content-center'>
								<MovieCard movie={movie} />
							</Col>
						))
					)}
				</Row>
			</Container>
		</div>
	);
};

export default MainComponent;
