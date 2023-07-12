const { Models, DataTypes} = require('sequelize');
const Sequelize = require('../../config/connections');
const Department = require('./department');

class Role extends Model {}

Role.init(
 {
    role_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type: DataTypes.STRING,
        Len: [3,30],
        allowNull: false,
    },
    salary: {
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Department,
          key: 'department_id',
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'roles',
    }
)