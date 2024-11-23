const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();
function roundUp(number,decimal){
  return Math.round(number*Math.pow(10,decimal))/Math.pow(10,decimal);
}
const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;
suite('Unit Tests', function(){
      // #1
      test('Check read a whold number input', function () {
        assert.equal(10, convertHandler.getNum('10kg'),"convertHandler.getNum('10L') should be 10");
      });
      // #2
      test('Check read a decimal number input', function () {
        assert.equal(2.4, convertHandler.getNum('2.4lbs'),"convertHandler.getNum('2.4L') should be 2");
      });
      // #3
      test('Check read a fractional number input', function () {
        assert.equal(0.5, convertHandler.getNum('1/2km'),"convertHandler.getNum('1/2L') should be 0.5");
      });
      // #4
      test('Check read a fractional input with a decimal', function () {
        assert.equal(2, convertHandler.getNum('1/0.5L'),"convertHandler.getNum('1/0.5L') should be 2");
      });
      // #5
      test('Return an error on a double-fraction ', function () {
        assert.equal(-1, convertHandler.getNum('1/2/3L'),"convertHandler.getNum('1/2/3L') should be -1");
      });
      // #6
      test('Default to a numerical input of 1 when no numerical input is provided.', function () {
        assert.equal(1, convertHandler.getNum('gal'),"convertHandler.getNum('gal') should be 1");
      });
      // #7
      test('Correctly read each valid input unit.', function () {
        assert.equal('gal', convertHandler.getUnit('9gal'),"convertHandler.getUnit('9gal') should be gal");
        assert.equal('lbs', convertHandler.getUnit('9lbs'),"convertHandler.getUnit('9lbs') should be lbs");
        assert.equal('mi', convertHandler.getUnit('9mi'),"convertHandler.getUnit('9mi') should be mi");
        assert.equal('L', convertHandler.getUnit('9L'),"convertHandler.getUnit('9L') should be L");
        assert.equal('km', convertHandler.getUnit('9km'),"convertHandler.getUnit('9km') should be km");
        assert.equal('kg', convertHandler.getUnit('9kg'),"convertHandler.getUnit('9kg') should be kg");
      });
      // #8
      test('return an error for an invalid input unit', function () {
        assert.equal('', convertHandler.getUnit('9errorUnit'),"convertHandler.getUnit('9errorUnit') should be ''");
      });
      // #9
      test('return the correct return unit for each valid input unit', function () {
        assert.equal('km', convertHandler.getReturnUnit('mi'),"convertHandler.getReturnUnit('mi') should be 'km'");
        assert.equal('gal', convertHandler.getReturnUnit('L'),"convertHandler.getReturnUnit('L') should be 'gal'");
        assert.equal('lbs', convertHandler.getReturnUnit('kg'),"convertHandler.getReturnUnit('kg') should be 'lbs'");
        assert.equal('mi', convertHandler.getReturnUnit('km'),"convertHandler.getReturnUnit('km') should be 'mi'");
        assert.equal('L', convertHandler.getReturnUnit('gal'),"convertHandler.getReturnUnit('gal') should be 'L'");
        assert.equal('kg', convertHandler.getReturnUnit('lbs'),"convertHandler.getReturnUnit('lbs') should be 'kg'");
      });
      // #10
      test('Correctly return the spelled-out string unit for each valid input', function () {
        assert.equal('gallons', convertHandler.spellOutUnit('gal'),"convertHandler.spellOutUnit('l') should be 'liters'");
        assert.equal('liters', convertHandler.spellOutUnit('L'),"convertHandler.spellOutUnit('l') should be 'liters'");
        assert.equal('miles', convertHandler.spellOutUnit('mi'),"convertHandler.spellOutUnit('l') should be 'liters'");
        assert.equal('kilometers', convertHandler.spellOutUnit('km'),"convertHandler.spellOutUnit('l') should be 'liters'");
        assert.equal('pounds', convertHandler.spellOutUnit('lbs'),"convertHandler.spellOutUnit('l') should be 'liters'");
        assert.equal('kilograms', convertHandler.spellOutUnit('kg'),"convertHandler.spellOutUnit('l') should be 'liters'");
      });
      // #11
      test('Correctly convert gal to L', function () {
        const galtoLResult = roundUp(galToL,5);
        assert.equal(galtoLResult, convertHandler.convert(1,'gal'),"convertHandler.convert(1,'gal') must equal "+galtoLResult);
      });
      // #12
      test('Correctly convert L to gal', function () {        
        const LtoGalResult = roundUp(1/galToL,5);
        assert.equal(LtoGalResult, convertHandler.convert(1,'L'),"convertHandler.convert(1,'L') must equal "+LtoGalResult);

      });
      // #13
      test('Correctly convert mi to km', function () {     
        const mitoKmResult = roundUp(miToKm,5);
        assert.equal(mitoKmResult, convertHandler.convert(1,'mi'),"convertHandler.convert(1,'mi') must equal "+mitoKmResult);
      });
      // #14
      test('Correctly convert km to mi', function () {      
        const kmToMiResult = roundUp(1/miToKm,5);
        assert.equal(kmToMiResult, convertHandler.convert(1,'km'),"convertHandler.convert(1,'km') must equal "+kmToMiResult);
      });
      // #15
      test('Correctly convert lbs to kg', function () {        
        const lbsToKgResult = roundUp(lbsToKg,5);
        assert.equal(lbsToKgResult, convertHandler.convert(1,'lbs'),"convertHandler.convert(1,'lbs') must equal "+lbsToKgResult);
      });
      // #16
      test('Correctly convert kg to lbs', function () {        
        const kgtoLbsResult = roundUp(1/lbsToKg,5);
        assert.equal(kgtoLbsResult, convertHandler.convert(1,'kg'),"convertHandler.convert(1,'kg') must equal "+kgtoLbsResult);
      });
});