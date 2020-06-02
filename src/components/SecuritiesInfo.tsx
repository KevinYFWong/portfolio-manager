import { observer } from "mobx-react";
import RootStore from "../stores/RootStore";
import { Button, Table } from "antd";
import React from "react";
import { Ticker } from "../model/Ticker";
import Quote from "../model/Quote";



export const SecuritiesInfo = observer((props: {rs: RootStore}) => {
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
	return <Table dataSource={data} rowKey={r => r.ticker.asString}>
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
		<Table.Column
			title=""
			dataIndex="ticker"
			render={(t: Ticker) => <Button
				icon="edit"
			/>}
			key="edit"
		/>
	</Table>
});
