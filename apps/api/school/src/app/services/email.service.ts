/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Email } from '@stack/models';
import * as nodemailer from 'nodemailer';
import * as util from 'util';
import { catchError } from 'rxjs';
import voca from 'voca';

@Injectable()
export class EmailService {
  async mockEmail(email: Email) {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    const mailOptions = {
      from: '"Fred Foo 👻" <foo@example.com>',
      to: email.to,
      subject: email.subject,
      text: voca.stripTags(email.html),
      html: email.html,
    };

    // const transporterPromisified = util.promisify(transporter);

    // transporterPromisified(mailOptions)
    //   .then(info => console.log('Email sent: ' + info.response))
    //   .catchError(error => console.log('Email ERROR: ' + error));

    // await new Promise((resolve, reject) => {
    //   transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //       console.log(error);
    //       reject();
    //     } else {
    //       console.log('Email sent: ' + info.response);
    //       resolve(info.response);
    //     }
    //   });
    // });

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}
