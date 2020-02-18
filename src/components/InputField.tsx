import React, { Component, ChangeEvent } from "react";
import { observer } from "mobx-react";
import CSS from "csstype";


interface InputFieldProps {
	type: string;
	name: string;
	value: any;
	// onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	validator: (val: string) => boolean;
	setter: (val: string) => void;
}

const inputStyle: CSS.Properties = {
	border: "1px solid #f00"
};

@observer
export default class InputField extends Component<InputFieldProps> {
	private currentValue: string = "";
	private isEditing: boolean = false;



	render() {
		const onChange = (e: ChangeEvent<HTMLInputElement>) => {
			const val: string = e.target.value;
			this.isEditing = !this.props.validator(val);
			if (!this.isEditing) {
				this.props.setter(val);
			}
			else {
				this.currentValue = val;
				this.forceUpdate();
			}
		};
		if (!this.isEditing) this.currentValue = this.props.value;
		return <input
			style={inputStyle}
			name={this.props.name}
			type="text"
			value={this.currentValue}
			onChange={onChange}
		></input>
	}
}
