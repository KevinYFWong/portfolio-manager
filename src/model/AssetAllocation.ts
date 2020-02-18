import { observable } from "mobx";
import { Ticker } from "./Ticker";

export default class AssetAllocation {
	@observable ticker: Ticker;
	@observable portion: number;

	constructor(ticker: Ticker, portion: number) {
		this.ticker = ticker;
		this.portion = portion;
	}
}
