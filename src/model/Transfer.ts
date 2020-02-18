import { observable } from "mobx";


export default class Transfer {
	@observable value: number;
	@observable date: Date;

	constructor(value: number, date: Date) {
		this.value = value;
		this.date = date;
	}
}
