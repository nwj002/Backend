//import request from super test
const request = require('supertest');

//importing server file
const app = require('../index');

//test token api
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjkyOTRhZWM2MmJhMTZjM2VkNmQ4ZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxOTExNjg2OH0.ra1prXRy1jGqxMfPSG30vFS9B-v5T1W7EUZLzCzobw8'

//describe (list of test cases)
describe('testing api', () => {
    //testing '/test' api
    it('GET /test | Response with text', async () => {

        //request sending
        const response = await request(app).get('/test');

        //if its successfull, status code
        expect(response.statusCode).toBe(200);

        //comparre received text
        expect(response.text).toEqual('Hello World, test api is working.');

    })

    // get all products
    it('GET /products | Fetch all products', async () => {
        const response = (await request(app).get('/api/product/get_all_products').set('authorization', `Bearer ${token}`));
        expect(response.statusCode).toBe(201);
        expect(response.body).toBeDefined();
        expect(response.body.message).toEqual('All products fetched successfully');
    })

    // register testing
    // 1. sending reqyest (with data)
    //2. except : 201
    //3. if already exist : handle accordingly
    //4. success

    it('POST /user/create | Register user', async () => {
        const response = await request(app).post('/api/user/create').send({
            "firstName": "test",
            "lastName": "test@gmail.com",
            "password": "test1234",
            "email": "ok@gmail.com",
        });
        //if condition
        if (!response.body.success) {
            expect(response.body.message).toEqual('User already exists!');
        } else {
            expect(response.body.message).toEqual(' User created successfully!');
        }

    });

    //login testing
    //1. login with "email": "test@gmail.com", 
    //2. password: "test1234",
    //3. except token (length)
    //except : userData
    //except : userName.firstName == 'test'
    //except : message
    //except: incorrect password

    it("POST /api/user/login | Response with body", async () => {
        const response = await request(app).post("/api/user/login").send({
            email: "test@gmail.com",
            password: "test1234",
        });
        if (!response.body.success) {
            // expect incorrect password)
            expect(response.body.message).toEqual("User does not exist.");
        } else if (!response.body.success) {
            // expect no u
            expect(response.body.message).toEqual("Invalid password");

        } else {
            expect(response.body.message).toEqual("user logined successfull");
            expect(response.body.userData.firstName).toEqual("test");
        }
    });


})