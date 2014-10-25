'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	daemons = require('../../app/controllers/daemons');

module.exports = function(app) {
	// Daemon Routes
	app.route('/daemons')
		.get(daemons.list)
		.post(users.requiresLogin, daemons.create);

	app.route('/daemons/:daemonId')
		.get(daemons.read)
		.put(users.requiresLogin, daemons.hasAuthorization, daemons.update)
		.delete(users.requiresLogin, daemons.hasAuthorization, daemons.delete);

	// Finish by binding the daemon middleware
	app.param('daemonId', daemons.daemonByID);
};