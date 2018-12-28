'use strict';
const chai = require('chai');
let should = chai.should();
let expect = chai.expect
let db = require('../server/models');
const Panda = require('../server/models/panda');
const Snack = require('../server/models/snack');
const SnackPref = require('../server/models/snackpref');

describe('Test Model', function(done){
	var modelData = {
		id: "pandaID",
		panda: "pandaName",
		snacks: [
			{
				id: "snackID",
				name: "snackName",
				taste: ["manis", "tawar", "asin", "pedas"],
				cook_types: [
					{cook_type: "rebus"},
					{cook_type: "goreng"},
					{cook_type: "tim"},
					{cook_type: "raw"}
				]
			}
		]
	};
	Panda.create(modelData, {
		include: {
			model: Snack,
			as: "snacks",
			include: {
				model: SnackPref,
				as: "cook_types"
			}
		}
	})
});