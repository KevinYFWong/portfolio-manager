import { observable, computed } from "mobx";
import { primitive, serializable } from "serializr";


export class Ticker {
	@observable @serializable(primitive()) exchange: string = "";
	@observable @serializable(primitive()) symbol: string = "";
	static sep: string = ':';
	constructor(exchange: string, symbol: string) {
		this.exchange = exchange;
		this.symbol = symbol;
	}

	@computed
	get asString(): string {
		return `${this.exchange}:${this.symbol}`;
	}

	static fromString(tickString: string): Ticker {
		const splits = tickString.split(this.sep, 2);
		if (splits.length !== 2) return new Ticker("", splits[0])
		else return new Ticker(splits[0], splits[1]);
	}

	isEqual(other: Ticker): boolean {
		return other.exchange === this.exchange &&
			other.symbol === this.symbol;
	}
}
