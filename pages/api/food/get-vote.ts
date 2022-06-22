import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '../../../services/supabaseClient';

export default async function getFood(
	req: NextApiRequest,
	res?: NextApiResponse
) {
	const findFood = await supabase
		.from('lanches')
		.select('*')

	if (findFood.error) {
		return res.status(201).json({
			error: true,
		});
	} else {
		return res.status(200).json({
			data: findFood.data,
		});
	}
}
