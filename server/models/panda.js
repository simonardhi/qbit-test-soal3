'use strict';
module.exports = (sequelize, DataTypes) => {
  const Panda = sequelize.define('Panda', {
    id: {
      type: DataTypes.STRING(30),
      primaryKey: true,
      validate: {
        isAlphanumeric: true
      }
    },
    name: {
      type: DataTypes.STRING(50),
      len: [3, 50],
      unique: true,
      set(val) {
        val = val.replace(/\s{2,}/, ' ');
        this.setDataValue(val, val.toLowerCase().split(' ')
            .map(words => words[0].toUpperCase() + x.slice(1).join((' '))));
      },
      validate: {
        is: ["^[a-zA-Z0-9 ]+$", 'c'],
        isWordValid(val) {
          var valid = val.split(' ');
          valid.forEach(function (word) {
            if (word.length < 2) {
              throw new Error('Each name must be minimum 2 character')
            }
          })
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      min: 18,
      max: 100
    },
    male: {
      type: DataTypes.BOOLEAN,
      get(){
        return this.getDataValue('male') ? "Male" : "Female;"
      }
    }
  }, {});
  Panda.associate = function(models) {
    Panda.belongsToMany(models.Snack, {
      foreignKey: 'panda_id',
      through: 'SnackPref',
      as: 'snacks',
      unique: true
    })
  };
  return Panda;
};