import React from 'react';
import './App.css';
import { Transaction } from './model/Transaction';
import { Ticker } from './model/Ticker';
import { Account } from './model/Account';
import AccountListView from './components/AccountListView';
import { Button, Layout, Menu } from 'antd';
import CSS from "csstype";
import Header from './components/Header';
import { ProfileStore } from './stores/ProfileStore';
const { Content, Footer } = Layout;


let tl: Transaction[] = [
	new Transaction(new Ticker("TSX", "XAW"), 10, 30.13),
	new Transaction(new Ticker("TSX", "XGRO"), 123, 25.64)
];

let accs: Account[] = [
	new Account("WealthSimple TFSA", tl, 12000.32)
];

let ps = new ProfileStore("Portfolio", accs);

const contentStyle: CSS.Properties = {
	backgroundColor: "#17181a"
};

const App = () => {
	return (
		<div className="App">
			<Layout>
				<Header ps={ps}></Header>
				<Content style={contentStyle}>
					<AccountListView accs={accs}></AccountListView>
					<Button type="primary">Test</Button>
				</Content>
				<Footer>this is the footer</Footer>
			</Layout>
		</div>
	);
}

export default App;
