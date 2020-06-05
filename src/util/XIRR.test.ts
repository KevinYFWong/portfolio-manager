import { calculateXIRR, daysBetween } from "./XIRR";
import moment from "moment";

const fmt = "YYYY-MM-DD";

test("insufficient number of transactions", () => {
	expect(calculateXIRR([], [])).toBe(NaN);
});

test("insufficient number of transactions (size 1", () => {
	expect(calculateXIRR([10], [new Date()])).toBe(NaN);
});

test("input size mismatch", () => {
	expect(calculateXIRR(
		[10, 20, 31],
		[new Date(), new Date(), new Date(), new Date()]
	)).toBe(NaN);
});

test("zero interest", () => {
	expect(calculateXIRR(
		[123, 21, -144],
		[
			"2001-01-01",
			"2001-01-03",
			"2005-01-01"
		].map(d => moment(d, fmt).toDate())
	)).toBeCloseTo(0);
});

test("negative interest", () => {
	expect(calculateXIRR(
		[100, -90],
		[
			"2001-01-01",
			"2002-01-01"
		].map(d => moment(d, fmt).toDate())
	)).toBeCloseTo(-0.1);
});

test("high interest", () => {
	expect(calculateXIRR(
		[100, -210],
		[
			"2001-01-01",
			"2002-01-01"
		].map(d => moment(d, fmt).toDate())
	)).toBeCloseTo(1.1);
});

test("2 contributions", () => {
	expect(calculateXIRR(
		[100, 100, -600],
		[
			"2001-01-01",
			"2001-01-01",
			"2002-01-01"
		].map(d => moment(d, fmt).toDate())
	)).toBeCloseTo(2);
});
