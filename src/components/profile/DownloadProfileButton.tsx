import React, { Component } from "react";
import { Button, message } from "antd";
import RootStore from "../../stores/RootStore";

interface Props {
	rs: RootStore;
	whenDone: () => void;
}

export default class DownloadProfileButton extends Component<Props, {}>{
	public static defaultProps = {
		whenDone: () => ({})
	};

	render() {
		const onClick = () => {
			this.props.whenDone();
			const psData = this.props.rs.ps.export();
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
			<Button
				onClick={onClick}
				icon="download"
				type="primary"
				size="large"
				style={{margin: 0}}
			>
				Download your profile
			</Button>
		</div>
	}
}