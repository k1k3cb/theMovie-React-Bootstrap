import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';

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
		<Container className=' m-5 d-flex justify-content-center  '>
			<Card style={{ width: '18rem' }} className='d-flex flex-row w-100'>
				<Card.Img className='w-50'
					variant='top'
					src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
				/>
				<Card.Body>
					<Card.Title className='text-center fw-bold'>
						{movie.title || movie.original_name}
					</Card.Title>
					<Card.Text>
						{movie.overview ? movie.overview : 'Overview no disponible'}
					</Card.Text>
					<Card.Text>
						{' '}
						<span className='fw-bold'>Lanzamiento: </span>{' '}
						{movie.release_date || movie.first_air_date}
					</Card.Text>
					<Card.Text className='d-flex'>
						{' '}
						<span className='fw-bold'>Puntuación media: </span> {'  '}
						{movie.vote_average}
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							fill='currentColor'
							className='bi bi-star-fill'
							viewBox='0 0 16 16'
						>
							<path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
						</svg>{' '}
					</Card.Text>
					<Link to={`/movie`}>
						<Button variant='primary' className='w-50 '>
							Volver Inicio
						</Button>
					</Link>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default SingleMovie;
