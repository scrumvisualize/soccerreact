
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('news', {
        newstitle: {
			type: DataTypes.STRING(100),
			allowNull: false
        },
        newsdetails:{
            type: DataTypes.STRING(2000),
			allowNull: false
        },
        email: {
			type: DataTypes.STRING(100),
			allowNull: false
		
		},
        id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
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
    
    },{
        timestamps: false,
        tableName: 'news'
    });
}