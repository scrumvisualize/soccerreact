/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
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
			type: DataTypes.INTEGER(10).UNSIGNED,
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
		
		}
	}, {
		tableName: 'user'
	});
};
