### tRPC + Prisma Boilerplate

Project contains a minimal setup for a server using tRPC and Prisma

### Steps

1. Run npm install (or yarn)
2. Create your .env file in root directory, it should contain at least one line
   with your database url ([What is a base url?](https://www.prisma.io/docs/reference/database-reference/connection-urls)) here you have an example:
   <br>
   `DATABASE_URL="mysql://root:mypassword@localhost:3306/mydatabase"`
   <br>
   The example is for mysql, however you can use any db supported by Prisma (Postgres, MySQL, SQLite, MongoDB, MS. SQLServer)
3. Create your database, for instance using Docker, and supposing that you are using the database mentioned above you can run: 
    <br>
   `docker run -p -3306:3306 --name mysql1 -e MYSQL_ROOT_PASSWORD=mypassword -d mysql:latest`
   <br>
   <br>
   (Optional): I added a docker-compose file that you can use with `docker compose up` command, this is going to run a container with a service (MySQL db) just be sure that MYSQLPASSWORD is in your .env (just like in the second step)
   <br>
4. Run ``npm run dev`` this command as you can check in package.json, runs 3 commands [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate), [Prisma Generate](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client) and starts the tRPC Server, you can check the details in source directory. 
Prisma generate also has a custom generator named zod, basically helps us to generate zod schemas from Prisma Models, enums, inputTypes, for more info [zod-prisma-types](https://github.com/chrishoermann/zod-prisma-types).

5. If everything has been set correctly, you can visit localhost:3000/user.userList which is going to return a json with an empty list of users, you can check the implementation of this procedure in routers/users.ts


Still need some changes but it is usable so far.

