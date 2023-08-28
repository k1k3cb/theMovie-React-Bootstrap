import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { getMovies } from './constants/Api';
import MovieCard from './components/MovieCard/MovieCard';
import { v4 } from 'uuid';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const App = () => {
	const [movies, setMovies] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const moviesData = await getMovies();
				console.log(moviesData);
				setMovies(moviesData.results);
				// console.log(movies.results[0].id)
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	return (
		<>
			<h1>Núcleo de la aplicación</h1>;
			<Container fluid  >
				<Row xs={1} md={3} lg={4} className='g-3'>
					{movies.map(movie => (
						<Col key={v4()} className='d-flex justify-content-center'>
							<MovieCard movie={movie} />
						</Col>
					))}
				</Row>
			</Container>
		</>
	);
};

export default App;
