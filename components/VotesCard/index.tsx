import React from 'react';
import { Container, Title, Text } from './style';

interface CardProps {
	title: string;
	votes: string;
}

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
