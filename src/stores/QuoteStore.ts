import { Ticker } from "../model/Ticker";
import Quote from "../model/Quote";
import DataSource from "../datasource/DataSource";


export default class QuoteStore {
	private quotes: Map<Ticker, Quote> = new Map();
	private sources: DataSource[];

	constructor(sources: DataSource[]) {
		this.sources = sources;
	}

	getQuote(ticker: Ticker): Quote {
		if (!this.quotes.has(ticker)) this.quotes.set(ticker, new Quote(ticker));
		let q = this.quotes.get(ticker) as Quote;
		if (!q.price) this.fillQuote(q);
		return q;
	}

	async fillQuote(quote: Quote) {
		// todo: Consider doing this in parallel later?
		for (const source of this.sources) {
			const result = await source.getPrice(quote.ticker);
			if (result) {
				quote.price = result;
				return;
			}
		}
	}

	setPrice(ticker: Ticker, price: number) {
		if (!this.quotes.has(ticker)) this.quotes.set(ticker, new Quote(ticker, price));
		else {
			(this.quotes.get(ticker) as Quote).price = price;
		}
	}

	clearPrices() {
		this.quotes.forEach(q => q.clear());
	}
}
