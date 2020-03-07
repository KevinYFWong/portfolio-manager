import RootStore from "../../stores/RootStore";
import React, { Component } from "react";
import { Modal, Form, DatePicker, InputNumber } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { observer } from "mobx-react";
import moment, { Moment } from "moment";
import Transfer from "../../model/Transfer";
import { Account } from "../../model/Account";
import shortid from "shortid";


interface Props {
	rs: RootStore
};

@observer
class EditTransferModal extends Component<Props & FormComponentProps> {
	private action: string = "";
	private value: number = 0;
	private date: Moment = moment();

	constructor(props: Props & FormComponentProps) {
		super(props);
		this.onCancel = this.onCancel.bind(this);
		this.onOk = this.onOk.bind(this);
	}

	onCancel() {
		this.props.rs.us.editTransferModalVisible = false
		this.props.rs.us.currentTransfer = undefined;
		this.props.form.resetFields();
	}

	onOk() {
		const us = this.props.rs.us;
		const value = this.props.form.getFieldValue("value");
		const date = this.props.form.getFieldValue("date") as Moment;
		const acc = this.props.rs.ps.accounts.get(us.selectedAccount) as Account;
		if (this.props.rs.us.currentTransfer) {
			this.props.rs.us.currentTransfer.value = value;
			this.props.rs.us.currentTransfer.date = date.toDate();
		} else {
			if (acc) {
				acc.transfers.push(new Transfer(value, date.toDate(), shortid.generate()));
			}
		}
		this.onCancel();
		acc.sortTransfers();
	}

	prepNew() {
		this.action = "Create";
		this.value = 0;
		this.date = moment();
	}

	prepEdit() {
		this.action = "Edit";
		const t = this.props.rs.us.currentTransfer as Transfer;
		this.value = t.value;
		this.date = moment(t.date);
	}

	render() {
		const us = this.props.rs.us;
		const { getFieldDecorator } = this.props.form;
		if (us.currentTransfer) {
			this.prepEdit();
		} else {
			this.prepNew();
		}
		return <Modal
			centered
			visible={us.editTransferModalVisible}
			title={this.action + " transfer"}
			onCancel={this.onCancel}
			onOk={this.onOk}
		>
			<Form layout="vertical">
				<Form.Item label="Value">
					{ getFieldDecorator("value", {
						rules: [{ required: true, message: "Input transfer value"}],
						initialValue: `${this.value}`
					})(<InputNumber precision={2}/>)}
				</Form.Item>
				<Form.Item label="Date">
					{ getFieldDecorator("date", {
						rules: [{ required: true, message: "Input date"}],
						initialValue: this.date
					})(<DatePicker format="MMMM Do YYYY"/>)}
				</Form.Item>
			</Form>
		</Modal>;
	}
}

export default Form.create<Props & FormComponentProps>()(EditTransferModal);
