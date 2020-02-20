import React, { Component } from "react";
import { ProfileStore } from "../stores/ProfileStore";
import { Button, message, Tooltip } from "antd";
import { observable } from "mobx";
import FileModal from "./FileModal";

interface Props {
	ps: ProfileStore;
	whenDone: () => void;
}

export default class ImportJSONButton extends Component<Props, {}>{
	@observable visible: boolean = false;

	public static defaultProps = {
		whenDone: () => ({})
	};

	constructor(props: Props) {
		super(props);
		this.handleFile = this.handleFile.bind(this);
		this.visibility = this.visibility.bind(this);
	}

	handleFile(file: File) {
		this.props.ps.load(file, (success: boolean) => {
			success ?
				message.success("Successfully loaded profile.") :
				message.error("Profile could not loaded.");
		});
	}

	visibility(v?: boolean): boolean {
		if (v !== undefined) this.visible = v;
		return this.visible;
	}

	render() {
		const onClick = () => {
			this.visible = true;
			this.props.whenDone();
		}
		return <div style={{ padding: 0 }}>
			<Tooltip title="Import a profile from JSON" placement="bottom">
				<Button
					onClick={onClick}
					icon="import"
					type="primary"
					size="large"
					style={{margin: 0}}
				>
					Import
				</Button>
			</Tooltip>
			<FileModal
				handleFile={this.handleFile}
				visibility={this.visibility}
				title="Import a profile from file"
				okText="Import"
			></FileModal>
		</div>
	}
}