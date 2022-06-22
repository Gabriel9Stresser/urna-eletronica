export interface Bet {
	user_id: string; // id do usuário
	event_id: string; // id do evento
	event_name: string; // nome do evento
	teams: string; // times
	modality: string; // modalidade
	odds: number[]; // odds no momento da aposta [odd do time 1, odd do time 2, odd do empate]
	bet: number; // index da aposta (0, 1 ou 2)
	bet_value: number; // valor da aposta
	offer: boolean; // é oferta?
	status: string; // status (open, closed, pending)
	result: number; // Resultado (null, 0, 1 ou 2)
}

export interface Event {
	id: string; // id do evento
	name: string; // Nome do evento (Final do Futebol GV X MAC)
	teams: string[]; // [nome do time 1, nome do time 2]
	odds: number[]; // odds atuais [odd do time 1, odd do time 2, odd do empate]
	modality: string; // Modalidade da partida
	status: string; // status (open, closed, pending)
	bets: number[]; // Quantidade de apostas em cada opção ([0, 0, 0])
	payments: number[]; // Dinheiro apostado em cada opção ([0, 0, 0])
	debts: number[]; // Total a ser pago por opção ([0, 0, 0])
}

export interface User {
	id: Record<string, unknown>;
	name: string;
	foodSelected: Record<string, unknown>;
	drinkSelected: Record<string, unknown>;
}
