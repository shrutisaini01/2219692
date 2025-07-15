const axios = require('axios');

let accessToken = ''; // Cache token

async function getToken() {
  if (accessToken) return accessToken;

  const res = await axios.post('http://20.244.56.144/evaluation-service/auth', {
    email: 'shrutisaini.22852008@gehu.ac.in',
    name: 'Shruti Saini',            
    rollNo: '2219692',                
    accessCode: 'QAhDUr',              
    clientID: '24f9eac8-0406-4062-9316-e90ecf7fe2e5',
    clientSecret: 'VkcArTnBqtTCqxRE'
  });

  accessToken = res.data.access_token;
  console.log('AUTH RESPONSE:', res.data); 
  return accessToken;
}

module.exports = { getToken };
