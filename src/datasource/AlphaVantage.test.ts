import AlphaVantage from "./AlphaVantage";
import { Ticker } from "../model/Ticker";


test("alphavantage quote", async () => {
	const av = new AlphaVantage();
	const result = await av.getPrice(new Ticker("TSX", "XAW"));
	console.log(`result: ${result}`);
	expect(result).not.toBeUndefined();
});
