const solver = require("javascript-lp-solver/src/solver");

const maxDelta = 0.01;

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

export const calculate = (ideals: number[], costs: number[], limit: number) => {
	if (limit < 0) throw Error("Maximum total cost must not be negative");
	if (ideals.length != costs.length) throw Error("Lists must be equal in size");
	if (ideals.length == 0) throw Error("Lists must have at least one element");

	let model: IModel = {
		optimize: "spend",
		opType: "max",
		constraints: {
			"spend": { "max": limit }
		},
		variables: {},
		ints: {}
	};

	const tolerance = limit * maxDelta;
	ideals.forEach((units, i) => {
		const cost = costs[i];
		const label = `qty${i}`;
		const minQty = Math.max(Math.ceil(units * cost - tolerance), 0);
		model.constraints[label] = { "min": minQty };
		model.variables[label] = { "spend": cost };
		model.ints[label] = 1;
	});

	const result = solver.Solve(model);
	console.log(result);
}
