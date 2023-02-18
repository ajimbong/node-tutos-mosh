const request = require('supertest');
const mongoose = require('mongoose');
const {Customer} = require('../../../models/customer')
let server;

describe('/api/customers', ()=>{
    beforeEach(()=> { server = require('../../../index'); });

    afterEach(async ()=> {
        server.close(); 
        //mongoose.connection.close();
        await Customer.remove({});
    });

    describe('GET /', ()=>{
        it('Should return all customers', async()=>{
            await Customer.collection.insertMany([
                {
                    name: 'Chi',
                    phone: '09382756'
                },
                {
                    name: 'Ojong',
                    phone: '12345678'
                }
            ])
            const res = await request(server).get('/api/customers');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'Chi')).toBeTruthy()
        })

        it('Should return one customer with a given ID', async ()=>{
            const customer = new Customer({
                name: 'Chi',
                phone: '12345'
            })
            await customer.save();
            const res = await request(server).get('/api/customers/' + customer._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', customer.name);
        })

        it('Should return a 404 status code', async ()=>{
            const res = await request(server).get(`/api/customers/63e38e9682dca7816f131ac3`);
            expect(res.status).toBe(404);
        })
    })
})