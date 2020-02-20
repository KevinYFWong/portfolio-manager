import { observable } from "mobx";
import { Ticker } from "./Ticker";
import { object, primitive, serializable } from "serializr";

export default class AssetAllocation {
	@observable @serializable(object(Ticker)) ticker: Ticker;
	@observable @serializable(primitive()) portion: number;

	constructor(ticker: Ticker, portion: number) {
		this.ticker = ticker;
		this.portion = portion;
	}
}
