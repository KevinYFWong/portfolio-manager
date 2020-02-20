import { observable } from "mobx";
import { Account } from "../model/Account";
import { serialize, list, object, primitive, deserialize, serializable } from "serializr";


export class ProfileStore {
	@observable
	@serializable(primitive())
	name: string;

	@observable
	@serializable(list(object(Account)))
	accounts: Account[];

	constructor(name: string, accounts: Account[]) {
		this.name = name;
		this.accounts= accounts;
		this.export = this.export.bind(this);
	}

	load(file: File, callBack: (success: boolean) => any = (_: boolean) => ({})): boolean {
		const reader = new FileReader();
		reader.onerror = e => {
			reader.abort();
			callBack(false);
		}
		reader.onload = e => {
			try {
				const other = deserialize(ProfileStore, JSON.parse(reader.result as string) as Object);
				this.name = other.name;
				this.accounts = other.accounts;
				console.log(other);
				callBack(true);
			} catch (e) {
				callBack(false);
			}
		}
		reader.readAsText(file);
		return false;
	}

	export(): Object | undefined {
		try {
			const result = serialize(this)
			return result;
		} catch (e) {
			return undefined;
		}
	}
}
