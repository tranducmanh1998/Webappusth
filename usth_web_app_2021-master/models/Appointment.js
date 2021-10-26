const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    class Appointment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate (models) {
            models.Appointment.belongsTo(models.Patient, { foreignKey: 'occupation_id' });
        }
    }

    Appointment.init({
        id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        patient_id: DataTypes.INTEGER.UNSIGNED,
        start_time: DataTypes.DATE,
        end_time: DataTypes.DATE,
        med_history: DataTypes.STRING,
        reason: DataTypes.STRING,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE
    }, {
        sequelize,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        modelName: 'Appointment',
        tableName: 'appointments'
    });
    return Appointment;
};
