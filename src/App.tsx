import React from 'react';
import './App.css';
import { Transaction } from './model/Transaction';
import { Ticker } from './model/Ticker';
import { Account } from './model/Account';
import AccountListView from './components/AccountListView';
import { Button, Layout } from 'antd';
import CSS from "csstype";
import Header from './components/Header';
import { ProfileStore } from './stores/ProfileStore';
import RootStore from './stores/RootStore';
import UiStore from './stores/UiStore';
import QuoteStore from './stores/QuoteStore';
import { StartModal } from './components/StartModal';
import { LoadModal } from './components/LoadModal';
import EditProfileModal from './components/EditProfileModal';
import { ExportModal } from './components/ExportModal';
const { Content, Footer } = Layout;


let tl: Transaction[] = [
	new Transaction(new Ticker("TSX", "XAW"), 10, 30.13),
	new Transaction(new Ticker("TSX", "XGRO"), 123, 25.64)
];

let accs: Account[] = [
	new Account("WealthSimple TFSA", tl, 1240.32)
];

let ps = new ProfileStore("My Portfolio", accs);
let rs = new RootStore(ps, new UiStore(), new QuoteStore());

const contentStyle: CSS.Properties = {
	// backgroundColor: "#17181a"

};

const App = () => {
	return (
		<div className="App">
			<Layout style={{minHeight: "100vh"}}>
				<Header rs={rs}></Header>
				<Content style={contentStyle}>
					<div>
						<Button type="primary">Test</Button>
					</div>
				</Content>
				<Footer>this is the footer</Footer>
			</Layout>
			<StartModal rs={rs}/>
			<LoadModal rs={rs}/>
			<EditProfileModal rs={rs}/>
			<ExportModal rs={rs}/>
		</div>
	);
}

export default App;
