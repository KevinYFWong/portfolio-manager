import RootStore from "../../stores/RootStore";
import React, { Component } from "react";
import { Modal, Form, InputNumber, Input, message } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { observer } from "mobx-react";
import { Account } from "../../model/Account";
import AssetAllocation from "../../model/AssetAllocation";
import { Ticker } from "../../model/Ticker";


interface Props {
	rs: RootStore
};

@observer
class EditAssetAllocationModal extends Component<Props & FormComponentProps> {
	private action: string = "";
	private exchange: string = "";
	private symbol: string = "";
	private value: number = 0;

	constructor(props: Props & FormComponentProps) {
		super(props);
		this.onCancel = this.onCancel.bind(this);
		this.onOk = this.onOk.bind(this);
	}

	onCancel() {
		this.props.rs.us.editAAModalVisible = false
		this.props.rs.us.currentAssetAllocation = undefined;
		this.props.form.resetFields();
	}

	onOk() {
		const us = this.props.rs.us;
		const value = this.props.form.getFieldValue("alloc");
		const exchange: string = this.props.form.getFieldValue("exchange");
		const symbol: string = this.props.form.getFieldValue("symbol");
		const acc = this.props.rs.ps.accounts.get(us.selectedAccount) as Account;
		const t = new Ticker(exchange, symbol);
		const findDuplicate = () => acc.assetAllocation.find(
			aa => aa.ticker.isEqual(t)
		);
		if (us.currentAssetAllocation) {
			const dupe = findDuplicate();
			const aa = us.currentAssetAllocation;
			if (dupe && !aa.ticker.isEqual(dupe.ticker)) {
				message.error("The same asset cannot have multiple entries");
				return;
			} else {
				aa.portion = value / 100;
				aa.ticker = t;
			}
		} else {
			const dupe = findDuplicate();
			if (dupe) {
				message.error("The same asset cannot have multiple entries");
				return;
			}
			acc.assetAllocation.push(new AssetAllocation(t, value / 100));
		}
		this.onCancel();
	}

	prepNew() {
		this.action = "Create";
		this.exchange = "";
		this.symbol = "";
		this.value = 0;
	}

	prepEdit() {
		this.action = "Edit";
		const aa = this.props.rs.us.currentAssetAllocation as AssetAllocation
		this.exchange = aa.ticker.exchange;
		this.symbol = aa.ticker.symbol;
		this.value = aa.portion * 100;
	}

	render() {
		const us = this.props.rs.us;
		const { getFieldDecorator } = this.props.form;
		if (us.currentAssetAllocation) {
			this.prepEdit();
		} else {
			this.prepNew();
		}
		return <Modal
			centered
			visible={us.editAAModalVisible}
			title={this.action + " asset allocation"}
			onCancel={this.onCancel}
			onOk={this.onOk}
		>
			<Form layout="vertical">
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
				<Form.Item label="Allocation (%)">
					{ getFieldDecorator("alloc", {
						rules: [{ required: true, message: "Input allocation"}],
						initialValue: `${this.value}`
					})(<InputNumber precision={2}/>)}
				</Form.Item>
			</Form>
		</Modal>;
	}
}

export default Form.create<Props & FormComponentProps>()(EditAssetAllocationModal);
