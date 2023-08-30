import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { getMovies } from './constants/Api';
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


	useEffect(() => {
		const fetchData = async () => {
			try {
				const moviesData = await getMovies();
				console.log(moviesData);
				setMovies(moviesData.results);
				setFilteredMovies(moviesData.results);
				// console.log(movies.results[0].id)
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);


	const handleSearch = (searchTerm) => {
		const filtered = movies.filter(
			(movie) =>
				movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				movie.overview.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredMovies(filtered);
	};

	return (
		<>
		<div className='my-5'>
			<h1 className='text-center '>Buscador de películas</h1>;
			<SearchBar onSearch={handleSearch}/>
			<ButtonGroupComponent  />
			<Container fluid>
				<Row xs={1} md={3} lg={4} className='g-3'>
					{filteredMovies.map(movie => (
						<Col key={v4()} className='d-flex justify-content-center'>
							<MovieCard movie={movie} />
						</Col>
					))}
				</Row>
			</Container></div>
		</>
	);
};

export default App;
