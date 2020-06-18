import { observer } from "mobx-react";
import RootStore from "../../stores/RootStore";
import React from "react";
import { List, Button, Statistic } from "antd";
import { Account } from "../../model/Account";
import AssetAllocation from "../../model/AssetAllocation";



export const AssetAllocationList = observer((props: {rs: RootStore}) => {
	const us = props.rs.us;
	const acc = props.rs.ps.accounts.get(us.selectedAccount) as Account;
	const clickHandler = (aa: AssetAllocation) => {
		return (_: React.MouseEvent<HTMLElement, MouseEvent>) => {
			us.currentAssetAllocation = aa;
			us.editAAModalVisible = true;
		}
	}
	return <List
	bordered={false}
	>
		{
			acc.assetAllocation.map((aa: AssetAllocation) => {
				return <List.Item key={aa.ticker.asString} actions={[
					<Button size="large" icon="edit" type="primary" onClick={clickHandler(aa)}>Edit</Button>
				]}>
					<Statistic value={aa.ticker.asString}/>
					<Statistic suffix="%" value={aa.portion * 100} precision={2}/>
				</List.Item>
			})
		}
	</List>;
});
