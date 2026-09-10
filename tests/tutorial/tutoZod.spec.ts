import { test, expect } from '@playwright/test'
import * as z from "zod";

test('API GET', async ({ request }) => {

  const response = await fetch('https://reqres.in/api/users?page=2', {
    method: 'GET',
    headers: {
      'x-api-key': 'pro_12dbd491bfafc28b17811fbd7aa5d67933240198818273e9ad21e047646b723b',
      'X-Reqres-Env': 'prod'
    }
  });
  const body = await response.json();
  //console.log(body);

  const productSchema = z.object({
    page: z.number(),
    per_page: z.number(),
    total: z.number(),
    total_pages: z.number(),
    data: z.array(z.object({
      id: z.number(),
      email: z.email(),
      first_name: z.string(),
      last_name: z.string(),
      avatar: z.url()
    }))
  })

  expect(() => {
    productSchema.parse(body);
  }).not.toThrow();

})
