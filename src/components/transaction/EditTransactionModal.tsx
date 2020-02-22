import RootStore from "../../stores/RootStore";
import React, { Component } from "react";
import { Modal, Form, InputNumber, Input } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { observer } from "mobx-react";
import { Account } from "../../model/Account";
import { Transaction } from "../../model/Transaction";
import { Ticker } from "../../model/Ticker";
import shortid from "shortid";


interface Props {
	rs: RootStore
};

@observer
class EditTransactionModal extends Component<Props & FormComponentProps> {
	private action: string = "";
	private quantity: number = 0;
	private exchange: string = "";
	private symbol: string = "";
	private unitPrice: number = 0;

	constructor(props: Props & FormComponentProps) {
		super(props);
		this.onCancel = this.onCancel.bind(this);
		this.onOk = this.onOk.bind(this);
	}

	onCancel() {
		this.props.rs.us.editTransactionModalVisible = false
		this.props.rs.us.currentTransaction = undefined;
		this.props.form.resetFields();
	}

	onOk() {
		const us = this.props.rs.us;
		const form = this.props.form;
		const quantity: number = form.getFieldValue("quantity");
		const exchange: string = form.getFieldValue("exchange");
		const symbol: string = form.getFieldValue("symbol");
		const unitPrice: number = form.getFieldValue("price");
		if (this.props.rs.us.currentTransaction) {
			const ct = this.props.rs.us.currentTransaction;
			ct.quantity = quantity;
			ct.ticker.exchange = exchange;
			ct.ticker.symbol = symbol;
			ct.unitPrice = unitPrice;
		} else {
			const acc = this.props.rs.ps.accounts.get(us.selectedAccount) as Account;
			if (acc) {
				const tick = new Ticker(exchange, symbol);
				acc.transactions.push(new Transaction(tick, quantity, unitPrice, shortid.generate()));
			}
		}
		this.onCancel();
	}

	prepNewAccount() {
		this.action = "Create";
		this.quantity = 0;
		this.exchange = "";
		this.symbol = "";
		this.unitPrice = 0;
	}

	prepEditAccount() {
		const t = this.props.rs.us.currentTransaction as Transaction;
		this.action = "Edit";
		this.quantity = t.quantity;
		this.exchange = t.ticker.exchange;
		this.symbol = t.ticker.symbol;
		this.unitPrice = t.unitPrice;
	}

	render() {
		const us = this.props.rs.us;
		const { getFieldDecorator } = this.props.form;
		if (us.currentTransaction) {
			this.prepEditAccount();
		} else {
			this.prepNewAccount();
		}
		return <Modal
			centered
			visible={us.editTransactionModalVisible}
			title={this.action + " transaction"}
			onCancel={this.onCancel}
			onOk={this.onOk}
		>
			<Form layout="vertical">
				<Form.Item label="Quantity">
					{ getFieldDecorator("quantity", {
						rules: [{ required: true, message: "Input transfer quantity"}],
						initialValue: `${this.quantity}`
					})(<InputNumber precision={0}/>)}
				</Form.Item>
				<Form.Item label="Exchange">
					{ getFieldDecorator("exchange", {
						rules: [{ required: true, message: "Input exchange"}],
						initialValue: this.exchange
					})(<Input/>)}
				</Form.Item>
				<Form.Item label="Symbol">
					{ getFieldDecorator("symbol", {
						rules: [{ required: true, message: "Input symbol"}],
						initialValue: this.symbol
					})(<Input/>)}
				</Form.Item>
				<Form.Item label="Unit Price">
					{ getFieldDecorator("price", {
						rules: [{ required: true, message: "Input unit price"}],
						initialValue: `${this.unitPrice}`
					})(<InputNumber precision={2}/>)}
				</Form.Item>
			</Form>
		</Modal>;
	}
}

export default Form.create<Props & FormComponentProps>()(EditTransactionModal);
