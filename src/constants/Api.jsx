import axios from 'axios';

export  const getMovies = async () => {
	try {
		const response = await axios.get(
			'https://api.themoviedb.org/3/movie/popular?api_key=f39cfec1279850f323e6ac1c60aa5dc4&language=es-ES'
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

