import DataSource from "./DataSource";
import { Ticker } from "../model/Ticker";
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';


export default class AlphaVantage implements DataSource {
	private readonly baseURL: string = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=";
	private readonly apiKey: string = "xxxxxxxxxx";

	private quoteURL(ticker: Ticker): string {
		return this.baseURL + `${ticker.exchange}:${ticker.symbol}&apikey=${this.apiKey}`;
	}

	async getPrice(ticker: Ticker): Promise<number | undefined> {
		try {
			const response = await axios.get(this.quoteURL(ticker));
			return response.data["Global Quote"]["05. price"];
		} catch (e) {
			console.log(e);
		}
		return undefined;
	}
}
