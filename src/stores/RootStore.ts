import { ProfileStore } from "./ProfileStore";
import UiStore from "./UiStore";
import QuoteStore from "./QuoteStore";


export default class RootStore {
	ps: ProfileStore;
	us: UiStore;
	qs: QuoteStore;

	constructor(ps: ProfileStore, us: UiStore, qs: QuoteStore) {
		this.ps = ps;
		this.us = us;
		this.qs = qs;
	}
}
