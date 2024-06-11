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
Follow these instructions to set up the project on Vercel and on your local machine.

-  # Prerequisites
    -  Node.js and npm installed
    -  A Supabase account
    -  A Vercel account
      
   # 1. Setting up project on Google IDX
   -  Visit [Google IDX](https://idx.dev/) and click **Get Started**.
   -  Choose Next.JS Template and initialize it with app based router.
      
   # 2. Install all the dependencies
   ```
      npm install @supabase/supabase-js tailwindcss postcss autoprefixer
   ```
     
   # 3. Setup Tailwind CSS
     -  Generate **tailwind config.js** file
     ```
      npx tailwindcss init -p
     ```
     -  Update the **tailwind.config.js** with following content.
     ```
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
      ````
   -  Update **global.css**
     ```
      @tailwind base;
      @tailwind components;
      @tailwind utilities;
     ```
               
   # 4.  Setup Supabase
   -  Sign up at [Supabase](https://supabase.com/) and create a new project.
   -  Create a table named movies with the following columns: id (UUID), title (text), rating (numeric), year (integer).
   -  Create a table named comments with the following columns: id (UUID), content (text), movie_id (UUID), created_at (timestamp).  
    
   # 5.  Connecting Supabase with project
   -  Create a lib folder at root of project and inside lib supabaseClient.js file and add the following code:
   -  ```
      //lib/supabaseClient.js
      import { createClient } from '@supabase/supabase-js'
    
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      export const supabase = createClient(supabaseUrl, supabaseAnonKey)
     
      ```
      
   # 6.  Deploying the Project at Vercel
   -  Sign in to Vercel: Go to [Vercel](https://vercel.com/) and sign in with your GitHub account.
   -  Import Your Repository and configure your project settings.
   -  In the Vercel dashboard, go to the Settings tab of your project and add the following environment variables:
   ```
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     
   ```
  -  Click the Deploy button to deploy your application.
       
**The Project is now Deployed successfully and using the link the Vercel sent you , now you can access the project easily**
**My Project can be accessed using this [LINK](https://movie-list-7tr3.vercel.app/).**
       
  # Running the Project Locally
    -  Clone the GitHub Repository to location of your choice in your PC.
    -  Open the Git bash in that folder and enter the following command.
    ```
    git clone https://github.com/your-username/movie-list.git
    cd movie-list
    
    ```
    -  Install Dependencies
    ```
    npm install
    ```
    -  Start the Developement Server
    ```
    npm run dev
    ```
**The project is now can be access using [http://localhost:3000](http://localhost:3000)**

# Contributing
Contributions are welcome! Please open an issue or submit a pull request.

# License
This project is licensed under the MIT License.

