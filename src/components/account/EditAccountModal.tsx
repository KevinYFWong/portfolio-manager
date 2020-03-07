import RootStore from "../../stores/RootStore";
import React, { Component } from "react";
import { Modal, Form, Input, InputNumber } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { observer } from "mobx-react";
import { Account } from "../../model/Account";
import shortid from "shortid";


interface Props {
	rs: RootStore
};

@observer
class EditAccountModal extends Component<Props & FormComponentProps> {
	private action: string = "";
	private name: string = "";
	private balance: number = 0;

	constructor(props: Props & FormComponentProps) {
		super(props);
		this.onCancel = this.onCancel.bind(this);
		this.onOk = this.onOk.bind(this);
	}

	onCancel() {
		this.props.rs.us.editAccountModalVisible = false
		this.props.rs.us.creatingAccount = false
		this.props.form.resetFields();
	}

	onOk() {
		const us = this.props.rs.us;
		const name = this.props.form.getFieldValue("name");
		const balance = this.props.form.getFieldValue("balance");
		if (this.props.rs.us.creatingAccount) {
			let acc = new Account(name, [], [], [], balance, shortid.generate());
			this.props.rs.ps.accounts.set(acc.id, acc);
			us.selectedAccount = acc.id;
		} else {
			const acc = this.props.rs.ps.accounts.get(us.selectedAccount);
			if (acc) {
				acc.name = name;
				acc.balance = balance;
			}
		}
		this.onCancel();
	}

	prepNewAccount() {
		this.action = "Create"
		this.name = "";
		this.balance = 0;
	}

	prepEditAccount() {
		const us = this.props.rs.us;
		const acc = this.props.rs.ps.accounts.get(us.selectedAccount);
		this.action = "Edit";
		this.name = acc?.name as string;
		this.balance = acc?.balance as number;
	}

	render() {
		const us = this.props.rs.us;
		const { getFieldDecorator } = this.props.form;
		if (us.creatingAccount) {
			this.prepNewAccount();
		} else if (us.selectedAccount !== "") {
			this.prepEditAccount();
		}
		return <Modal
			centered
			visible={us.editAccountModalVisible}
			title={this.action + " account"}
			onCancel={this.onCancel}
			onOk={this.onOk}
		>
			<Form layout="vertical">
				<Form.Item label="Account Name">
					{ getFieldDecorator("name", {
						rules: [{ required: true, message: "Input account name"}],
						initialValue: `${this.name}`
					})(<Input/>)}
				</Form.Item>
				<Form.Item label="Current Balance">
					{ getFieldDecorator("balance", {
						rules: [{ required: true, message: "Input current balance"}],
						initialValue: `${this.balance}`
					})(<InputNumber precision={2}/>)}
				</Form.Item>
			</Form>
		</Modal>;
	}
}

export default Form.create<Props & FormComponentProps>()(EditAccountModal);
