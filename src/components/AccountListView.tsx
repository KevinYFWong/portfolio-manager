import React, { Component } from "react";
import { observer } from "mobx-react";
import { Account } from "../model/Account";
import TransactionListView from "./TransactionListView";
import { Menu, Icon } from "antd";
import RootStore from "../stores/RootStore";
import { ClickParam } from "antd/lib/menu";


@observer
export default class AccountListView extends Component<{rs: RootStore}> {
	constructor(props: {rs: RootStore}) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick(e: ClickParam) {
		if (e.key !== "new") this.props.rs.us.selectAccount(e.key)
	}

	render() {
		return <Menu
			mode="horizontal"
			theme="dark"
			style={{lineHeight: "64px", float:"left", margin: "0 10px"}}
			onClick={this.onClick}
			selectedKeys={this.props.rs.us.selectedAccounts}
		>
			{this.props.rs.ps.accounts.map(a => <Menu.Item key={a.id}>{a.name}</Menu.Item>)}
			<Menu.Item key="new"><Icon theme="filled" type="plus-circle" style={{fontSize: 16}}/>New Account</Menu.Item>
		</Menu>
	}
}

@observer
class AccountView extends Component<{acc: Account}> {
	render() {
		return <div>
			<p>{this.props.acc.name}</p>
			<p>Book value: {this.props.acc.bookValue}</p>
			<div>
				<TransactionListView transactions={this.props.acc.transactions}></TransactionListView>
			</div>
		</div>
	}
}

