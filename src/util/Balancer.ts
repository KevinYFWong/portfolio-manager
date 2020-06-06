const solver = require("javascript-lp-solver/src/solver");

type Op = "max" | "min";
type Constraint = {
	[key: string]: number
};

interface IModel {
	optimize: string,
	opType: Op,
	constraints: {[_: string]: Constraint},
	variables: {[_:string]: {[_:string]: number}},
	ints: {[_:string]: number}
};

export const balance = (ideals: number[], costs: number[], limit: number, maxDelta: number) => {
	if (limit < 0) throw Error("Maximum total cost must not be negative");
	if (ideals.length != costs.length) throw Error("Lists must be equal in size");
	if (ideals.length == 0) throw Error("Lists must have at least one element");

	let model: IModel = {
		optimize: "spend",
		opType: "max",
		constraints: {
			"cost": { "max": limit }
		},
		variables: {},
		ints: {}
	};

	const tolerance = limit * maxDelta;
	ideals.forEach((units, i) => {
		const cost = costs[i];
		const attr = `qty${i}`;
		const label = `${i}`;
		const minQty = Math.max(Math.floor((units * cost - tolerance) / cost), 0);
		model.constraints[attr] = { "min": minQty };
		model.variables[label] = { "spend": cost, [attr]: 1, "cost": cost };
		model.ints[label] = 1;
	});
	const result = solver.Solve(model);
	return result;
}
