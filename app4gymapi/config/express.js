module.exports = {
  'corsOptions' : {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  },
  'nevVerificationURL': 'http://localhost:3001/api/auth/email-verification/${URL}',
  'newMailAccount': 'app4gymnastic.dev@gmail.com',
  'newMailPwd': 'B3inspir3d',
  'apiBasePath': '/api'
};
