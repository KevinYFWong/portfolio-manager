import { observable, ObservableMap } from "mobx";
import { Account } from "../model/Account";
import { serialize, object, primitive, deserialize, serializable, mapAsArray } from "serializr";
import UiStore from "./UiStore";


export class ProfileStore {
	@observable
	@serializable(primitive())
	name: string;

	@serializable(mapAsArray(object(Account), "id"))
	accounts: ObservableMap;

	constructor(name: string, accounts: Map<string, Account>, private us: UiStore) {
		this.name = name;
		this.accounts = new ObservableMap(accounts);
		this.export = this.export.bind(this);
	}

	validate(other: ProfileStore): boolean {
		if ((typeof other.name) !== "string") return false;
		for (let k of Array.from(other.accounts.keys())) {
			if (k === undefined) return false;
		}
		return true;
	}

	load(file: File, callBack: (success: boolean) => any = (_: boolean) => ({})): boolean {
		const reader = new FileReader();
		reader.onerror = e => {
			reader.abort();
			callBack(false);
		}
		reader.onload = _ => {
			try {
				const other = deserialize(ProfileStore, JSON.parse(reader.result as string) as Object);
				if (this.validate(other)) {
					this.us.reset();
					this.name = other.name;
					this.accounts.replace(other.accounts);
					callBack(true);
				} else {
					callBack(false);
				}
			} catch (ex) {
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
