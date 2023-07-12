const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connections');
const Role = require('./role');

class Employee extends Model { }

Employee.init(
    {
        employee_id: {
            type: DataYypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            Len: [3, 30],
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            Len: [3, 30],
            allowNull: false
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Role,
                key: 'role_id',
            },
        },
        manager_id: {
            type: DataYypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            references:{
                model: Employee,
                key:'employee_id'
            }
        },
        manager_first_name: {
            type: DataTypes.STRING,
            Len: [3, 30],
            allowNull: false
        },
        manager_last_name: {
            type: DataTypes.STRING,
            Len: [3, 30],
            allowNull: false
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'employee',
    }
)