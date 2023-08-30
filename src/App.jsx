import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { getMovies, getSeries } from './constants/Api';
import MovieCard from './components/MovieCard/MovieCard';
import { v4 } from 'uuid';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchBar from './components/SearchBar/SearchBar';
import ButtonGroupComponent from './components/ButtonGroup/ButtonGroup';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [filteredMovies, setFilteredMovies] = useState([]);
	const [currentCategory, setCurrentCategory] = useState('1'); // Por defecto, cargar las películas

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
					setFilteredMovies(moviesData.results)
				} else if (currentCategory === '3') {
					moviesData = await getSeries();
					setMovies(moviesData.results);
					setFilteredMovies(moviesData.results);
				}

				// setMovies(moviesData.results);
				// setFilteredMovies(moviesData.results);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [currentCategory]); // Ejecutar el efecto cuando cambie la categoría actual

	const handleSearch = searchTerm => {
		const filtered = movies.filter(
			movie =>
				movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				movie.overview.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredMovies(filtered);
	};

	const handleCategoryChange = category => {
		setCurrentCategory(category); // Cambiar la categoría actual al pulsar un botón
	};

	return (
		<>
			<div className='my-5'>
				<h1 className='text-center '>Buscador de películas</h1>;
				<SearchBar onSearch={handleSearch} />
				<ButtonGroupComponent
					onCategoryChange={handleCategoryChange}
					currentCategory={currentCategory} // Pasar la categoría actual al componente ButtonGroupComponent
				/>
				<Container fluid>
					<Row xs={1} md={3} lg={4} className='g-3'>
						{filteredMovies.map(movie => (
							<Col key={v4()} className='d-flex justify-content-center'>
								<MovieCard movie={movie} />
							</Col>
						))}
					</Row>
				</Container>
			</div>
		</>
	);
};

export default App;
