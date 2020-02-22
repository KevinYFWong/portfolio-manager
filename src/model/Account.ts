import { Transaction } from "./Transaction";
import { computed, observable } from "mobx";
import AssetAllocation from "./AssetAllocation";
import Transfer from "./Transfer";
import { primitive, list, object, serializable } from "serializr";


export class Account {
	@observable @serializable(primitive()) name: string = "";
	@observable @serializable(list(object(Transaction))) transactions: Transaction[];
	@observable @serializable(list(object(Transfer))) transfers: Transfer[];
	@observable @serializable(primitive()) balance: number = 0;
	@observable @serializable(list(object(AssetAllocation))) assetAllocation: AssetAllocation[] = [];
	@serializable(primitive()) readonly id: string;

	@computed get currentValue(): number {
		return this.transactions.reduce((acc: number, t: Transaction) => t.value + acc, 0);
	}

	@computed get bookValue(): number {
		return this.transactions.reduce((acc, t) => acc + t.value, 0);
	}

	constructor(name: string, transactions: Transaction[], transfers: Transfer[], balance: number, id: string) {
		this.name = name;
		this.transactions = transactions;
		this.transfers = transfers;
		this.balance = balance;
		this.id = id;
	}
}
