import { useLayoutEffect, useState } from 'react';

import Swal from 'sweetalert2';

import axios from 'axios';

import { VotesCard } from '../VotesCard';

export default function Votes() {
	const [foodList, setFoodList] = useState('');
	const [drinkList, setDrinkList] = useState('');
	const [userVotes, setUserVotes] = useState('');

	useLayoutEffect(() => {
		getFood();
		getDrink();
		getUser();
	}, []);

	const getFood = async () => {
		const { data, status } = await axios.get(`/api/food/get-vote`);
		if (status !== 200) {
			return Swal.fire({
				text: 'Comida não encontrada',
				icon: 'error',
				confirmButtonText: 'Entendi',
			});
		}

		const list = data.data.map((event) => {
			return (
				<div>
					<div key={event.lanche}>
						<VotesCard title={event.lanche} votes={event.votos} />
					</div>
				</div>
			);
		});

		setFoodList(list);
	};

	const getDrink = async () => {
		const { data, status } = await axios.get(`/api/drink/get-vote`);
		if (status !== 200) {
			return Swal.fire({
				text: 'Comida não encontrada',
				icon: 'error',
				confirmButtonText: 'Entendi',
			});
		}

		const list = data.data.map((event) => {
			return (
				<div>
					<div key={event.bebidas}>
						<VotesCard title={event.bebidas} votes={event.votos} />
					</div>
				</div>
			);
		});

		setDrinkList(list);
	};

	const getUser = async () => {
		const { data } = await axios.get(`/api/user/get-vote`);
		const list = data.data?.filter(
			(event) => event.bebida_selecionada !== null
		).length;

		setUserVotes(list);
	};

	const renderFoods = () => {
		return foodList;
	};

	const renderDrinks = () => {
		return drinkList;
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'row' }}>
			<div style={{ marginLeft: '3rem' }}> Lanches {renderFoods()}</div>
			<div> Bebidas {renderDrinks()}</div>
			<div> Quantidade de votos {userVotes}</div>
		</div>
	);
}
