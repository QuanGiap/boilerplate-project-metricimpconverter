'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  const convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const input = req.query.input;
    const num = convertHandler.getNum(input);
    const unit = convertHandler.getUnit(input);
    const returnUnit = convertHandler.getReturnUnit(unit);
    // console.log(num);
    // console.log(unit);
    if(((!num&&num!==0) || num===-1)&&(unit===''||returnUnit==='')) return res.send('invalid number and unit');
    if((!num&&num!==0) || num===-1) return res.send('invalid number');
    if(unit===''||returnUnit==='') return res.send('invalid unit');
    // console.log(returnUnit);
    const result = convertHandler.convert(num,unit);
    return res.json({ 
      initNum: num, 
      initUnit: unit, 
      returnNum: result, 
      returnUnit: returnUnit, 
      string: convertHandler.getString(num,unit,result,returnUnit),
    });
  });
};
