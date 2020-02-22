import { observer } from "mobx-react";
import RootStore from "../../stores/RootStore";
import { Modal } from "antd";
import React from "react";
import ImportJSONButton from "./ImportJSONButton";


export const LoadModal = observer((props: {rs: RootStore}) => (
	<Modal
		centered
		visible={props.rs.us.loadModalVisible}
		title="Load a profile"
		onCancel={() => props.rs.us.loadModalVisible = false}
		footer={null}
		zIndex={1100}
		width="auto"
	>
		<ImportJSONButton
			rs={props.rs}
			whenDone={() => props.rs.us.loadModalVisible = false}
		/>
	</Modal>
));
