import React from 'react';
import './App.css';
import { Transaction } from './model/Transaction';
import { Ticker } from './model/Ticker';
import { Account } from './model/Account';
import { Layout, Row, Col } from 'antd';
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
import Transfer from './model/Transfer';
import EditTransferModal from './components/transfer/EditTransferModal';
import EditTransactionModal from './components/transaction/EditTransactionModal';
const { Content, Footer } = Layout;


let tl: Transaction[] = [
	new Transaction(new Ticker("TSX", "XAW"), 10, 30.13, shortid.generate()),
	new Transaction(new Ticker("TSX", "XGRO"), 123, 25.64, shortid.generate())
];

let tfs = [
	new Transfer(30123, new Date(), shortid.generate()),
	new Transfer(-323, new Date(), shortid.generate())
];

let accs: Account[] = [
	new Account("WealthSimple TFSA", tl, tfs, 1240.32, shortid.generate())
];

let accMap: Map<string, Account> = new Map<string, Account>();
accs.forEach(a => accMap.set(a.id, a));

let us = new UiStore();
let ps = new ProfileStore("My Portfolio", accMap, us);
let rs = new RootStore(ps, us, new QuoteStore());


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
		</div>
	);
}

export default App;
