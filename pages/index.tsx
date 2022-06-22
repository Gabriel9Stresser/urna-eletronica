import { useState, useEffect } from 'react';

import { useAuth } from '../hooks/auth/auth';
import Login from '../components/Login/Login';
import Food from '../components/Food/Food';
import Drink from '../components/Drink/Drink';
import Finish from '../components/Finish';
import Votes from '../components/Votes/Votes';
import {
	MainStyled,
	ScreenStyled,
	LineStyled,
	ButtonStyled,
	BoardStyled,
	ButtonBoardStyled,
} from '../styles/index';
import axios from 'axios';
import Swal from 'sweetalert2';
import { supabase } from '../services/supabaseClient';

export default function Index() {
	const { user, setData, removeData } = useAuth();

	const [page, setPage] = useState('Login');

	//Campo dos números dos candidatos
	const [num1, setNum1] = useState('');
	const [num2, setNum2] = useState('');
	const [num3, setNum3] = useState('');
	const [num4, setNum4] = useState('');

	const [finish, setFinish] = useState(false);

	const pages = {
		Login: <Login digit1={num1} digit2={num2} digit3={num3} digit4={num4} />,
		Food: <Food digit1={num1} digit2={num2} digit3={num3} digit4={num4} />,
		Drink: <Drink digit1={num1} digit2={num2} digit3={num3} digit4={num4} />,
		Votes: <Votes />,
	};

	useEffect(() => {
		changePage();
	}, [page]);

	useEffect(() => {
		redirect();
	}, [page === 'Finish']);

	const changePage = async () => {
		const code = num1 + num2 + num3 + num4;

		if (code !== '0000')
			if (user.name === undefined) {
				setPage('Login');
			} else if (user.foodSelected === null) {
				setPage('Food');
			} else if (user.drinkSelected === null) {
				setPage('Drink');
			} else {
				setFinish(true);
				removeData();
				setPage('Login');
			}
	};

	const redirect = async () => {
		await sleep(3000);
		setFinish(false);
	};

	const sleep = (milliseconds: number) => {
		return new Promise((resolve) => setTimeout(resolve, milliseconds));
	};

	const changeConfirmButton = () => {
		if (user.name === undefined || user.name === null) {
			return (
				<ButtonBoardStyled
					style={{ backgroundColor: '#48c079' }}
					onClick={() => login()}
				>
					CONFIRMA
				</ButtonBoardStyled>
			);
		} else if (user.foodSelected === null) {
			return (
				<ButtonBoardStyled
					style={{ backgroundColor: '#48c079' }}
					onClick={() => putFood()}
				>
					CONFIRMA
				</ButtonBoardStyled>
			);
		} else if (user.drinkSelected === null) {
			return (
				<ButtonBoardStyled
					style={{ backgroundColor: '#48c079' }}
					onClick={() => putDrink()}
				>
					CONFIRMA
				</ButtonBoardStyled>
			);
		}
	};

	const changeNullButton = () => {
		if (user.foodSelected === null) {
			return (
				<ButtonBoardStyled
					style={{ backgroundColor: '#FFF' }}
					onClick={() => putFood(true)}
				>
					BRANCO
				</ButtonBoardStyled>
			);
		} else if (user.drinkSelected === null) {
			return (
				<ButtonBoardStyled
					style={{ backgroundColor: '#FFF' }}
					onClick={() => putDrink(true)}
				>
					BRANCO
				</ButtonBoardStyled>
			);
		}
	};

	const putFood = async (isNull: boolean = false) => {
		const code = isNull ? '0' : num1 + num2 + num3 + num4;

		if (code.length < 4 && !isNull) {
			return Swal.fire({
				text: 'Digite um id válido',
				icon: 'error',
				confirmButtonText: 'Entendi',
			});
		}

		// const { data, status } = await axios.put('/api/food/rpc-food', code);

		await supabase.rpc('vote_food', {
			quote_id: code,
		});

		const payload = {
			user: user.id,
			foodSelected: code,
		};

		const { data } = await axios.post('/api/food/put-food', payload);

		if (data.error) {
			removeNumber();
			return Swal.fire({
				text: 'Ocorreu um erro, tente novamente mais tarde',
				icon: 'error',
				confirmButtonText: 'Entendi',
			});
		} else {
			removeNumber();
			setData(data);
			setPage('Drink');
		}
	};

	const putDrink = async (isNull: boolean = false) => {
		const code = isNull ? '0' : num1 + num2 + num3 + num4;

		if (code.length < 4 && !isNull) {
			return Swal.fire({
				text: 'Digite um id válido',
				icon: 'error',
				confirmButtonText: 'Entendi',
			});
		}

		await supabase.rpc('vote_drink', {
			quote_id: code,
		});

		const payload = {
			user: user.id,
			drinkSelected: code,
		};

		const { data } = await axios.post('/api/drink/put-drink', payload);

		if (data.error) {
			removeNumber();
			return Swal.fire({
				text: 'Ocorreu um erro, tente novamente mais tarde',
				icon: 'error',
				confirmButtonText: 'Entendi',
			});
		} else {
			removeNumber();
			setData(data);
			setPage('Finish');
		}
	};

	const login = async () => {
		const code = num1 + num2 + num3 + num4;

		if (code.length < 4) {
			return Swal.fire({
				text: 'Digite um id válido',
				icon: 'error',
				confirmButtonText: 'Entendi',
			});
		}

		if (code === '0000') {
			return setPage('Votes');
		}

		const { data } = await axios.post('/api/user/login', { code });
		removeNumber();

		if (data.error) {
			return Swal.fire({
				text: 'Cadastro não encontrado',
				icon: 'error',
				confirmButtonText: 'Entendi',
			});
		}

		if (data.hasVote) {
			return Swal.fire({
				text: 'Usuário já votou',
				icon: 'error',
				confirmButtonText: 'Entendi',
			});
		}

		setData(data);
		return setPage('Food');
	};

	const setNumber = (num: string) => {
		if (num1 == '') {
			setNum1(num);
		} else if (num2 == '') {
			setNum2(num);
		} else if (num3 == '') {
			setNum3(num);
		} else if (num4 == '') {
			setNum4(num);
		}
	};

	const removeNumber = () => {
		setNum1('');
		setNum2('');
		setNum3('');
		setNum4('');
	};

	return (
		<MainStyled>
			<ScreenStyled>{finish ? <Finish /> : pages[page]}</ScreenStyled>
			<BoardStyled>
				<LineStyled>
					<ButtonStyled onClick={() => setNumber('1')}>1</ButtonStyled>
					<ButtonStyled onClick={() => setNumber('2')}>2</ButtonStyled>
					<ButtonStyled onClick={() => setNumber('3')}>3</ButtonStyled>
				</LineStyled>
				<LineStyled>
					<ButtonStyled onClick={() => setNumber('4')}>4</ButtonStyled>
					<ButtonStyled onClick={() => setNumber('5')}>5</ButtonStyled>
					<ButtonStyled onClick={() => setNumber('6')}>6</ButtonStyled>
				</LineStyled>
				<LineStyled>
					<ButtonStyled onClick={() => setNumber('7')}>7</ButtonStyled>
					<ButtonStyled onClick={() => setNumber('8')}>8</ButtonStyled>
					<ButtonStyled onClick={() => setNumber('9')}>9</ButtonStyled>
				</LineStyled>
				<LineStyled>
					<ButtonStyled onClick={() => setNumber('0')}>0</ButtonStyled>
				</LineStyled>
				<LineStyled>
					{changeNullButton()}
					<ButtonBoardStyled
						style={{ backgroundColor: '#f09046' }}
						onClick={() => removeNumber()}
					>
						CORRIGE
					</ButtonBoardStyled>
					{changeConfirmButton()}
				</LineStyled>
			</BoardStyled>
		</MainStyled>
	);
}
