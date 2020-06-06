import React, { Component } from "react";
import RootStore from "../../stores/RootStore";
import { observer } from "mobx-react";

@observer
export default class AccountBalancer extends Component<{rs: RootStore}> {
	render() {
		return <div>
			blah
		</div>
	}
}
