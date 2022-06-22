import { ReactNode } from "react";

export interface DigitsI {
	digit1: string;
	digit2: string;
	digit3: string;
	digit4: string;
}

export interface CardProps {
	title: string;
	votes: string;
}

export interface AuthProviderProps {
	children: ReactNode;
}

export interface IAuthContextData {
	user: User;
	setData: (response?: User) => void;
	removeData: () => void;
}

export interface User {
	id: Record<string, unknown>;
	name: string;
	foodSelected: Record<string, unknown>;
	drinkSelected: Record<string, unknown>;
}