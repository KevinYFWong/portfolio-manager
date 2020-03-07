import { observer } from "mobx-react";
import RootStore from "../../stores/RootStore";
import React from "react";
import { Tabs, Icon } from "antd";
import AccountDetails from "./AccountDetails";
import { AccountDashboard } from "./AccountDashboard";
import { SecuritiesInfo } from "../SecuritiesInfo";


export const DisplayTabs = observer((props: {rs: RootStore}) => {
	const us = props.rs.us;
	const onClick = (key: string) => {
		us.currentTab = key;
	};
	return <Tabs activeKey={us.currentTab} onTabClick={onClick}>
		<Tabs.TabPane tab={
			<span>
				<Icon type="bar-chart"/>
				Dashboard
			</span>}
			key="dashboard"
		>
			<AccountDashboard rs={props.rs}/>
		</Tabs.TabPane>
		<Tabs.TabPane tab={
			<span>
				<Icon type="unordered-list"/>
				Details
			</span>}
			key="details"
		>
			<AccountDetails rs={props.rs}/>
		</Tabs.TabPane>
		<Tabs.TabPane tab={
			<span>
				<Icon type="info-circle"/>
				Securities Info
			</span>}
			key="sec-info"
		>
			<SecuritiesInfo rs={props.rs}/>
		</Tabs.TabPane>
		<Tabs.TabPane tab={
			<span>
				<Icon type="control"/>
				Rebalance
			</span>}
			key="rebalance"
		>
			rebalance
		</Tabs.TabPane>
	</Tabs>;
});
