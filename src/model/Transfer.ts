import { observable } from "mobx";
import { primitive, date, serializable } from "serializr";


export default class Transfer {
	@observable @serializable(primitive()) value: number;
	@observable @serializable(date()) date: Date;
	@serializable(primitive()) readonly id: string;

	constructor(value: number, date: Date, id: string) {
		this.value = value;
		this.date = date;
		this.id = id;
	}
}
