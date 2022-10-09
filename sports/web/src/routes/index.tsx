import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/home';
import { Login } from '../pages/login';
import { NotFound } from '../pages/notFound';
import ProtectedRoute from './ProtectedRoute';

export const Rotas = () => (
	<Routes>
		<Route
			path="/home"
			element={
				<ProtectedRoute isPrivate={true}>
					<Home />
				</ProtectedRoute>
			}
		/>
		<Route
			path="/"
			element={
				<ProtectedRoute isPrivate={false}>
					<Login />
				</ProtectedRoute>
			}
		/>
	</Routes>
);
export default Rotas;
