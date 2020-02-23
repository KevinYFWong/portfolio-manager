import { Ticker } from "./Ticker";
import { observable } from "mobx";

export enum QuoteStatus {
	UserSpecified,
	Fetching,
	Filled,
	Unfilled
}

export default class Quote {

	readonly ticker: Ticker;
	@observable price: number | undefined;
	@observable status: QuoteStatus;

	constructor(ticker: Ticker, status: QuoteStatus, price?: number) {
		this.ticker = ticker;
		this.status = status;
		this.price = price;
	}

	clear() {
		this.price = undefined;
	}
}
