import React, { Component } from "react";
import { observer } from "mobx-react";
import { Account } from "../model/Account";
import TransactionListView from "./TransactionListView";


@observer
export default class AccountListView extends Component<{accs: Account[]}> {
	render() {
		return <div>
			<p>Accounts: </p>
			<ul>
				{this.props.accs.map(a => <AccountView acc={a} key={a.id}></AccountView>)}
			</ul>
		</div>
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

