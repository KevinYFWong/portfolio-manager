import React, { Component, ChangeEvent } from "react";
import { observer } from "mobx-react";
import { Popover, Button } from "antd";
import { ProfileStore } from "../stores/ProfileStore";


const content = (
	<div>
	  <p>Content</p>
	  <p>Content</p>
	</div>
);

@observer
export default class ProfileView extends Component<{ps: ProfileStore}> {
	render() {
		return <Popover
			content={content}
			trigger="click"
		>
			<Button>{this.props.ps.name}</Button>
		</Popover>
	}
}
