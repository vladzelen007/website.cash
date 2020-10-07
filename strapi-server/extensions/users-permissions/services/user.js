'use strict';

module.exports = {
  updateUserRole: async data => {
      return await strapi.query('user', 'user-permissions');
  }
};