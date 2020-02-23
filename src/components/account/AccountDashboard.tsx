import { observer } from "mobx-react";
import RootStore from "../../stores/RootStore";
import React from "react";
import { Empty } from "antd";


export const AccountDashboard = observer((props: {rs: RootStore}) => {
	const us = props.rs.us;
	if (us.selectedAccount === "") {
		return <div style={{textAlign: "center"}}>
			<Empty description="Select an account"/>
		</div>;
	} else {
		return <div style={{textAlign: "left"}}>
			testing
		</div>
	}
});