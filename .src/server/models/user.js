/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		firstname: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		lastname: {
			type: DataTypes.STRING(30),
			allowNull: true
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		phonenumber: {
			type: DataTypes.STRING(50),
			allowNull: true
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
			allowNull: false
		},
		photo: {
			type: "BLOB",
			allowNull: true
		},
		position: {
			type: DataTypes.ENUM('FORWARD','MID-FIELD','DEFENDER','GK'),
			allowNull: true
		},
		createdon: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'user'
	});
};
