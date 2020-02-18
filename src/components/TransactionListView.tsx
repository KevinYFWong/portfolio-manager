import React, { Component } from "react"
import { observer } from "mobx-react"
import { Transaction } from "../model/Transaction"
import InputField from "./InputField"
import { isNumber } from "../util/Validator";

interface TransactionListViewProps {
	transactions: Transaction[]
}

@observer
export default class TransactionListView extends Component<TransactionListViewProps> {
	render() {
		return <div>
			<p>Transactions:</p>
			<ul>
				{this.props.transactions.map((trans) => (<TransactionView t={trans} key={trans.id}></TransactionView>))}
			</ul>
		</div>
	}
}

interface TransactionViewProps {
	t: Transaction
}

@observer
class TransactionView extends Component<TransactionViewProps> {
	render() {
		return <form>
			Bought:
			<InputField
				name="quantity"
				type="number"
				value={this.props.t.quantity}
				validator={isNumber}
				setter={(val: string) => this.props.t.quantity = Number(val)}
			></InputField>
			shares of
			<InputField
				name="ticker"
				type="text"
				value={this.props.t.ticker.symbol}
				validator={() => true}
				setter={(val: string) => this.props.t.ticker.symbol = val}
			></InputField>
			at
			<InputField
				name="price"
				type="number"
				value={this.props.t.unitPrice}
				validator={isNumber}
				setter={(val: string) => this.props.t.unitPrice = Number(val)}
			></InputField>
		</form>
	}
}
