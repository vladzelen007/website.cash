module.exports = {
  create: async ctx => {
    // let addUser = await strapi.services.register.registerUser(
    //   ctx.request.body
    // );
    let sendEmail = await strapi.services.register.sendEmail(
      ctx.request.body
    );
    ctx.send({
      // user: addUser,
      email: sendEmail
    });
  }
};