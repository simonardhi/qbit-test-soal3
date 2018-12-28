'use strict';
module.exports = (sequelize, DataTypes) => {
  const SnackPref = sequelize.define('SnackPref', {
    panda_id: {
      type: DataTypes.STRING(30)
    },
    snack_id: {
      type: DataTypes.STRING(30)
    },
    cook_type: {
      type: DataTypes.STRING(10),
      validate: {
        isIn: [['rebus', 'goreng', 'raw', 'tim']]
      }
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['panda_id', 'snack_id']
      }
    ]
  });
  SnackPref.associate = function(models) {};
  return SnackPref;
};