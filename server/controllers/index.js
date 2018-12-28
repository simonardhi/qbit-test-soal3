'use strict';

const Panda = require('../models/panda').Panda;
const Snack = require('../models/snack').Snack;
const SnackPref = require('../models/snackpref').SnackPref;

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

module.exports = {
	list(req, res) {
		return SnackPref.findAll({
			include:[
				{
					model: Panda,
					as: 'Pandas',
					where: {
						age:{
							[Op.gt] : 27
						}
					}
				},
				{
					model: Snack,
					as: 'Snacks'
				}
			],
			attributes: [
				'$Pandas.name',
				[sequelize.fn('COUNT', sequelize.col('$Snacks.taste$')), 'taste'],
				[sequelize.fn('COUNT', sequelize.col('cook_type')), 'cook_type']
			],
			order: [
				[sequelize.fn('COUNT', sequelize.col('$Snacks.taste$')), 'DESC'],
				[sequelize.fn('COUNT', sequelize.col('cook_type')), 'DESC']
			],
			limit: 5
		})
		.then((snackPrefs) => {
			res.status(200).send(snackPrefs);
		})
		.catch((error) => {
			res.status(400).send(error);
		})
	},
	add(req, res) {
		return Panda.create(modelData, {
			include: {
				model: Snack,
				as: "snacks",
				include: {
					model: SnackPref,
					as: "cook_types"
				}
			}
		})
		.then((snackPrefs) => {
			res.status(200).send(snackPrefs);
		})
		.catch((error) => {
			res.status(400).send(error);
		});
	}
};