/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		name: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(100),
		
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
			type: DataTypes.ENUM('PLAYER','ADMIN'),
		
		},
		photo: {
			type: DataTypes.STRING(30),
		
		},
		position: {
			type: DataTypes.ENUM('FORWARD','MID-FIELD','DEFENDER','GK'),
		
		}
	}, {
		tableName: 'user'
	});
};
