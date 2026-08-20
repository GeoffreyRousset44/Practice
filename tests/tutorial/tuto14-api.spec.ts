import {test, expect} from '@playwright/test'

test('API GET', async({request}) =>{

    const response = await fetch('https://reqres.in/api/collections/products/records/2d726af1-32ea-4deb-a3e9-7ec7adfbe31f?project_id=47116', {
        method: 'GET',
        headers: {
          'x-api-key': 'pro_12dbd491bfafc28b17811fbd7aa5d67933240198818273e9ad21e047646b723b',
          'X-Reqres-Env': 'prod'
        }
      });
       // const text = await response.formData
        expect (response.status).toBe(200)
       // expect (text).toContain('Clavier')

        //console.log (await (response.json))



})

test('API POST', async ({request}) => {

    const response = await fetch('https://reqres.in/api/collections/products/records?project_id=47116', {
        method: 'POST',
        headers: {
          'x-api-key': 'pro_12dbd491bfafc28b17811fbd7aa5d67933240198818273e9ad21e047646b723b',
          'X-Reqres-Env': 'prod',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "data": {
            "name": "Souris",
            "price": 10,
            "category": "Electronics",
            "in_stock": true
          }
        })
      });
      const data = await response.json();
      expect (response.status).toBe(201);
     // expect (response.text).toContain('Souris');
     console.log (await (response.json))
}) 