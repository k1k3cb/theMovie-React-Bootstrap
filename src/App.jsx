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
	const [currentCategory, setCurrentCategory] = useState('1');
	const [noResults, setNoResults] = useState(false);
	
	useEffect(() => {
		const fetchData = async () => {
			try {
				let moviesData;
				if (currentCategory === '1') {
					moviesData = await getMovies();
					const top10Movies = moviesData.results.slice(0, 10);
					setMovies(top10Movies);
					setFilteredMovies(top10Movies);
					console.log(moviesData.results);
				} else if (currentCategory === '2') {
					moviesData = await getMovies();
					setMovies(moviesData.results);
					setFilteredMovies(moviesData.results);
				} else if (currentCategory === '3') {
					moviesData = await getSeries();
					setMovies(moviesData.results);
					setFilteredMovies(moviesData.results);
					console.log(moviesData.results);
				}
				setNoResults(false);
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
				movie.overview.toLowerCase().includes(searchTerm.toLowerCase()) ||
				movie.original_title.toLowerCase().includes(searchTerm.toLowerCase()) || // Corrección aquí
				(movie.original_name &&
					movie.original_name.toLowerCase().includes(searchTerm.toLowerCase()))
		);
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
		setSearch('')
	};

	return (
		<>
			<div className='my-5'>
				<h1 className='text-center '>Buscador de películas</h1>;
				<SearchBar onSearch={handleSearch}  />
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
		</>
	);
};

export default App;
