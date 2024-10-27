This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Make Sure all the dependecies have been installed 
npm i

First Add The Following keys in env 
"Don't Use these keys anywhere these are just for this project"

NEXT_PUBLIC_FOURSQUARE_API_KEY = "fsq3WMcGQl+hP30inkihPJH34er7ZaYXPxB05RnK90phxSs="
NEXT_PUBLIC_OPENWEATHER_API_KEY = "1448db4bc170e13fe0f7cb3f3293da9a"
NEXTAUTH_SECRET = 38078e58fa4878f4def1a2de3c0c38840dd8475caeb02a9e364a060500497d85
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIzaSyCweIJswTkjvZRuhh6YLLoCNEZ-Rc2PDMA"

IF You Are Facing The Error in NEXTAUTH_SECRET 
Run this command to get secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

For Login Use the given credentials 
email:amit.sharma1@sveltetech.com
password:87654321

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
```

