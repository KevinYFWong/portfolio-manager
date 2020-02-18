import { Ticker } from "../model/Ticker";
import Quote from "../model/Quote";


export default interface DataSource {
	getPrice(ticker: Ticker): Promise<number | undefined>;
}
