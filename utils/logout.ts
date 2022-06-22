import Router from 'next/router';

export const Logout = () => {
	window.localStorage.removeItem('user');

	Router.push('/');
};
