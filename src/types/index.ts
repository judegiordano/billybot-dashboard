export interface IModel {
	_id: string
	created_at: Date
	updated_at: Date
	toJSON<T>(): T
}

export type Ref<T extends IModel> = T["_id"]

export interface IAnnouncement extends IModel {
	server_id: string
	user: Ref<IUser>
	text: string
	channel_name: string
}

export interface IServerSettings {
	lottery_cost: number
	base_lottery_jackpot: number
	allowance_rate: number
}

export interface IServer extends IModel {
	server_id: string
	name: string
	icon_hash: string
	settings: IServerSettings
}

export interface IUserMetrics {
	posts: number
	reactions_used: number
	reactions_received: number
	average_reactions_per_post: number
	mentions: number
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
}

export interface IWebhook extends IModel {
	server_id: string
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
	users: IUser[]
	announcements: IAnnouncement[]
	webhooks: IWebhook[]
	lottery: ILotteryInfo
}

export type ApiResponse = IApiError & UserLookup & IUser
