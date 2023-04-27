import express from 'express'
import * as jwt from 'jsonwebtoken';

const secretKey = "JWT"

const payload = {
    userId: 12345,
    name: 'Juan Pérez',
    email: 'juan.perez@example.com'
};

const app = express()

app.use(express.json())

const PORT = 3000

app.get('/token', (_req, res) => {
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })
    res.json({ token: token })
})

app.post('/protegido', (_req, res) => {
    var [bearer, token] = ""
    const authHeader = _req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "No se ha proporcionado el token de acceso." })
    } else {
        [bearer, token] = authHeader.split(' ')

        if (bearer !== 'Bearer' || !token) {
            return res.status(401).json({ message: "Token de autenticación no válido" });
        } else {
            try {
                const decoded = jwt.verify(token, secretKey);
                return res.json({
                    message: "Token válido, puedes acceder",
                    data: decoded
                })
            }
            catch (err) {
                return res.status(401).json({ message: "Token no válido" })
            }
        }
    }
})

app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})