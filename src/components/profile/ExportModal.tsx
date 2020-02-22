import { observer } from "mobx-react";
import RootStore from "../../stores/RootStore";
import { Modal } from "antd";
import React from "react";
import DownloadProfileButton from "./DownloadProfileButton";


export const ExportModal = observer((props: {rs: RootStore}) => (
	<Modal
		centered
		visible={props.rs.us.exportModalVisible}
		title="Save your profile"
		onCancel={() => props.rs.us.exportModalVisible = false}
		footer={null}
		zIndex={1100}
		width="auto"
	>
		<DownloadProfileButton
			rs={props.rs}
			whenDone={() => props.rs.us.exportModalVisible = false}
		/>
	</Modal>
));
