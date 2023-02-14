const lib = require('../src/lib');
const db = require('../src/lib');
const mail = require('../src/mail');

describe('fizzbzz', ()=>{
    it('Should return fizzbuzz when parameter is divisible by 3 and 5', ()=>{
        const result = lib.fizzBuzz(15);

        expect(result).toBe('FizzBuzz');
    });

    it('Should return fizz when parameter is divisible by 3', ()=>{
        const result = lib.fizzBuzz(3);

        expect(result).toBe('Fizz');
    });

    it('Should return buzz when parameter is divisible by 5', ()=>{
        const result = lib.fizzBuzz(5);

        expect(result).toBe('Buzz');
    })
    it('Should return original number when parameter not divisible by 3 or 5', ()=>{
        const num = 7;
        const result = lib.fizzBuzz(num);

        expect(result).toBe(num);
    })
})

//Checking if a test throws and exception
test('Should throw and error', ()=>{
    expect(() => lib.throw(2)).toThrow();
})

//Using Mock functions
test('Should call another function', ()=>{
    //WITHOUT JEST FUNCTIONS
    // db.getUser = function(){
    //     console.log("I am the fake function");
    //     return {id: 2, name: 'Kelly'}
    // }

    // let sent = false;
    // mail.sendMail = function(){
    //    sent = true; 
    // }

    //USING JEST MOCK FUNCTIONS

    db.getUser = jest.fn().mockReturnValue({id: 2, name: 'Kelly'});
    /*
     * //to return a promise
     * jest.fn().MockResolvedValue(1);
     *
     * //to reject a value
     * jest.fn().MockRejectedValue(new Error('beans happened'));
     *
     */
    mail.sendMail = jest.fn();

    lib.notifyUser();

    //expect(sent).toBeTruthy();
    expect(mail.sendMail).toHaveBeenCalled();
    /*
     * expect(mail.sendMail).toHaveBeenCalledWith('name');
     *
     * //check the values a function has been called with
     * expect(mail.sendMail.mock.calls[0][0]).toBe('a');
     * expect(mail.sendMail.mock.calls[0][1]).toMatch(/jims/);
     *
     */
})