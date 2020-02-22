import { observer } from "mobx-react";
import RootStore from "../../stores/RootStore";
import React from "react";
import { List, Button, Statistic } from "antd";
import { Account } from "../../model/Account";
import { Transaction } from "../../model/Transaction";


export const TransactionList = observer((props: { rs: RootStore }) => {
	const us = props.rs.us;
	const acc = props.rs.ps.accounts.get(us.selectedAccount) as Account;
	const onClickGen = (t: Transaction) => {
		return (_: React.MouseEvent<HTMLElement, MouseEvent>) => {
			us.currentTransaction = t;
			us.editTransactionModalVisible = true;
		}
	}
	return <List
	bordered={false}
	>
		{acc.transactions.map((transaction: Transaction) => {
			const action = transaction.quantity >= 0 ? "Bought" : "Sold";
			return <List.Item key={transaction.id} actions={[
				<Button icon="edit" type="primary" onClick={onClickGen(transaction)}>Edit</Button>
			]}>
				<Statistic title={action} value={transaction.quantity}/>
	 			<Statistic title="of" value={transaction.ticker.asString}/>
	 			<Statistic prefix="$" suffix="per share" title="at" value={transaction.unitPrice} precision={2}/>
			</List.Item>
		})}
	</List>;
});
