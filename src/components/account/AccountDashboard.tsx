import { Account } from "../../model/Account";
import { observer } from "mobx-react";
import RootStore from "../../stores/RootStore";
import React from "react";
import { Empty, Statistic } from "antd";


export const AccountDashboard = observer((props: {rs: RootStore}) => {
	const us = props.rs.us;
	if (us.selectedAccount === "") {
		return <div style={{textAlign: "center"}}>
			<Empty description="Select an account"/>
		</div>;
	} else {
		const acc = props.rs.ps.accounts.get(us.selectedAccount) as Account;
		const dollarReturn = acc.currentValue - acc.principal;
		const pctReturn = dollarReturn / acc.principal * 100;
		return <div>
			<Statistic title="Principal" prefix="$" value={acc.principal} precision={2}/>
			<Statistic title="Current Value" prefix="$" value={acc.currentValue} precision={2}/>
			<Statistic title="Return" prefix="$" value={dollarReturn} precision={2}/>
			<Statistic title="Return (%)" suffix="%" value={pctReturn} precision={2}/>
			<Statistic title="Annual Return (%)" suffix="%" value={acc.xirr * 100} precision={2}/>
		</div>
	}
});
