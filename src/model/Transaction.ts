import { observable, computed } from "mobx"
import { Ticker } from "./Ticker";
import shortid from "shortid";

export class Transaction {
	@observable ticker: Ticker;
	@observable quantity: number;
	@observable unitPrice: number;
	readonly id: string;

	@computed get value(): number {
		return this.unitPrice * this.quantity;
	}

	constructor(ticker: Ticker, quantity: number, price: number, id: string = shortid.generate()) {
		this.ticker = ticker;
		this.quantity = quantity;
		this.unitPrice = price;
		this.id = id;
	}
}
