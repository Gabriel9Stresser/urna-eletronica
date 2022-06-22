import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '../../../services/supabaseClient';

export default async function createUser(
	req: NextApiRequest,
	res?: NextApiResponse
) {
	const { code } = req.body;

	const hasUser = await supabase
		.from('users')
		.select('*')
		.eq('id', code)
		.single();

	if (hasUser.error) {
		return res.status(201).json({
			error: true,
		});
	} else {
		if (hasUser.data.bebida_selecionada !== null) {
			return res.status(200).json({
				error: false,
				hasVote: true,
			});
		} else {
			return res.status(200).json({
				name: hasUser.data.nome,
				foodSelected: hasUser.data.lanche_selecionado,
				drinkSelected: hasUser.data.bebida_selecionada,
				id: hasUser.data.id,
			});
		}
	}
}
