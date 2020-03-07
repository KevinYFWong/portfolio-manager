import React, { Component } from "react";
import RootStore from "../../stores/RootStore";
import { observer } from "mobx-react";
import { Descriptions, Icon, Empty, Button, Collapse, Popconfirm } from "antd";
import { Account } from "../../model/Account";
import { TransferList } from "../transfer/TransferList";
import { TransactionList } from "../transaction/TransactionList";
import { AssetAllocationList } from "../assetallocation/AssetAllocationList";


@observer
export default class AccountDetails extends Component<{rs: RootStore}> {
	render() {
		const us = this.props.rs.us;
		if (us.selectedAccount === "") {
			return <div style={{textAlign: "center"}}>
				<Empty description="Select an account"/>
			</div>;
		} else {
			const acc = this.props.rs.ps.accounts.get(us.selectedAccount) as Account;
			const onConfirm = () => {
				us.selectedAccount = "";
				this.props.rs.ps.accounts.delete(acc.id);
			}
			// add buttons
			const addTransfer = <Icon
				style={{fontSize:20}}
				type="plus-square"
				theme="twoTone"
				twoToneColor="#65c765"
				onClick={(e) => {
					us.editTransferModalVisible = true;
					e.stopPropagation();
				}}
			/>;
			const addTransaction = <Icon
				style={{fontSize:20}}
				type="plus-square"
				theme="twoTone"
				twoToneColor="#65c765"
				onClick={(e) => {
					us.editTransactionModalVisible = true;
					e.stopPropagation();
				}}
			/>;
			const addAA = <Icon
				style={{fontSize:20}}
				type="plus-square"
				theme="twoTone"
				twoToneColor="#65c765"
				onClick={(e) => {
					us.editAAModalVisible = true;
					e.stopPropagation();
				}}
			/>;
			return <div style={{textAlign: "left"}}>
				<Descriptions
					title={
						<span>
							Account Summary  <Button onClick={() => us.editAccountModalVisible = true}>
								<Icon type="edit" theme="twoTone"></Icon>
							</Button>  <Popconfirm
								title="Are you sure you want to delete this account?"
								okText="Yes"
								cancelText="No"
								onConfirm={onConfirm}
							>
								<Button>
									<Icon type="delete" theme="twoTone" twoToneColor="#d43348"/>
								</Button>
							</Popconfirm>
						</span>
					}
					bordered
				>
					<Descriptions.Item label="Name">{acc.name}</Descriptions.Item>
					<Descriptions.Item label="Balance">${acc.balance}</Descriptions.Item>
				</Descriptions>
				<br/>
				<Collapse>
					<Collapse.Panel header="Transfers" key="transfers" extra={addTransfer}>
						<TransferList rs={this.props.rs}></TransferList>
					</Collapse.Panel>
					<Collapse.Panel header="Transactions" key="transactions" extra={addTransaction}>
						<TransactionList rs={this.props.rs}/>
					</Collapse.Panel>
					<Collapse.Panel header="Asset Allocation" key="aa" extra={addAA}>
						<AssetAllocationList rs={this.props.rs}/>
					</Collapse.Panel>
				</Collapse>
			</div>;
		}
	}
}
