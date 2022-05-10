export interface IModel {
	_id: string
	created_at: Date
	updated_at: Date
	toJSON<T>(): T
}

export type Ref<T extends IModel> = T["_id"]

export interface IAnnouncement extends IModel {
	server_id: string
	user: IUser
	text: string
	channel_name: string
}

export interface IServerSettings {
	lottery_cost: number
	base_lottery_jackpot: number
	allowance_rate: number
	birthday_bucks: number
}

export interface IServer extends IModel {
	server_id: string
	name: string
	icon_hash: string
	settings: IServerSettings
	user_count: number
}

export interface IEngagementMetrics {
	posts: number
	reactions_used: number
	reactions_received: number
	average_reactions_per_post: number
	mentions: number
}

export interface IGamblingMetrics {
	roulette: {
		spins: number
		red_spins: number
		black_spins: number
		green_spins: number
		wins: number
		losses: number
		overall_winnings: number
		overall_losings: number
	}
}

export interface IUserMetrics {
	engagement: IEngagementMetrics
	gambling: IGamblingMetrics
}

export interface IUser extends IModel {
	billy_bucks: number
	server_id: string
	user_id: string
	username: string
	discriminator: string
	avatar_hash?: string
	last_allowance: string
	has_lottery_ticket: boolean
	is_admin: boolean
	is_mayor: boolean
	metrics: IUserMetrics
	birthday: string
}

export interface IWebhook extends IModel {
	server_id: string
	server: string | IServer
	channel_name: string
	webhook_id: string
	avatar_url: string
	username: string
	notes?: string
}

export interface ILotteryInfo {
	ticket_cost: number
	base_lottery_jackpot: number
	jackpot: number
	entrants_count: number
	entrants: Pick<IUser, "_id" | "username" | "has_lottery_ticket">[]
}

export interface IApiError {
	ok?: boolean
	status?: number
	error?: string
}

export type UserLookup = Record<string, IUser>

export interface IServerMetadata extends IServer {
	user_count: number
	user_pages: number
	users: IUser[]
	announcements: IAnnouncement[]
	webhooks: IWebhook[]
	lottery: ILotteryInfo
}

export type ApiResponse = IApiError & UserLookup & IUser
