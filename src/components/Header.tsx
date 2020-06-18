import React, { Component } from "react";
import { observer } from "mobx-react";
import { Layout } from "antd";
import ProfileView from "./profile/ProfileView";
import RootStore from "../stores/RootStore";


@observer
export default class Header extends Component<{rs: RootStore}> {
	render() {
		return <Layout.Header>
			<div>
				<ProfileView rs={this.props.rs}/>
			</div>
		</Layout.Header>
	}
}
