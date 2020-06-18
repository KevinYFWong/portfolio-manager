import React, { Component } from "react";
import RootStore from "../../stores/RootStore";
import { observer } from "mobx-react";
import { Empty } from "antd";
import { Account } from "../../model/Account";
import QuoteStore from "../../stores/QuoteStore";
import { Ticker } from "../../model/Ticker";
import { QuoteStatus } from "../../model/Quote";
import { balance } from "../../util/Balancer";

@observer
export default class AccountBalancer extends Component<{rs: RootStore}> {
	render() {
		// grab asset list, merge with aa target list.
		// warn if some prices could not be found.
		// put all in to balancer, (0 aa for owned not on aa list)
		// output list of transactions needed
		const qs = QuoteStore.getInstance();
		const us = this.props.rs.us;
		if (us.selectedAccount === "") {
			return <div style={{textAlign: "center"}}>
				<Empty description="Select an account"/>
			</div>;
		}
		const acc = this.props.rs.ps.accounts.get(us.selectedAccount) as Account;
		const totalValue = acc.currentValue();

		// Populate asset list
		const assets = new Set<string>();
		const aaMap = new Map<string, number>();  // todo: asset allocations should just be refactored to map
		acc.assets.forEach((_, ticker) => assets.add(ticker));
		acc.assetAllocation.forEach(aa => {
			assets.add(aa.ticker.asString);
			aaMap.set(aa.ticker.asString, aa.portion);
		});

		const ideals = new Array<number>();
		const costs = new Array<number>();

		assets.forEach(t => {
			const quote = qs.getQuote(Ticker.fromString(t));
			if (quote.price !== undefined && (quote.status === QuoteStatus.Filled || quote.status === QuoteStatus.UserSpecified)) {
				costs.push(quote.price);
				ideals.push((aaMap.has(t) ? aaMap.get(t) as number : 0) * totalValue / quote.price);
			}
		});

		if (costs.length !== assets.size) {
			return <div>Not all prices have been fetched</div>;
		} else if (aaMap.size === 0) {
			return <div>No target allocation given</div>
		}

		const result = balance(ideals, costs, totalValue, 0.01);
		console.log(result);
		if (!result["feasible"]) return <div>An error occurred</div>;
		let transactionList = "";
		let i = 0;
		assets.forEach(t => {
			const currentNumUnits = acc.assets.has(t) ? acc.assets.get(t) as number : 0;
			transactionList = transactionList.concat(`${t}: ${result[i] - currentNumUnits}\n`);
			++i;
		});
		return <div>
			{transactionList}
		</div>;
	}
}
