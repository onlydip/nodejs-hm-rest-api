//! via sendgrid
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { GRID_API_KEY, GRID_MAIL } = process.env;

sgMail.setApiKey(GRID_API_KEY);

// const message = {
//   to: ["test@ukr.net", "test@i.ua", "test@gmail.com"],
//   from: "test@gmail.com",
//   subject: "HELLO",
//   html: "<h1>HELLO FROM UA</h1>",
//   text: "HELLO FROM UA",
// };

// sgMail
//   .send(message)
//   .then(response => console.info(response))
//   .catch(error => console.error(error.response.body));

const sendEmail = async data => {
  const email = { ...data, from: GRID_MAIL };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;

//! via nodemailer
// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const { UKR_PASSWORD, UKR_MAIL } = process.env;

// const nodemailerConfig = {
//   host: "smtp.ukr.net",
//   port: 465, //25, 465, 2525
//   secure: true,
//   auth: {
//     user: UKR_MAIL,
//     pass: UKR_PASSWORD,
//   },
// };

// const transport = nodemailer.createTransport(nodemailerConfig);

// // const email = {
// //   to: "lesim99011@avucon.com",
// //   from: "testonlydip@ukr.net",
// //   subject: "Test email",
// //   html: "<p><strong>Test email</strong> from localhost:3000</p>",
// // };

// // transport
// //   .sendMail(email)
// //   .then(() => console.log("Email send success!!!!"))
// //   .catch(error => console.log(error.message));

// const sendEmail = async data => {
//   const email = { ...data, from: META_MAIL };
//   await transport.sendMail(email);
//   return true;
// };

// module.exports = sendEmail;