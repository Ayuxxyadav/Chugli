 
 Chugli is a high-performance monorepo built with Turbo Repo. This project manages multiple applications and shared packages seamlessly using a modern tech stack.

🛠 Prerequisites
Before you begin, ensure you have the following installed:

Node.js (Latest LTS)

pnpm (Recommended package manager)

🚀 Setup & Installation
Follow these steps to get the project running locally:

1. Clone the Repository
Bash

git clone https://github.com/your-username/chugli.git
cd chugli
2. Configure the Database (Prisma)
Navigate to the database package to set up your environment variables and schema.

Go to the DB package:

Bash

cd packages/db
Set up Environment Variables: Create a .env file in this directory and add your database connection string. You can use a local PostgreSQL instance or a cloud provider like Neon DB.

Code snippet

DATABASE_URL="postgresql://username:password@localhost:5432/chugli"
Generate Prisma Client: Run the following command to generate the Prisma client based on your schema:

Bash

npx prisma generate
Return to Root:

Bash

cd ../..
3. Install Dependencies
Install all required packages globally for the monorepo using pnpm:

Bash

pnpm install
4. Run Development Server
Start all applications (frontend, backend, etc.) in development mode with a single command:

Bash

pnpm run dev
📁 Project Structure
apps/ - Contains the main applications (e.g., Web, Admin).

packages/ - Shared configurations, UI components, and the Prisma database layer.

turbo.json - Build pipeline configuration for Turbo.

⚙️ Tech Stack
Monorepo: Turborepo

Package Manager: pnpm

ORM: Prisma

Database: PostgreSQL (Local/Neon)