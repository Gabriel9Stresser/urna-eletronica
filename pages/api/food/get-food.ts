import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '../../../services/supabaseClient';

export default async function getFood(
	req: NextApiRequest,
	res?: NextApiResponse
) {
	const { code } = req.query;

	const findFood = await supabase
		.from('lanches')
		.select('*')
		.eq('id', code)
		.single();

	if (findFood.error) {
		return res.status(201).json({
			error: true,
		});
	} else {
		return res.status(200).json({
			name: findFood.data.lanche,
			desc: findFood.data.descricao,
			img: findFood.data.img,
		});
	}
}
