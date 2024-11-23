const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
function roundUp(number,decimal){
    return Math.round(number*Math.pow(10,decimal))/Math.pow(10,decimal);
  }
chai.use(chaiHttp);
suite('Functional Tests', function() {
    this.timeout(5000)
    suite('Integration tests with chai-http',()=>{
        // #1
        test('Test valid input',(done)=>{
            chai.request(server).keepOpen().get('/api/convert?input=10L').end((err,res)=>{
                const expectResult = {"initNum":10,"initUnit":"L","returnNum":roundUp(10/3.78541,5),"returnUnit":"gal","string":"10 liters converts to "+roundUp(10/3.78541,5)+" gallons"};
                assert.equal(200,res.status);
                assert.deepEqual(expectResult,res.body);
                done();
            })
        })
        // #2
        test('Test invalid unit',(done)=>{
            chai.request(server).keepOpen().get('/api/convert?input=32g').end((err,res)=>{
                assert.equal('invalid unit',res.text);
                done();
            })
        })
        // #3
        test('Test invalid number',(done)=>{
            chai.request(server).keepOpen().get('/api/convert?input=3/7.2/4kg').end((err,res)=>{
                assert.equal('invalid number',res.text);
                done();
            })
        })
        // #4
        test('Test invalid unit and number',(done)=>{
            chai.request(server).keepOpen().get('/api/convert?input=3/7.2/4kilomegagram').end((err,res)=>{
                assert.equal('invalid number and unit',res.text);
                done();
            })
        })
        // #5
        test('Test covert without puting number',(done)=>{
            chai.request(server).keepOpen().get('/api/convert?input=kg').end((err,res)=>{
                const expectResult = {"initNum":1,"initUnit":"kg","returnNum":roundUp(1/0.453592,5),"returnUnit":"lbs","string":"1 kilograms converts to "+roundUp(1/0.453592,5)+" pounds"};
                assert.deepEqual(expectResult,res.body);
                done();
            })
        })
    })
});
