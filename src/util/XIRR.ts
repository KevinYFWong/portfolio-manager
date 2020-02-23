/**
 * A utility for calculating the irregular internal rate of return for transactions
 */
const maxIterations = 100;
const tolerance = 1e-5;

const newtonsMethod = (initialGuess: number, f: (x: number) => number, fPrime: (x: number) => number) => {
	const nm = (prev: number, iterations: number): number => {
		if (iterations === maxIterations || isNaN(prev) || !isFinite(prev)) return NaN;
		const estimate = prev - f(prev) / fPrime(prev);
		if (Math.abs(estimate - prev) < tolerance) return estimate;
		else return nm(estimate, iterations + 1);
	}
	return nm(initialGuess, 0);
}

const daysBetween = (d1: Date, d2: Date) => d2.getDate() - d1.getDate();

const f = (transactions: number[], dates: Date[]) => {
	const initialDate = dates[0];
	return (xirr: number) => {
		let result = 0;
		for (let i = 0; i < dates.length; ++i) {
			result += transactions[i] / Math.pow(1 + xirr, daysBetween(initialDate, dates[i]) / 365);
		}
		return result;
	}
}

const fPrime = (transactions: number[], dates: Date[]) => {
	const initialDate = dates[0];
	return (xirr: number) => {
		let result = 0;
		for (let i = 0; i < dates.length; ++i) {
			const ndb = daysBetween(dates[i], initialDate);
			result += transactions[i] / 365 * ndb * Math.pow(1 + xirr, ndb / 365 - 1);
		}
		return result;
	}
}

/** Calculates the XIRR for a series of transactions.
 *
 *  The sequence of transactions should be sorted in chronological order,
 *  and should contain at least two transactions.
 */
export const calculateXIRR = (transactions: number[], dates: Date[]) => {
	if (transactions.length < 2) {
		console.log("Not enough transactions to calculate XIRR.");
		return NaN;
	}
	if (transactions.length !== dates.length) {
		console.log("Number of dates and transactions must be the same.")
		return NaN;
	}
	return newtonsMethod(0.10, f(transactions, dates), fPrime(transactions, dates));
}
