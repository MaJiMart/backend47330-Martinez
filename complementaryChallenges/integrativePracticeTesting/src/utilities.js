import path from 'path';
import bcrypt from 'bcrypt';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from './config.js';
import { fileURLToPath } from 'url';

//Manejo de rutas
const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

//Manejo de errores
export class Exception extends Error {
  constructor(message, status) {
    super(message);
    this.statusCode = status;
  }
}

export class NotFound extends Exception {
  constructor(message) {
    super(message, 404);
  }
}

export class BadRequest extends Exception {
  constructor(message) {
    super(message, 404);
  }
}

export class Unauthorized extends Exception {
  constructor(message) {
    super(message, 401);
  }
}

export class Forbidden extends Exception {
  constructor(message) {
    super(message, 403);
  }
}

//JWT
export const JWT_SECRET = config.jwtSecret;
export const COOKIE_SECRET = config.cookieSecret;

export const tokenGenerator = (user) => {
  const { _id, first_name, last_name, email, role } = user;
  const payload = {
    id: _id,
    first_name,
    last_name,
    email,
    role,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '10m' });
};

export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (error, payload) => {
      if (error) {
        return reject(error);
      }
      resolve(payload);
    });
  });
};

export const authenticationMidd = (strategy) => (req, res, next) => {
  passport.authenticate(strategy, function (error, user, info) {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: info.message ? info.message : info.toString() });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export const authorizationMidd = (role) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  const { role: userRole } = req.user;
  if (!role.includes(userRole)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, user) =>
  bcrypt.compareSync(password, user.password);

//Generador de código para Ticket
export function generateUniqueCode() {
  let d = new Date().getTime();
  let id = 'xxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 4) % 4 | 0; //*16) % 16
    d = Math.floor(d / 4); //16
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(4); //(16)
  });
  return id;
}