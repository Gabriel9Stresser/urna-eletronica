import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '../../../services/supabaseClient';

export default async function putFood(
	req: NextApiRequest,
	res?: NextApiResponse
) {
	const { user, foodSelected } = req.body;

	const putFood = await supabase
		.from('users')
		.update({ lanche_selecionado: foodSelected })
		.eq('id', user)
		.single();

	if (putFood.error) {
		return res.status(201).json({
			error: true,
		});
	} else {
		return res.status(200).json({
			name: putFood.data.nome,
			foodSelected: putFood.data.lanche_selecionado,
			drinkSelected: putFood.data.bebida_selecionada,
			id: putFood.data.id,
		});
	}
}
