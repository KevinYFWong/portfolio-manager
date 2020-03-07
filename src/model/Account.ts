import { Transaction } from "./Transaction";
import { computed, observable, IObservableArray } from "mobx";
import AssetAllocation from "./AssetAllocation";
import Transfer from "./Transfer";
import { primitive, list, object, serializable } from "serializr";


export class Account {
	@observable @serializable(primitive()) name: string = "";
	@observable @serializable(list(object(Transaction))) transactions: Transaction[];
	@serializable(list(object(Transfer))) transfers: IObservableArray<Transfer>;
	@observable @serializable(primitive()) balance: number = 0;
	@observable @serializable(list(object(AssetAllocation))) assetAllocation: AssetAllocation[];
	@serializable(primitive()) readonly id: string;

	@computed get currentValue(): number {
		return this.transactions.reduce((acc: number, t: Transaction) => t.currentValue + acc, 0);
	}

	@computed get bookValue(): number {
		return this.transactions.reduce((acc, t) => acc + t.bookCost, 0);
	}

	@computed get principal(): number {
		return this.transfers.reduce((acc, t) => acc + t.value, 0);
	}

	// @computed get tickers(): Set<string> {
	// 	return this.transactions.reduce(
	// 		(acc, t) => acc.add(t.ticker.asString), new Set<string>()
	// 	);
	// }

	constructor(name: string, transactions: Transaction[], transfers: Transfer[], assetAllocation: AssetAllocation[], balance: number, id: string) {
		this.name = name;
		this.transactions = transactions;
		this.transfers = observable.array<Transfer>(transfers);
		this.balance = balance;
		this.id = id;
		this.assetAllocation = assetAllocation;
	}

	sortTransfers() {
		this.transfers.replace(this.transfers.slice().sort(
			(a: Transfer, b: Transfer) => a.date.getTime() - b.date.getTime()
		));
	}
}
