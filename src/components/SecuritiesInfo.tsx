import { observer } from "mobx-react";
import RootStore from "../stores/RootStore";
import { Button, Popover, List, Empty, Table } from "antd";
import React from "react";
import { Ticker } from "../model/Ticker";
import Quote from "../model/Quote";



export const SecuritiesInfo = observer((props: {rs: RootStore}) => {
	const us = props.rs.us;
	const qs = props.rs.qs;
	const ps = props.rs.ps;
	const data = Array.from(props.rs.ps.tickers).map((tickString: string) => {
		const t = Ticker.fromString(tickString)
		return {
			ticker: t,
			quote: qs.getQuote(t),
			category: ps.getCategory(t)
		}
	});
	return <Table dataSource={data}>
		<Table.Column
			title="Asset"
			dataIndex="ticker"
			render={(t: Ticker) => t.asString}
		/>
		<Table.Column
			title="Price"
			dataIndex="quote"
			render={(q: Quote) => q.price ? q.price : "Unknown"}
		/>
		<Table.Column
			title="Category"
			dataIndex="category"
		/>
	</Table>
	// return <List bordered={false}>
	// 	{Array.from(props.rs.ps.tickers).map((tick: string) => {
	// 		const q = props.rs.qs.getQuote(Ticker.fromString(tick));
	// 		return <List.Item key={tick}>
	// 			{tick}: {q.price}, {q.status}
	// 		</List.Item>
	// 	})}
	// </List>
});
