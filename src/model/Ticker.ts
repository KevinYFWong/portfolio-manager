import { observable } from "mobx";


export class Ticker {
	@observable exchange: string = "";
	@observable symbol: string = "";
	constructor(exchange: string, symbol: string) {
		this.exchange = exchange;
		this.symbol = symbol;
	}
}
