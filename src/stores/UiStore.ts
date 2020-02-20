import { observable } from "mobx";


export default class UiStore {
	@observable profileVisible: boolean = false;
	@observable loading: boolean = false;
	@observable importFromJsonModalVisible: boolean = false;
	@observable startModalVisible: boolean = true;
	@observable loadModalVisible: boolean = false;
	@observable exportModalVisible: boolean = false;
	@observable profileModalVisible: boolean = false;
	@observable selectedAccounts: string[] = [];

	selectAccount(accountKey: string) {
		if (this.selectedAccounts.length === 0) this.selectedAccounts.push(accountKey);
		else this.selectedAccounts[0] = accountKey;
	}
}
