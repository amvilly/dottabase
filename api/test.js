const notionHandler = require('./notion');

module.exports = async (req, res) => {
  const mockRes = {
    status: (code) => ({
      json: (data) => {
        console.log('API Response:', JSON.stringify(data, null, 2));
        res.status(code).json(data);
      }
    })
  };

  await notionHandler(req, mockRes);
};