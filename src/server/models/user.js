/* jshint indent: 1 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        name: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false

        },
        phonenumber: {
            type: DataTypes.STRING(50),

        },
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        privilege: {
            type: DataTypes.STRING(100),

        },
        photo: {
            type: DataTypes.STRING(300),

        },
        position: {
            type: DataTypes.STRING(100),

		},
		createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: true,
        tableName: 'user'
    });

    user.associate = function (models) {
        // associations can be defined here
        user.hasOne(models.availability, {
            foreignKey: 'user_id',
            targetKey: 'id',
            onDelete: "CASCADE"
        });
    };

    return user;
};