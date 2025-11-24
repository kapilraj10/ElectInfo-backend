import jwt from 'jsonwebtoken';

/**
 *
 * @param {String} userId 
 * @param {Object} extraData 
 * @returns {String} 
 */
export const generateToken = (userId, extraData = {}) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing in environment variables");
  }

  return jwt.sign(
    {
      id: userId,
      ...extraData, 
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '6h', 
      algorithm: 'HS256',
    }
  );
};

export default generateToken;
