# Portfolio Website

A full-stack portfolio starter with a Java Spring Boot backend and a polished React frontend.

## Structure

```text
backend/   Spring Boot REST API
frontend/  React + TypeScript portfolio UI
```

## Run Locally

Start MySQL:

```bash
docker compose up -d
```

Backend:

```bash
cd backend
mvn spring-boot:run
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

The frontend expects the backend at `http://localhost:8081`.

## Admin

Development login:

```text
email: admin@portfolio.local
password: admin123
```

Open:

```text
http://localhost:5173/admin
```

Change the seeded admin password before deployment.

## Configuration

Copy `.env.example` into your deployment environment variables. For production:

- Use a managed MySQL database.
- Set a long random `JWT_SECRET`.
- Replace the seeded admin password.
- Use Cloudinary or S3 for project images if you do not want local file storage.
