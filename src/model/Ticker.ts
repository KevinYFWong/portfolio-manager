import { observable, computed } from "mobx";
import { primitive, serializable } from "serializr";


export class Ticker {
	@observable @serializable(primitive()) exchange: string = "";
	@observable @serializable(primitive()) symbol: string = "";
	constructor(exchange: string, symbol: string) {
		this.exchange = exchange;
		this.symbol = symbol;
	}

	@computed
	get asString(): string {
		return `${this.exchange}:${this.symbol}`;
	}
}
