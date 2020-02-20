import React, { Component } from "react";
import { ProfileStore } from "../stores/ProfileStore";
import { Button, Tooltip, message } from "antd";
import { observable } from "mobx";

interface Props {
	ps: ProfileStore;
	whenDone: () => void;
}

export default class DownloadProfileButton extends Component<Props, {}>{
	@observable visible: boolean = false;

	public static defaultProps = {
		whenDone: () => ({})
	};

	render() {
		const onClick = () => {
			this.props.whenDone();
			const psData = this.props.ps.export();
			if (psData) {
				const dataStr = "data:text/json;charset=utf-8," +
					encodeURIComponent(JSON.stringify(psData));
				const dlNode = document.createElement("a");
				dlNode.setAttribute("href", dataStr);
				dlNode.setAttribute("download", "profile.json");
				document.body.appendChild(dlNode);
				dlNode.click();
				dlNode.remove();
			} else {
				message.error("Failed to export profile.");
			}
		}
		return <div style={{ padding: 0 }}>
			<Tooltip title="Export your profile to JSON" placement="bottom">
				<Button
					onClick={onClick}
					icon="download"
					type="primary"
					size="large"
					style={{margin: 0}}
				>
					Download
				</Button>
			</Tooltip>
		</div>
	}
}