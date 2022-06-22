// registers in JSON file for simplicity, store in a db for production applications
import { supabase } from './supabaseClient';

import { User } from '../Types';

export const users = {
	getUser: async (email) =>
		await supabase.from('Users').select('*').eq('email', email).single(),
	getAll: async (email) => await supabase.from('Users').select('*'),
	create: async (register) => await supabase.from('users').insert(register),
	update: async (id, params) =>
		await supabase.from('Users').update(params).match({ id }),
};

export const getUser = async (email: string) => {
	const response = await supabase
		.from('users')
		.select('*')
		.eq('email', email)
		.single();

	return response;
};

export const createUser = async (register: User) => {
	const response = await supabase.from('users').insert(register);

	return response;
};

export const updateUser = async (params: User) => {
	const response = await supabase.from('Users').update(params).match(params.id);

	return response;
};
