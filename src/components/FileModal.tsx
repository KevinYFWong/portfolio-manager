import React, { Component, ChangeEvent } from "react";
import { Modal } from "antd";
import { observable } from "mobx";
import { observer } from "mobx-react";

interface FileModalProps {
	okText: string;
	title: string;
	handleFile: (file: File) => void;
	visibility: (vis?: boolean) => boolean;
}

@observer
export default class FileModal extends Component<FileModalProps> {
	@observable private currentFile: File | undefined;

	constructor(props: FileModalProps) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit() {
		if (this.currentFile) {
			this.props.handleFile(this.currentFile);
			this.props.visibility(false);
		}
	}

	onChange(e: ChangeEvent<HTMLInputElement>) {
		if (e.target.files) this.currentFile = e.target.files[0];
	}

	render() {
		return <Modal
			centered
			visible={this.props.visibility()}
			title={this.props.title}
			okText={this.props.okText}
			zIndex={1100} // To overlay popovers
			okButtonProps={{ disabled: !this.currentFile }}
			onCancel={() => this.props.visibility(false)}
			onOk={this.onSubmit}
		>
			<input
				type="file"
				accept=".json"
				onChange={this.onChange}
			></input>
		</Modal>
	}
}
