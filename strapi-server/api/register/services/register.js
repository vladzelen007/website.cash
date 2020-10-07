'use strict';

module.exports = {
  // registerUser: async data => {
  //   let result = await strapi.plugins['users-permissions'].services.user.add({
  //     username: data.username,
  //     email: data.email,
  //     password: data.password
  //   });
  //   return result;
  // },
  sendEmail: async data => {
    let result = await strapi.plugins['email'].services.email.send({
      to: data.email,
      from: 'support@bruno.cash',
      replyTo: 'support@bruno.cash',
      subject: 'Bruno.cash. Your account info for bruno.cash!',
      text: 'Hello world!',
      html: `
        Hi, ${data.username}
        </br> 
        
        <p>You have been successfully registrated at Bruno.cash.</p>

        Your login and password are here
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Password:</b> ${data.password}</p>
      `,
    });
    return result;
  }
};