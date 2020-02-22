import React, { Component } from "react";
import { observer } from "mobx-react";
import { Popover, Button, Icon } from "antd";
import RootStore from "../../stores/RootStore";


@observer
export default class ProfileView extends Component<{rs: RootStore}> {
	render() {
		const popover = (
		<div style={{textAlign: "center"}}>
			<Button
				type="primary"
				style={{width: "auto", margin: 10}}
				size="large"
				icon="edit"
				onClick={() => {
					this.props.rs.us.profileVisible = false;
					this.props.rs.us.profileModalVisible = true;
				}}
			>
				Edit Profile
			</Button>
			<br/>
			<Button
				type="primary"
				style={{width: 100, margin: 10}}
				size="large"
				icon="import"
				onClick={() => {
					this.props.rs.us.profileVisible = false;
					this.props.rs.us.loadModalVisible = true;
				}}
			>
				Load
			</Button>
			<Button
				type="primary"
				style={{width: 100, margin: 10}}
				size="large"
				icon="import"
				onClick={() => {
					this.props.rs.us.profileVisible = false;
					this.props.rs.us.exportModalVisible = true;
				}}
			>
				Export
			</Button>
		</div>
		);

		return <Popover
			content={popover}
			trigger="click"
			visible={this.props.rs.us.profileVisible}
			onVisibleChange={v => this.props.rs.us.profileVisible = v}
			placement="top"
			title="Profile Settings"
		>
			<Button onClick={() => this.props.rs.us.profileVisible = true}>
				<Icon type="profile"></Icon>
				Profile - {this.props.rs.ps.name}
			</Button>
		</Popover>
	}
}
