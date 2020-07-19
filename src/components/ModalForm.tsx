import React, { Component } from "react";
import RootStore from "../stores/RootStore";
import { FormComponentProps } from "antd/lib/form";

interface ModalFormProps {
	rs: RootStore,
	key: string
}

class ModalForm extends Component<ModalFormProps & FormComponentProps> {

	constructor(props: ModalFormProps & FormComponentProps) {
		super(props);
	}

	onCancel() {
		this.props.rs.us.setComponentVisibility(this.props.key, false);
		this.props.form.resetFields();
	}

	render() {
		return <div/>;
	}
}