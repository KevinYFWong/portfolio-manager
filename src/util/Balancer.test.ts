import { balance } from "./Balancer";

const expectWithin = (v1: number, v2: number, tol: number) => {
	expect(Math.abs(v2-v1)).toBeLessThan(tol);
}

const maxDelta = 0.01;

test("empty input", () => {
	expect(() => balance([], [], 1, maxDelta)).toThrow();
});

test("negative cost", () => {
	expect(() => balance([123], [123], -123, maxDelta)).toThrow();
});

test("input size mismatch", () => {
	expect(() => balance([123, 123], [123], 123, maxDelta)).toThrow();
});

test("single element", () => {
	const result = balance([10], [1], 10, maxDelta);
	expect(result["feasible"]).toBe(true);
	expect(result["0"]).toBe(10);
});

test("perfect allocation possible", () => {
	const result = balance([30, 10, 12], [10, 10, 5], 460, 0);
	expect(result["feasible"]).toBe(true);
	expect(result["0"]).toBe(30);
	expect(result["1"]).toBe(10);
	expect(result["2"]).toBe(12);
});

test("tolerance", () => {
	const result = balance([30, 10, 12], [10, 10, 5], 460, maxDelta);
	const tol = 460 * maxDelta;
	expect(result["feasible"]).toBe(true);
	expectWithin(result["0"], 30, tol);
	expectWithin(result["1"], 10, tol);
	expectWithin(result["2"], 12, tol);
});
