import { observable } from "mobx";
import Transfer from "../model/Transfer";
import { Transaction } from "../model/Transaction";
import AssetAllocation from "../model/AssetAllocation";


export default class UiStore {
	@observable loading: boolean = false;

	@observable profileVisible: boolean = false;
	@observable profileModalVisible: boolean = false;

	@observable startModalVisible: boolean = true;
	@observable importFromJsonModalVisible: boolean = false;
	@observable loadModalVisible: boolean = false;
	@observable exportModalVisible: boolean = false;

	@observable selectedAccount: string = "";
	@observable editAccountModalVisible: boolean = false;
	@observable creatingAccount: boolean = false;

	@observable currentTab: string = "dashboard";

	@observable editTransferModalVisible: boolean = false;
	@observable currentTransfer?: Transfer = undefined;

	@observable editTransactionModalVisible: boolean = false;
	@observable currentTransaction?: Transaction = undefined;

	@observable editAAModalVisible: boolean = false;
	@observable currentAssetAllocation?: AssetAllocation = undefined;

	reset() {
		this.selectedAccount = "";
		this.loading = false;
		this.currentTransfer = undefined;
		this.currentTransaction = undefined;
		this.currentAssetAllocation = undefined;
	}
}
