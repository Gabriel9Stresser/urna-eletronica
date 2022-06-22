import { useEffect, useState } from 'react';

import Image from 'next/image';

import Swal from 'sweetalert2';

import { useAuth } from '../../hooks/auth/auth';
import axios from 'axios';

import {
	DigitStyled,
	D11Styled,
	D12Styled,
	D1Styled,
	D13tStyled,
	D1LeftStyled,
	D14tStyled,
	D1rigthtStyled,
	D2Styled,
	D1IMGStyled,
} from '../../styles/index';

import { DigitsI } from '../../types/global';

export default function Drink({ digit1, digit2, digit3, digit4 }: DigitsI) {
	const [name, setName] = useState('');
	const [desc, setDesc] = useState('');
	const [img, setImg] = useState('');

	const { user } = useAuth();

	const code = digit1 + digit2 + digit3 + digit4;

	useEffect(() => {
		getDrink();
	}, [code.length === 4]);

	useEffect(() => {
		setName('');
		setDesc('');
		setImg('');
	}, [code.length === 0]);

	const getDrink = async () => {
		if (code.length < 4) return;

		const { data, status } = await axios.get(
			`/api/drink/get-drink?code=${code}`
		);

		if (status !== 200) {
			return Swal.fire({
				text: 'Comida não encontrada',
				icon: 'error',
				confirmButtonText: 'Entendi',
			});
		} else {
			setName(data.name);
			setDesc(data.desc);
			setImg(data.img);
		}
	};

	return (
		<>
			<D1Styled>
				<D1LeftStyled>
					<D11Styled>
						<span>Nome: {user.name}</span>
					</D11Styled>
					<D12Styled>
						<span>BEBIDA</span>
					</D12Styled>
					<D13tStyled>
						<DigitStyled id="digit-1" maxLength={1}>
							{digit1}
						</DigitStyled>
						<DigitStyled id="digit-2" maxLength={1}>
							{digit2}
						</DigitStyled>

						<DigitStyled id="digit-3" maxLength={1}>
							{digit3}
						</DigitStyled>

						<DigitStyled id="digit-4" maxLength={1}>
							{digit4}
						</DigitStyled>
					</D13tStyled>
					<D14tStyled>
						Nome: {name}
						<br />
						Descrição: {desc}
					</D14tStyled>
				</D1LeftStyled>
				<D1rigthtStyled>
					{img ? (
						<D1IMGStyled>
							<Image width={150} height={150} src={img} alt="foto bebida" />
						</D1IMGStyled>
					) : (
						''
					)}
				</D1rigthtStyled>
			</D1Styled>
			<D2Styled>
				Aperte a tecla:
				<br />
				CONFIRMA para CONFIRMAR esta bebida
				<br />
				CORRIGE para REINICIAR esta bebida
				<br />
			</D2Styled>
		</>
	);
}
