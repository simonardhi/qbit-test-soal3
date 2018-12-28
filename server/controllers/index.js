'use strict';

const Panda = require('../models/panda').Panda;
const Snack = require('../models/snack').Snack;
const SnackPref = require('../models/snackpref').SnackPref;

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
		return null;
	}
};