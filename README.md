This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# # Movie List
A simple web application for managing a list of movies. Users can add, update, delete movies, and add comments to each movie.

# Features
-  Add, edit, and delete movies
-  Add, edit, and delete comments for each movie
-  Responsive design with dark mode support
-  Backend powered by Supabase
  
# Technologies Used
-  Next.js
-  Supabase
-  Tailwind CSS
-  Google IDX
-  Vercel
-  Git/Github
  
# Getting Started
Follow these instructions to set up the project on your local machine.

-  # Prerequisites
    -  Node.js and npm installed
    -  A Supabase account
    -  A Vercel account
      
1. # Setting up project on Google IDX
   -  Visit [Google IDX](https://idx.dev/) and click **Get Started**.
   -  Choose Next.JS Template and initialize it with app based router.
     
2. # Install all the dependencies
   -  npm install @supabase/supabase-js tailwindcss postcss autoprefixer
     
3. # Setup Tailwind CSS
   -  Generate tailwind config.js file
      npx tailwindcss init -p
   -  Update the tailwind.config.js with following content.
      /** @type {import('tailwindcss').Config} */
      module.exports = {
        content: [
          './pages/**/*.{js,ts,jsx,tsx}',
          './components/**/*.{js,ts,jsx,tsx}',
          './app/**/*.{js,ts,jsx,tsx}',
        ],
        theme: {
          extend: {},
        },
        plugins: [],
      }

   -       
4.  

5. 
