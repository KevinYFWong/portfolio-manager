import React, { Component } from "react";
import { Button, message } from "antd";
import FileModal from "./FileModal";
import RootStore from "../stores/RootStore";

interface Props {
	rs: RootStore;
	whenDone: () => void;
}

export default class ImportJSONButton extends Component<Props, {}>{
	public static defaultProps = {
		whenDone: () => ({})
	};

	constructor(props: Props) {
		super(props);
		this.handleFile = this.handleFile.bind(this);
		this.visibility = this.visibility.bind(this);
	}

	handleFile(file: File) {
		this.props.rs.ps.load(file, (success: boolean) => {
			success ?
				message.success("Successfully loaded profile.") :
				message.error("Profile could not loaded.");
		});
	}

	visibility(v?: boolean): boolean {
		if (v !== undefined) this.props.rs.us.importFromJsonModalVisible = v;
		return this.props.rs.us.importFromJsonModalVisible;
	}

	render() {
		const onClick = () => {
			this.props.rs.us.importFromJsonModalVisible = true;
			this.props.whenDone();
		}
		return <div style={{ padding: 0 }}>
			<Button
				onClick={onClick}
				icon="import"
				type="primary"
				size="large"
				style={{margin: 0}}
			>
				Import a profile from file
			</Button>
			<FileModal
				handleFile={this.handleFile}
				visibility={this.visibility}
				title="Import a profile from file"
				okText="Import"
			></FileModal>
		</div>
	}
}