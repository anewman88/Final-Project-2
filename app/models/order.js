module.exports = function(sequelize, DataTypes) {

    // Model for the Order Table
	var Order = sequelize.define("Order", {
	    customer_id: {type: DataTypes.INTEGER}, 
        firstname: { type: DataTypes.STRING, notEmpty: true},
		lastname: { type: DataTypes.STRING, notEmpty: true},
		address1: { type: DataTypes.STRING, notEmpty: true},
		address2: { type: DataTypes.STRING},
		city: { type: DataTypes.STRING, notEmpty: true},
		state: { type: DataTypes.STRING, notEmpty: true},
		zip: { type: DataTypes.STRING, notEmpty: true},
        email: { type: DataTypes.STRING},
        status: {type: DataTypes.ENUM('inprocess','onhold','shipped', 'delivered'), defaultValue:'inprocess' },
		comment: { type: DataTypes.STRING},
		order_total: {type: DataTypes.DECIMAL(10,2)},
        order_list: {type: DataTypes.JSON}
    });
	return Order;
};