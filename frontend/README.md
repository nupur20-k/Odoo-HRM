# Dayflow — frontend

A React frontend for the Dayflow Flask HR backend: attendance, leave, payroll,
and employee management, with separate views for employees and HR.

## What's included

**Employee self-service**
- Sign in
- Dashboard with today's check-in/out status and a live shift-progress ring
- Attendance history
- Submit and track leave requests
- View payslips
- Profile

**HR workspace** (shown automatically when the logged-in user's role is `HR`)
- Overview with headcount, today's attendance, and pending leave counts
- Employee directory + individual employee detail
- Company-wide attendance
- Approve/reject leave requests, with an optional comment
- Company-wide payroll

Every screen talks to your existing Flask API — nothing is mocked. Endpoints
used are listed in `src/api/client.js`.

## Setup

```bash
npm install
npm run dev
```

The app runs on **http://localhost:3000** by default (matches the CORS
origins already allowed in your Flask `app.py`: `localhost:3000` and
`127.0.0.1:3000`). If you need a different port, either update the Flask
CORS config or edit `server.port` in `vite.config.js`.

## Pointing at your backend

The API base URL is read from `VITE_API_BASE_URL` in `.env`:

```
VITE_API_BASE_URL=http://localhost:5000
```

This assumes you run the Flask app with `flask run` / `python app.py` on its
default port 5000. Change this value if your backend runs elsewhere.

## Build for production

```bash
npm run build
```

Outputs static files to `dist/`, which you can serve with any static host —
just make sure `VITE_API_BASE_URL` points at your deployed backend, and that
the backend's CORS config allows the origin you deploy the frontend to
(currently it only allows `localhost:3000`).

## Notes

- Auth uses the JWT returned by `POST /api/auth/login`, stored in
  `localStorage` and sent as `Authorization: Bearer <token>` on every
  protected request.
- If a request comes back `401`, the session is cleared automatically and
  you'll be sent back to the login screen.
- Currency is formatted as INR (₹) to match the backend's `Numeric(12,2)`
  payroll fields — change the `inr()` helper in the payroll pages if you'd
  rather show another currency.
