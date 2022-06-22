import React from 'react';
import { Container, Title, Text } from './style';
import { CardProps } from '../../types/global';

export const VotesCard = ({ title, votes }: CardProps) => {
	return (
		<Container>
			<Title>
				{title}: {'  '}
			</Title>
			<Text>{'  ' + votes}</Text>
		</Container>
	);
};
