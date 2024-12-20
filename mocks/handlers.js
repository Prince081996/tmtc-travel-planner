import { rest } from 'msw'
const apiURL=""

export const handlers = [
  rest.get(`${apiURL}/scoops`, (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Chocolate', imagePath: '/images/chocolate.png' },
        { name: 'Vanilla', imagePath: '/images/vanilla.png' },
      ])
    )
  }),

  rest.get(`${apiURL}/toppings`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: 'Cherries',
          imagePath: '/images/cherries.png',
        },
        {
          name: 'M&Ms',
          imagePath: '/images/m-and-ms.png',
        },
        {
          name: 'Hot fudge',
          imagePath: '/images/hot-fudge.png',
        },
      ])
    )
  }),

  rest.post(`${apiURL}/order`, (req, res, ctx) => {
    const orderNumber = 1234567890

    return res(
      ctx.json({
        orderNumber,
      })
    )
  }),
]