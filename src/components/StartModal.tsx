import React from "react";
import RootStore from "../stores/RootStore";
import { Modal, Button } from "antd";
import { observer } from "mobx-react";


export const StartModal = observer((props: {rs: RootStore}) => (<Modal
		centered
		visible={props.rs.us.startModalVisible}
		title="Get Started"
		onCancel={() => props.rs.us.startModalVisible = false}
		footer={null}
		zIndex={1090}
		maskClosable={false}
		width="auto"
	>
		<Button
			type="primary"
			style={{width: 100, margin: 10}}
			size="large"
			icon="import"
			onClick={() => {
				props.rs.us.startModalVisible = false;
				props.rs.us.loadModalVisible = true;
			}}
		>
			Load
		</Button>
		<Button
			type="primary"
			style={{width: 100, margin: 10}}
			size="large"
			icon="plus"
			onClick={() => {
				props.rs.us.startModalVisible = false;
				props.rs.us.profileModalVisible = true;
			}}
		>
			New
		</Button>
	</Modal>)
);