"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPTemplate = void 0;
const OTPTemplate = (otp) => `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Token OTP</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            border-radius: 5px;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: auto;
        }
        h1 {
            color: #333;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
            margin: 20px 0;
            text-align: center;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #666;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Tu Código de Verificación</h1>
        <p>Hola,</p>
        <p>Has solicitado un código de verificación para acceder a tu cuenta. Tu código OTP es:</p>
        <div class="otp">${otp}</div> <!-- Reemplaza 123456 por el token OTP generado -->
        <p>Por favor, no compartas este código con nadie. Este código es válido solo por un corto periodo de tiempo.</p>
        <p>Si no solicitaste este código, por favor ignora este mensaje.</p>
        <div class="footer">
            <p>&copy; 2024 Industrias CTS. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>

`;
exports.OTPTemplate = OTPTemplate;
//# sourceMappingURL=otp.template.js.map