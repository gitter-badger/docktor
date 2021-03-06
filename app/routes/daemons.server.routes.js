'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
    daemons = require('../../app/controllers/daemons.server.controller');

module.exports = function (app) {
    // Daemon Routes
    app.route('/daemons')
        .get(daemons.list)
        .post(users.requiresLogin, daemons.create);

    app.route('/daemons/docker/info/:daemonId')
        .get(daemons.info);

    app.route('/daemons/docker/version/:daemonId')
        .get(daemons.version);

    app.route('/daemons/docker/listContainers/:daemonId')
        .get(daemons.listContainers);

    app.route('/daemons/:daemonId')
        .get(daemons.read)
        .put(users.requiresLogin, daemons.hasAuthorization, daemons.update)
        .delete(users.requiresLogin, daemons.hasAuthorization, daemons.delete);

    app.route('/daemons/docker/container/inspect/:daemonId/:containerDockerId')
        .get(daemons.inspectContainer);

    app.route('/daemons/docker/container/start/:daemonId/:containerDockerId')
        .get(daemons.startContainer);

    app.route('/daemons/docker/container/stop/:daemonId/:containerDockerId')
        .get(daemons.stopContainer);

    app.route('/daemons/docker/container/pause/:daemonId/:containerDockerId')
        .get(daemons.pauseContainer);

    app.route('/daemons/docker/container/unpause/:daemonId/:containerDockerId')
        .get(daemons.unpauseContainer);

    app.route('/daemons/docker/container/remove/:daemonId/:containerDockerId')
        .get(daemons.removeContainer);

    app.route('/daemons/docker/container/stats/:daemonId/:containerDockerId')
        .get(daemons.statsContainer);

    app.route('/daemons/docker/stats/:daemonId')
        .get(daemons.statsDeamon);

    app.route('/daemons/docker/machineInfo/:daemonId')
        .get(daemons.machineInfo);

    app.route('/daemons/docker/listImages/:daemonId')
        .get(daemons.listImages);

    app.route('/daemons/docker/image/remove/:daemonId/:imageDockerId')
        .get(daemons.removeImage);

    app.route('/daemons/docker/image/inspect/:daemonId/:imageDockerId')
        .get(daemons.inspectImage);

    app.route('/daemons/docker/image/pull/:daemonId')
        .post(daemons.pullImage);

    // Finish by binding with middleware
    app.param('daemonId', daemons.daemonByID);
    app.param('containerDockerId', daemons.containerDocker);
    app.param('imageDockerId', daemons.imageDocker);

};
