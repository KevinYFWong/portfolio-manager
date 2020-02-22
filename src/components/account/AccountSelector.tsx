import { observer } from "mobx-react";
import React, { Component } from "react";
import RootStore from "../../stores/RootStore";
import { Select } from "antd";


@observer
export default class AccountSelector extends Component<{rs: RootStore}> {
	render() {
		const accounts = Array.from(this.props.rs.ps.accounts.values())
		const onSelect = (e: string) => {
			if (e !== "new") this.props.rs.us.selectedAccount = e;
			else {
				this.props.rs.us.creatingAccount = true;
				this.props.rs.us.editAccountModalVisible = true;
			}
		};
		return <Select
			size="large"
			style={{width: "auto", minWidth: 200}}
			placeholder="Select an account"
			value={this.props.rs.us.selectedAccount}
			onSelect={onSelect}
		>
			{accounts.map(a =>
				<Select.Option key={a.id}>{a.name}</Select.Option>
			)}
			<Select.Option key="new">Create a new account</Select.Option>
		</Select>
	}
}
