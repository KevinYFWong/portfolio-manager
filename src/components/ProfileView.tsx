import React, { Component } from "react";
import { observer } from "mobx-react";
import { Popover, Button, Icon } from "antd";
import { ProfileStore } from "../stores/ProfileStore";
import ImportJSONButton from "./ImportJSONButton";
import { observable } from "mobx";
import DownloadProfileButton from "./DownloadProfileButton";


@observer
export default class ProfileView extends Component<{ps: ProfileStore}> {
	@observable private shown: boolean = false;
	render() {
		const hide = () => this.shown = false;
		const content = (
		<div
			style={{textAlign: "center"}}
			// actions={[
			// 	<Icon type="edit" key="edit"></Icon>,
				// <ImportJSONButton
				// 	ps={this.props.ps}
				// 	whenDone={() => this.shown = false}
				// ></ImportJSONButton>,
			// 	<Icon type="download" key="download"></Icon>
			// ]}
		>
			<ImportJSONButton
				ps={this.props.ps}
				whenDone={hide}
			></ImportJSONButton>
			<br/>
			<DownloadProfileButton ps={this.props.ps} whenDone={hide}/>

		</div>
		);

		return <Popover
			content={content}
			trigger="click"
			visible={this.shown}
			onVisibleChange={v => this.shown = v}
			placement="topLeft"
			title="Profile Settings"
		>
			<div onClick={() => this.shown = true}>
				<Button>
					<Icon type="profile"></Icon>
					Profile - {this.props.ps.name}
				</Button>
			</div>
		</Popover>
	}
}
