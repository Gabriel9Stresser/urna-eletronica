import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '../../../services/supabaseClient';

export default async function putDrink(
	req: NextApiRequest,
	res?: NextApiResponse
) {
	const { user, drinkSelected } = req.body;

	const putDrink = await supabase
		.from('users')
		.update({ bebida_selecionada: drinkSelected })
		.eq('id', user)
		.single();

	if (putDrink.error) {
		return res.status(201).json({
			error: true,
		});
	} else {
		return res.status(200).json({
			name: putDrink.data.nome,
			foodSelected: putDrink.data.lanche_selecionado,
			drinkSelected: putDrink.data.bebida_selecionada,
			id: putDrink.data.id,
		});
	}
}
