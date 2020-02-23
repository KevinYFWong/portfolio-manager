import { Ticker } from "../model/Ticker";
import Quote, { QuoteStatus } from "../model/Quote";
import DataSource, { defaultSources } from "../datasource/DataSource";


export default class QuoteStore {
	private static instance: QuoteStore;
	private quotes: Map<string, Quote> = new Map();
	private sources: DataSource[];

	public static getInstance(): QuoteStore {
		if (!this.instance) {
			this.instance = new QuoteStore();
		}
		return this.instance;
	}

	private constructor(sources: DataSource[] = defaultSources) {
		this.sources = sources;
	}

	getQuote(ticker: Ticker): Quote {
		const tickString = ticker.asString;
		if (!this.quotes.has(tickString)) this.quotes.set(tickString, new Quote(ticker, QuoteStatus.Unfilled));
		let q = this.quotes.get(tickString) as Quote;
		if (!q.price && q.status === QuoteStatus.Unfilled) this.fillQuote(q);
		return q;
	}

	async fillQuote(quote: Quote) {
		// todo: Consider doing this in parallel later?
		quote.status = QuoteStatus.Fetching;
		const setPrice = (result: number) => {
			if (quote.status !== QuoteStatus.UserSpecified) {
				quote.price = result;
				quote.status = QuoteStatus.Filled;
			}
		}
		for (const source of this.sources) {
			const result = await source.getPrice(quote.ticker);
			if (result) {
				setPrice(result);
				return;
			}
		}
		quote.status = QuoteStatus.Unfilled;
	}

	setPrice(ticker: Ticker, price: number) {
		const tickString = ticker.asString;
		if (!this.quotes.has(tickString)) this.quotes.set(tickString, new Quote(ticker, QuoteStatus.UserSpecified, price));
		else {
			const q = this.quotes.get(tickString) as Quote;
			q.price = price;
			q.status = QuoteStatus.UserSpecified;
		}
	}

	clearPrices() {
		this.quotes.forEach(q => q.clear());
	}
}
