import { observable } from "mobx";
import { Account } from "../model/Account";


export class ProfileStore {
	@observable name: string = "My Portfolio";
	@observable accounts: Account[] = [];

	constructor(name: string = "My Portfolio", accounts: Account[] = []) {
		this.name = name;
		this.accounts= accounts;
	}
}
