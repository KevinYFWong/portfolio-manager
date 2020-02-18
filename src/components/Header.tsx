import React, { Component, ChangeEvent } from "react";
import { observer } from "mobx-react";
import { Layout, Popover } from "antd";
import { ProfileStore } from "../stores/ProfileStore";
import ProfileView from "./ProfileView";


@observer
export default class Header extends Component<{ps: ProfileStore}> {
	render() {
		return <Layout.Header>
			<ProfileView ps={this.props.ps}></ProfileView>
		</Layout.Header>
	}
}
