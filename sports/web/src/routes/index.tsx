import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/home';
import { Login } from '../pages/login';
import ProtectedRoute from './ProtectedRoute';
import {NotFound} from "../pages/notFound";

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
		<Route
			path="*"
			element={
				<ProtectedRoute isPrivate={false}>
					<NotFound />
				</ProtectedRoute>
			}
		/>
	</Routes>
);
export default Rotas;
