import { Transaction } from "./Transaction";
import { computed, observable } from "mobx";
import shortid from "shortid";
import AssetAllocation from "./AssetAllocation";
import Transfer from "./Transfer";


export class Account {
	@observable name: string = "";
	@observable transactions: Transaction[] = [];
	@observable transfers: Transfer[] = [];
	@observable balance: number = 0;
	@observable assetAllocation: AssetAllocation[] = [];
	readonly id: string;

	@computed get currentValue(): number {
		return this.transactions.reduce((acc: number, t: Transaction) => t.value + acc, 0);
	}

	@computed get bookValue(): number {
		return this.transactions.reduce((acc, t) => acc + t.value, 0);
	}

	constructor(name: string, transactions: Transaction[], balance: number, id: string = shortid.generate()) {
		this.name = name;
		this.transactions = transactions;
		this.balance = balance;
		this.id = id;
	}
}
