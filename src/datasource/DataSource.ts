import { Ticker } from "../model/Ticker";
import AlphaVantage from "./AlphaVantage";


export default interface DataSource {
	getPrice(ticker: Ticker): Promise<number | undefined>;
	readonly name: string;
}

export const defaultSources = [
	new AlphaVantage()
];
