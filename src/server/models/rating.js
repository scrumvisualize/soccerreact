
'use strict';
module.exports =  (sequelize, DataTypes) => {
    const rating = sequelize.define('rating', {
        useremail: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        playeremail: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        totalrating:{
            type: DataTypes.DECIMAL(4,2),
            allowNull: false
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
        timestamps: true,
        tableName: 'rating'
    });
    return rating;
}