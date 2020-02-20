import React, { Component } from "react";
import { observer } from "mobx-react";
import { Layout } from "antd";
import { ProfileStore } from "../stores/ProfileStore";
import ProfileView from "./ProfileView";


@observer
export default class Header extends Component<{ps: ProfileStore}> {
	render() {
		return <Layout.Header>
			<div style={{float: "left"}}>
				<ProfileView
					ps={this.props.ps}
				></ProfileView>
			</div>
		</Layout.Header>
	}
}
