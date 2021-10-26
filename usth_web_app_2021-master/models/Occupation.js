const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    class Occupation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate (models) {
        }
    }

    Occupation.init({
        id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true},
        name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Occupation',
        tableName: 'occupations'
    });
    return Occupation;
};
