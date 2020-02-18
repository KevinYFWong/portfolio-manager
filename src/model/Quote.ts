import { Ticker } from "./Ticker";
import { observable } from "mobx";


export default class Quote {
	// todo: add filling status for quote
	readonly ticker: Ticker;
	@observable price: number | undefined;

	constructor(ticker: Ticker, price?: number) {
		this.ticker = ticker;
		this.price = price;
	}

	clear() {
		this.price = undefined;
	}
}
