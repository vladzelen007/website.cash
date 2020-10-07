module.exports = {
  async find(ctx) {
    const user = ctx.state.user;
    
    if(user.subscribed === true) {
      return await strapi.services.links.find(ctx.query)
    } 
    
  },
}