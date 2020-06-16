import React from 'react';
import './App.css';
import { Account } from './model/Account';
import { Layout, Row, Col, message } from 'antd';
import Header from './components/Header';
import { ProfileStore } from './stores/ProfileStore';
import RootStore from './stores/RootStore';
import UiStore from './stores/UiStore';
import QuoteStore from './stores/QuoteStore';
import { StartModal } from './components/profile/StartModal';
import { LoadModal } from './components/profile/LoadModal';
import EditProfileModal from './components/profile/EditProfileModal';
import { ExportModal } from './components/profile/ExportModal';
import EditAccountModal from './components/account/EditAccountModal';
import AccountSelector from './components/account/AccountSelector';
import { DisplayTabs } from './components/account/DisplayTabs';
import shortid from 'shortid';
import EditTransferModal from './components/transfer/EditTransferModal';
import EditTransactionModal from './components/transaction/EditTransactionModal';
import EditAssetAllocationModal from './components/assetallocation/EditAssetAllocationModal';
const { Content, Footer } = Layout;


let accs: Account[] = [
	new Account("Your Account", [], [], [], 0, shortid.generate())
];

let accMap: Map<string, Account> = new Map<string, Account>();
accs.forEach(a => accMap.set(a.id, a));

let us = new UiStore();
let ps = new ProfileStore("My Portfolio", accMap, new Map<string, string>(), us);
let rs = new RootStore(ps, us, QuoteStore.getInstance());
message.config({
	top: 70
});

const App = () => {
	return (
		<div className="App">
			<Layout style={{ minHeight: "100vh" }}>
				<Header rs={rs}></Header>
				<Content>
					<br/>
					<Row>
						<Col>
							<div style={{ margin: "0 10px" }}>
								Account: <AccountSelector rs={rs} />
							</div>
						</Col>
					</Row>
					<br/>
					<div style={{ margin: "0 10px"}}>
						<DisplayTabs rs={rs}/>
					</div>
				</Content>
				<Footer>this is the footer</Footer>
			</Layout>
			<StartModal rs={rs}/>
			<LoadModal rs={rs}/>
			<EditProfileModal rs={rs}/>
			<ExportModal rs={rs}/>
			<EditAccountModal rs={rs}/>
			<EditTransferModal rs={rs}/>
			<EditTransactionModal rs={rs}/>
			<EditAssetAllocationModal rs={rs}/>
		</div>
	);
}

export default App;
