const axios = require('axios');
const { getToken } = require('../utils/auth');

async function log(level, pkg, message) {
  try {
    const token = await getToken();
    
    await axios.post(
      'http://20.244.56.144/evaluation-service/logs',
      {
        stack: 'backend',
        level: level,           // Use the actual level parameter
        package: pkg,           //  Use the actual package parameter  
        message: message        //  Use the actual message parameter
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  } catch (err) {
    console.error('Logging failed:', err.message);
  }
}

module.exports = async (req, res, next) => {
  try {
    await log('info', 'middleware', `${req.method} ${req.url}`);
  } catch (err) {
    console.error('Log error:', err.message);
  }
  next();
};
