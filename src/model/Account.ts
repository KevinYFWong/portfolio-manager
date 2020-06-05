import { Transaction } from "./Transaction";
import { computed, observable, IObservableArray, isObservableArray } from "mobx";
import AssetAllocation from "./AssetAllocation";
import Transfer from "./Transfer";
import { primitive, list, object, serializable } from "serializr";
import { Ticker } from "./Ticker";
import QuoteStore from "../stores/QuoteStore";
import { QuoteStatus } from "./Quote";
import { calculateXIRR } from "../util/XIRR";


export class Account {
	@observable @serializable(primitive()) name: string = "";
	@observable @serializable(list(object(Transaction))) transactions: Transaction[];
	@observable @serializable(list(object(Transfer))) transfers: IObservableArray<Transfer>;
	@observable @serializable(primitive()) balance: number = 0;
	@observable @serializable(list(object(AssetAllocation))) assetAllocation: AssetAllocation[];
	@serializable(primitive()) readonly id: string;

	@computed get assets(): Map<string, number> {
		let result = new Map<string, number>();
		this.transactions.forEach(t => {
			const tickString = t.ticker.asString;
			const currQty = result.get(tickString) ? result.get(tickString) as number : 0;
			result.set(tickString, currQty + t.quantity);
		});
		return result;
	}

	// todo: remove computed from this. should not be setting observables in here.
	@computed get currentValue(): number {
		let assetTotal = 0;
		const qs = QuoteStore.getInstance();
		this.assets.forEach((qty, tick) => {
			const quote = qs.getQuote(Ticker.fromString(tick));
			if (quote.status !== QuoteStatus.Unfilled && quote.status !== QuoteStatus.Fetching && quote.price !== undefined) {
				assetTotal += quote.price * qty;
			}
		});
		return assetTotal + this.balance;
	}

	@computed get bookValue(): number {
		return this.transactions.reduce((acc, t) => acc + t.bookCost, 0);
	}

	@computed get principal(): number {
		return this.transfers.reduce((acc, t) => acc + t.value, 0);
	}

	@computed get xirr(): number {
		const trans: number[] = [];
		const dates: Date[] = [];
		this.transfers.forEach(t => {
			trans.push(t.value);
			dates.push(t.date);
		});
		trans.push(-this.currentValue);
		dates.push(new Date());
		return calculateXIRR(trans, dates);
	}

	constructor(name: string, transactions: Transaction[], transfers: Transfer[], assetAllocation: AssetAllocation[], balance: number, id: string) {
		this.name = name;
		this.transactions = transactions;
		this.transfers = observable.array<Transfer>(transfers);
		this.balance = balance;
		this.id = id;
		this.assetAllocation = assetAllocation;
	}

	sortTransfers() {
		console.log(isObservableArray(this.transfers));
		this.transfers.slice().sort(
			(a: Transfer, b: Transfer) => a.date.getTime() - b.date.getTime()
		);
	}
}
