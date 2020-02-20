import { observable } from "mobx";
import { primitive, date, serializable } from "serializr";


export default class Transfer {
	@observable @serializable(primitive()) value: number;
	@observable @serializable(date()) date: Date;

	constructor(value: number, date: Date) {
		this.value = value;
		this.date = date;
	}
}
