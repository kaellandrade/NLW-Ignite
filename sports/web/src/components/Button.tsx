import { ButtonHTMLAttributes } from 'react';

interface ButtonNlw extends ButtonHTMLAttributes<HTMLButtonElement> {
	title: string;
}

export function ButtonNlw(props: ButtonNlw) {
	return (
		<button {...props} type="submit">
			{props.children} {props.title}
		</button>
	);
}
