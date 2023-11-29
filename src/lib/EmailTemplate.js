const emailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #111;
            color: #fff;
            text-align: center;
            padding: 10px;
            border-radius: 8px 8px 0 0;
            position: relative; /* Added position relative to position the logo */
        }

        .logo {
            position: absolute;
            top: 10px;
            right: 10px;
            max-width: 200px;
        }

        .content {
            padding: 20px;
        }

        p {
            margin-bottom: 15px;
        }

        .footer {
            text-align: center;
            padding-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img class="logo" src="https://i.postimg.cc/WpY5Qt18/logo-White.png" alt="Logo">
            <h2>Hi Les Jailes, from {{name}}</h2>
        </div>
        <div class="content">
            <p><strong>Subject:</strong> {{subject}}</p>
            <p><strong>Email:</strong> {{email}}</p>
            <p><strong>Name:</strong> {{name}}</p>
            <p><strong>Telephone:</strong> {{telephone}}</p>
            <p><strong>Comments:</strong> {{comments}}</p>
        </div>
        <div class="footer">
            <p>Thank you for reading. I will be waiting for a response.</p>
        </div>
    </div>
</body>
</html>
`;
module.exports = emailTemplate