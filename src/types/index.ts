import type { IServer, IUser } from "btbot-types";

export interface ILotteryInfo {
	ticket_cost: number
	base_lottery_jackpot: number
	jackpot: number
	entrants_count: number
	entrants: Pick<IUser, "_id" | "username" | "has_lottery_ticket">[]
}

export interface IServerInfo extends IServer {
	user_count: number
}
