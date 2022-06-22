import {
	DigitStyled,
	D11Styled,
	D12Styled,
	D1Styled,
	D13tStyled,
	D1LeftStyled,
	D14tStyled,
	D2Styled,
} from '../../styles/index';

interface Login {
	digit1: string;
	digit2: string;
	digit3: string;
	digit4: string;
}

export default function Login({ digit1, digit2, digit3, digit4 }: Login) {
	return (
		<>
			<D1Styled>
				<D1LeftStyled>
					<D11Styled></D11Styled>
					<D12Styled>
						<span>ELEITOR</span>
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
					<D14tStyled></D14tStyled>
				</D1LeftStyled>
			</D1Styled>
			<D2Styled>
				Aperte a tecla:
				<br />
				CONFIRMA para CONFIRMAR este usuário
				<br />
				CORRIGE para REINICIAR este usuário
				<br />
			</D2Styled>
		</>
	);
}
