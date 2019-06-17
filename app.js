const lt = require("localtunnel");
const nodemailer = require('nodemailer');


let tunnel = lt("8888", function (err, tunnel) {
    if (err) {
        console.log(err);
    }
    console.log("___________________________");
    console.log(tunnel);
    console.log("___________________________");
    sendMyMail();
});

tunnel.on('close', function () {
    console.log("AAAAAH TUNNEL CLOSED!");
    sendMyMail();
});

function sendMyMail() {
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "arlie.ruecker39@ethereal.email", // generated ethereal user
            pass: "DQMUrSWfE7FgusUpNk"  // generated ethereal password
        }
    });

    let mailOptions = {
        from: 'arlie.ruecker39@ethereal.email',
        to: 'test@example.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy: ' + tunnel.url + ' .'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}