import { observer } from "mobx-react";
import RootStore from "../../stores/RootStore";
import React from "react";
import { List, Button, Statistic } from "antd";
import { Account } from "../../model/Account";
import Transfer from "../../model/Transfer";


export const TransferList = observer((props: { rs: RootStore }) => {
	const us = props.rs.us;
	const acc = props.rs.ps.accounts.get(us.selectedAccount) as Account;
	const onClickGen = (t: Transfer) => {
		return (_: React.MouseEvent<HTMLElement, MouseEvent>) => {
			us.currentTransfer = t;
			us.editTransferModalVisible = true;
		}
	}
	return <List
	bordered={false}
	>
		{acc.transfers.map((transfer: Transfer) => {
			return <List.Item key={transfer.id} actions={[
				<Button icon="edit" type="primary" onClick={onClickGen(transfer)}>Edit</Button>
			]}>
	 			<Statistic prefix="$" title="Cash Transfer of" value={transfer.value} precision={2}/>
	 			<Statistic title="on" value={transfer.date.toDateString()}/>
			</List.Item>
		})}
	</List>;
});
