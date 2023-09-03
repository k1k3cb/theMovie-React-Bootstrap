import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';

const SingleMovie = ({ movies }) => {
	const { id } = useParams();
	const numericId = parseInt(id, 10);
	const [movie, setMovie] = useState(null);

	useEffect(() => {
		const foundMovie = movies.find(movie => movie.id === numericId);
		console.log('id:', id);
		console.log('numericId:', numericId);
		console.log('movies:', movies);
		console.log('foundMovie:', foundMovie);
		setMovie(foundMovie);
	}, [numericId, movies]);

	if (!movie) {
		// Si aún no hemos encontrado la película, puedes mostrar un mensaje de carga o de error.
		return <p>Cargando...</p>;
	}

	return (
		<Card style={{ width: '18rem' }}>
			<Card.Img
				variant='top'
				src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
			/>
			<Card.Body>
				<Card.Title>{movie.title}</Card.Title>
				<Card.Text>{movie.overview}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default SingleMovie;
