import { observable, computed } from "mobx"
import { Ticker } from "./Ticker";
import { object, primitive, serializable } from "serializr";
import QuoteStore from "../stores/QuoteStore";
import { QuoteStatus } from "./Quote";

export class Transaction {
	@observable @serializable(object(Ticker)) ticker: Ticker;
	@observable @serializable(primitive()) quantity: number;
	@observable @serializable(primitive()) unitPrice: number;
	@serializable(primitive()) readonly id: string;

	@computed get bookCost(): number {
		return this.unitPrice * this.quantity;
	}

	@computed get currentValue(): number {
		const qs = QuoteStore.getInstance();
		const quote = qs.getQuote(this.ticker);
		if (quote.status === QuoteStatus.Unfilled || quote.status === QuoteStatus.Fetching || quote.price === undefined) {
			return NaN;
		}
		return quote.price;
	}

	constructor(ticker: Ticker, quantity: number, price: number, id: string) {
		this.ticker = ticker;
		this.quantity = quantity;
		this.unitPrice = price;
		this.id = id;
	}
}
