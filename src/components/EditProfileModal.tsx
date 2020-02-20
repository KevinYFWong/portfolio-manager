import RootStore from "../stores/RootStore";
import React, { Component } from "react";
import { Modal, Form, Input } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { observer } from "mobx-react";


interface Props {
	rs: RootStore
};

@observer
class EditProfileModal extends Component<Props & FormComponentProps> {
	render() {
		const { getFieldDecorator } = this.props.form;
		return <Modal
			centered
			visible={this.props.rs.us.profileModalVisible}
			title="Edit your profile"
			onCancel={() => this.props.rs.us.profileModalVisible = false}
			onOk={() => {
				this.props.rs.ps.name = this.props.form.getFieldValue("name");
				this.props.rs.us.profileModalVisible = false;
			}}
		>
			<Form layout="vertical">
				<Form.Item label="Profile Name">
					{ getFieldDecorator("name", {
						rules: [{ required: true, message: "Input profile name"}],
					})(<Input/>)}
				</Form.Item>
			</Form>
		</Modal>;
	}
}

export default Form.create<Props & FormComponentProps>()(EditProfileModal);
