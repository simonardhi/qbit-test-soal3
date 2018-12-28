'use strict';
module.exports = (sequelize, DataTypes) => {
  const Snack = sequelize.define('Snack', {
    id: {
      type: DataTypes.STRING(30),
      primaryKey: true,
      validate:{
        is: ["^[a-zA-Z0-9 ]+$", 'c']
      }
    },
    taste: {
      type: DataTypes.STRING(6),
      validate: {
        isIn: [['manis', 'asin', 'tawar', 'pedas']]
      }
    },
    name: {
      type: DataTypes.STRING(30),
      len: [3, 30],
      unique: true,
      validate: {
        is: ["^[a-z ]+$", 'c'],
        len: [3,30]
      },
      set(val){
        this.setDataValue(val.replace(/\s{2,}/,  ' '))
      }
    }
  }, {});
  Snack.associate = function(models) {
    Snack.belongsToMany(models.Panda, {
      foreignKey: 'snack_id',
      through: 'SnackPref',
      as: 'pandas',
      unique: true
    });
  };
  return Snack;
};