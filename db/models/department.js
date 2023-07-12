const {Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connections');

class Department extends Model {}

Department.init(
    {department_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
    },  
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'department',
}
);

module.exports = Department;