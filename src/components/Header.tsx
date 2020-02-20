import React, { Component } from "react";
import { observer } from "mobx-react";
import { Layout } from "antd";
import ProfileView from "./ProfileView";
import RootStore from "../stores/RootStore";
import AccountListView from "./AccountListView";


@observer
export default class Header extends Component<{rs: RootStore}> {
	render() {
		return <Layout.Header>
			<div style={{float: "left"}}>
				<ProfileView
					rs={this.props.rs}
				></ProfileView>
			</div>
			<AccountListView rs={this.props.rs}/>
		</Layout.Header>
	}
}
