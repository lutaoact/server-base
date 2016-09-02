'use strict';

const APP = 'app';

module.exports = {
  mongo: {
    uri : `mongodb://host1:port1,host2:port2,host3:port3/${APP}?replicaSet=${APP}`,
  },
};
