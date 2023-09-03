import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import SingleMovie from './pages/SingleMovie';
import MainComponent from './components/MainComponent/Maincomponent';
import { useState } from 'react';


const App = () => {

	const [movies, setMovies] = useState([]);
	return (
		<BrowserRouter>
			<MainComponent movies={movies} setMovies={setMovies}/>
			<Routes>
				<Route path='/' element={<Navigate to='/movie' />} />
				<Route path='/movie/:id' element={<SingleMovie movies={movies} />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
