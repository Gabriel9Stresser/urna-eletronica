import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '../../../services/supabaseClient';

export default async function getDrink(
	req: NextApiRequest,
	res?: NextApiResponse
) {
	const { code } = req.query;

	const findDrink = await supabase
		.from('bebidas')
		.select('*')
		.eq('id', code)
		.single();

	if (findDrink.error) {
		return res.status(201).json({
			error: true,
		});
	} else {
		return res.status(200).json({
			name: findDrink.data.bebidas,
			desc: findDrink.data.descricao,
			img: findDrink.data.url,
		});
	}
}
