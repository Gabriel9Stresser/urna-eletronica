import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '../../../services/supabaseClient';

export default async function getVotes(
	req: NextApiRequest,
	res?: NextApiResponse
) {
	const findVotes = await supabase
		.from('users')
		.select('*');

	if (findVotes.error) {
		return res.status(201).json({
			error: true,
		});
	} else {
		return res.status(200).json({
			data: findVotes.data,
		});
	}
}
