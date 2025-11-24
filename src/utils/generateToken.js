import jsonwebtoken from 'jsonwebtoken';

const generateToken = (user) =>{
    return jsonwebtoken.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '3h',
        });
};

export default generateToken;