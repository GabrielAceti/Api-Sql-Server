var config = {  
  server: 'localhost',  //update me
  authentication: {
      type: 'default',
      options: {
          userName: 'sa', //update me
          password: 'masterkey'  //update me
      }
  },
  options: {
      // If you are on Microsoft Azure, you need encryption:
      encrypt: true,
      database: 'DB'  //update me
  }
}; 

export default config;
