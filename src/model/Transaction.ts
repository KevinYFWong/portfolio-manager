import { observable, computed } from "mobx"
import { Ticker } from "./Ticker";
import { object, primitive, serializable } from "serializr";

export class Transaction {
	@observable @serializable(object(Ticker)) ticker: Ticker;
	@observable @serializable(primitive()) quantity: number;
	@observable @serializable(primitive()) unitPrice: number;
	@serializable(primitive()) readonly id: string;

	@computed get value(): number {
		return this.unitPrice * this.quantity;
	}

	constructor(ticker: Ticker, quantity: number, price: number, id: string) {
		this.ticker = ticker;
		this.quantity = quantity;
		this.unitPrice = price;
		this.id = id;
	}
}
