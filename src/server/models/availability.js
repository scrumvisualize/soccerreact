'use strict';
module.exports =  (sequelize, DataTypes) => {
    const availability = sequelize.define('availability', {
        email: {
            type: DataTypes.STRING(100),
            allowNull: false

        },
        dailystatus: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER(18)
        },
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
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
        timestamps: false,
        tableName: 'availability'
    });
    availability.associate = function (models) {
        // associations can be defined here
        availability.belongsTo(models.user, {
            foreignKey: 'user_id',
            sourceKey: 'id',
            onDelete: "CASCADE"
        });
    };
    return availability;
}