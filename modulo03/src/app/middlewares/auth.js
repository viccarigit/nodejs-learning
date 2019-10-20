import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Invalid Token.' });
  }

  const [, token] = authHeader.split(' '); // to unconstruc the token from 'Baerer token' to ['Baerer', 'token' ]

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret); // the promisify method execute jwt verify and gets a callback function (from jwt) with parameters (token, authConfig.secret)

    req.userId = decoded.id;
  } catch (error) {
    return res.status(401).json({ error: 'Invalid Token.' });
  }

  return next();
};
