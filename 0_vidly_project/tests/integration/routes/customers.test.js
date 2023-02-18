const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const {Customer} = require('../../../models/customer');
let server;

describe('/api/customers', ()=>{
    beforeEach(()=> { server = require('../../../index'); });

    afterEach(async ()=> {
        server.close(); 
        //mongoose.connection.close();
        await Customer.remove({});
    });

    describe('GET/', ()=>{
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
    })

    describe('GET/:id', ()=>{
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

    describe('POST/', ()=>{
        it('Should return 401 if the authentication token is not provided', async ()=>{
            const res =  await request(server).post('/api/customers').send({name: 'Chit', phone: '12345678'})
            
            expect(res.status).toBe(401)
        })

        it('Should return 400 if the authentication is not valid', async ()=>{
            const token = 'eyJhbGciOiJIUzI1NiIsRnR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzN2U5MDZkMTQwNTM5ZWNmYjY5Y2EiLCJpc0FkbWlumYWxzZSwiaWF0IjoxNjc1ODU1NjcxfQ.MP2rDsM89VA5TKsQTSrUZz75ckfbV6TyKp42342g1wE';
            
            const res =  await request(server)
            .post('/api/customers')
            .send({name: 'Chi', phone: '12345678'})
            .set('x-auth-token', token)
            
            expect(res.status).toBe(400)
            expect(res.body).toMatchObject({})
        })

        it('Should 400 if customer is not valid customer type', async ()=>{
            // create new valid jwt token 
            const token = jwt.sign({_id: '63e38e9682dca7816f131ac3', isAdmin: false}, config.get('auth.secret'))

            const res =  await request(server)
            .post('/api/customers')
            .send({ phone: '12345678'})
            .set('x-auth-token', token)

            expect(res.status).toBe(400)
        })

        it('Should return new customer and status code of 200', async ()=>{
            // create new valid jwt token 
            const token = jwt.sign({_id: '63e38e9682dca7816f131ac3', isAdmin: false}, config.get('auth.secret'))

            const res =  await request(server)
            .post('/api/customers')
            .send({name: 'Chi', phone: '12345678'})
            .set('x-auth-token', token)

            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('name', 'Chi')
            expect(res.body).toHaveProperty('phone', '12345678')
        })
    })

    describe('PUT/:id', ()=>{
        it('Should return 400 if customer provided is not valid', async ()=>{
            const token = jwt.sign({_id: '63e38e9682dca7816f131ac3', isAdmin: false}, config.get('auth.secret'))

            const res =  await request(server)
            .put('/api/customers/63e38e9682dca7816f131ac3')
            .send({ none: 'none'})
            .set('x-auth-token', token)

            expect(res.status).toBe(400)
        })

        it('Should return 400 if customer doesn\'t exist', async ()=>{
            const token = jwt.sign({_id: '63e38e9682dca7816f131ac3', isAdmin: false}, config.get('auth.secret'))
            const customer = new Customer({
                name: 'Chi',
                phone: '12345678'
            })
            await customer.save();

            const res =  await request(server)
            .put('/api/customers/' + '66a38e9682d7816f131ab6')
            .send({ name: 'Jim', phone: '87654321'})
            .set('x-auth-token', token)

            expect(res.status).toBe(400)
            //expect(res.body).toHaveProperty('name', 'Jim')
        })

        it('Should updated customer and return 200 status code', async ()=>{
            const token = jwt.sign({_id: '63e38e9682dca7816f131ac3', isAdmin: false}, config.get('auth.secret'))
            const customer = new Customer({
                name: 'Chi',
                phone: '12345678'
            })
            await customer.save();

            const res =  await request(server)
            .put('/api/customers/' + customer._id)
            .send({ name: 'Jim', phone: '87654321'})
            .set('x-auth-token', token)

            expect(res.status).toBe(200)
            //expect(res.body).toHaveProperty('name', 'Jim')
        })
    })

    describe('DELETE/:id', ()=>{
        it('Should return 403 status code if the user is not an admin', async ()=>{
            const token = jwt.sign({_id: '63e38e9682dca7816f131ac3', isAdmin: false}, config.get('auth.secret'))
            
            const res =  await request(server)
            .delete('/api/customers/63e38e9682dca7816f131ac3')
            .set('x-auth-token', token)

            expect(res.status).toBe(403)
        })

        it('Should delete customer and return a status code of 200', async ()=>{
            const token = jwt.sign({_id: '63e38e9682dca7816f131ac3', isAdmin: true}, config.get('auth.secret'))
            const customer = new Customer({name: 'Jim', phone: '987654321'});
            await customer.save()
            
            const res =  await request(server)
            .delete('/api/customers/' + customer._id)
            .set('x-auth-token', token)

            expect(res.status).toBe(200)
        })
    })
})