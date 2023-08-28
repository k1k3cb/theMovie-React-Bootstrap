import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const MovieCard = ({ movie }) => {
	return (
		<>
			<Card style={{ width: '18rem' }} className='shadow '>
				<Card.Img
					variant='top'
					src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
				/>
				<Card.Body>
					<Card.Title className='fw-bold'>{movie.title}</Card.Title>
					<Card.Text style={{ height: '20rem' }}>{movie.overview}</Card.Text>
				</Card.Body>
				<ListGroup className='list-group-flush'>
					<ListGroup.Item style={{ height: '5rem' }}>
						{' '}
						Título original: {movie.original_title}{' '}
					</ListGroup.Item>
					<ListGroup.Item>
						Lanzamiento: {movie.release_date}
					</ListGroup.Item>
					<ListGroup.Item>Valoración: {movie.vote_average} </ListGroup.Item>
				</ListGroup>
				<Button variant='primary'>Ver info</Button>
			</Card>
		</>
	);
};

export default MovieCard;
