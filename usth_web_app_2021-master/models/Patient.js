const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    class Patient extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate (models) {
            models.Patient.belongsTo(models.Occupation, { foreignKey: 'occupation_id' });
        }
    }

    Patient.init({
        id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        occupation_id: DataTypes.INTEGER.UNSIGNED,
        ssn: DataTypes.STRING,
        name: DataTypes.STRING,
        gender: DataTypes.STRING,
        dob: DataTypes.DATE,
        phone: DataTypes.STRING,
        address: DataTypes.STRING,
        email: DataTypes.STRING,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE
    }, {
        sequelize,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        modelName: 'Patient',
        tableName: 'patients'
    });
    return Patient;
};
