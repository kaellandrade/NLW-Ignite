import { Fragment, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
	isPrivate: Boolean;
	children: ReactNode;
}

export default function ProtectedRoute({ children, isPrivate }: Props) {
	const signed = false;
	const { pathname } = useLocation();

	// Se Usuário não estiver logado e a rota for privada.
	if (!signed && isPrivate) {
		return <Navigate to="/" replace />;
	}

	if (signed && ['/'].includes(pathname)) {
		return <Navigate to={'/home'} />;
	}

	return <Fragment>{children}</Fragment>;
}
