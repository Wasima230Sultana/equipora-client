
# Equipora

A modern equipment rental marketplace built for the UAE construction industry. Equipora connects customers who need construction equipment with equipment owners who want to rent out and manage their machines.

Customers can browse equipment, make rental bookings, and complete payments. Equipment owners can list their machines, manage rental requests, and monitor their fleet. Administrators can manage users, equipment listings, and bookings.

> **Frontend Repository:** Next.js  
> **Backend Repository:** Separate Express.js API (`equipora-server`)

---

## Live Demo

- **Live Website:** [https://equipora-client-theta.vercel.app/](https://equipora-client-theta.vercel.app/)
- **Frontend Repository:** [https://github.com/Wasima230Sultana/equipora-client](https://github.com/Wasima230Sultana/equipora-client)
- **Backend Repository:** [https://github.com/Wasima230Sultana/equipora-server](https://github.com/Wasima230Sultana/equipora-server)

---

## Key Features

### Customer
- Browse construction equipment.
- Search and filter equipment listings.
- View equipment details and rental pricing.
- Book equipment for a selected rental period.
- Complete payments using Stripe Embedded Checkout.
- Manage personal rental bookings.
- Add equipment to favorites.
- Manage user profile information.

### Equipment Owner
- Create and manage equipment listings.
- Upload equipment images.
- Update equipment details and rental prices.
- Manage equipment availability.
- View rental requests from customers.
- Monitor rental status and payment information.
- Manage owned equipment and rental activities.

### Administrator
- View and manage registered users.
- Change user roles.
- Delete user accounts.
- View all equipment listings.
- Update equipment information and status.
- Delete equipment listings.
- View all rental bookings.
- Update booking and payment statuses.
- Monitor marketplace activities.

---

## Technology Stack

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui (base-nova style)
- Better Auth
- next-themes

### Backend Integration
- Node.js
- Express.js
- REST API
- JWT Bearer Authentication

### Database and Authentication
- MongoDB
- Better Auth
- Session-based authentication

### Payment Integration
- Stripe Embedded Checkout

### Development Tools
- Turborepo
- npm Workspaces
- ESLint 10
- Prettier
- TypeScript

---

## Project Structure

This repository uses a Turborepo monorepo architecture.

```text
equipora/
│
├── apps/
│   └── web/
│       ├── app/
│       │   ├── (auth)/
│       │   ├── (site)/
│       │   ├── api/
│       │   ├── browse-equipment/
│       │   ├── checkout/
│       │   └── dashboard/
│       │
│       ├── components/
│       ├── hooks/
│       ├── lib/
│       ├── public/
│       ├── .env.example
│       └── package.json
│
├── packages/
│   ├── ui/
│   │   └── src/
│   │       └── components/
│   │
│   ├── eslint-config/
│   └── typescript-config/
│
├── package.json
├── turbo.json
├── package-lock.json
└── README.md
```

---

## User Roles and Access Control

Equipora supports three different user roles.

| Feature | Customer | Owner | Admin |
|---|:---:|:---:|:---:|
| Browse equipment | Yes | Yes | Yes |
| Search equipment | Yes | Yes | Yes |
| Book equipment | Yes | Yes | Yes |
| Manage favorites | Yes | Yes | Yes |
| Manage profile | Yes | Yes | Yes |
| Add equipment | No | Yes | No |
| Edit owned equipment | No | Yes | No |
| Manage rental requests | No | Yes | No |
| Monitor earnings | No | Yes | No |
| Manage users | No | No | Yes |
| Manage all equipment | No | No | Yes |
| Manage all rentals | No | No | Yes |

**Note:** Public registration supports Customer and Equipment Owner roles only. Administrator accounts are provisioned by the platform.

---

## Prerequisites

Before running the project, make sure you have installed:

- Node.js 20.9 or later
- npm 12 or later
- MongoDB Atlas account or local MongoDB
- Git
- Stripe account with test API keys
- A running Equipora Express backend

**Backend repository:** [https://github.com/Wasima230Sultana/equipora-server](https://github.com/Wasima230Sultana/equipora-server)

Default backend URL:

```text
http://localhost:5000
```

---

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Wasima230Sultana/equipora-client.git
```

### 2. Navigate to the project directory

```bash
cd Equipora
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Copy the example environment file:

```bash
cp apps/web/.env.example apps/web/.env.local
```

On Windows PowerShell, use:

```powershell
Copy-Item apps/web/.env.example apps/web/.env.local
```

### 5. Configure environment variables

Open `apps/web/.env.local` and provide the required values.

```env
# Better Auth
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

# MongoDB
MONGODB_URL=your_mongodb_connection_string

# Google Authentication (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Express Backend
NEXT_PUBLIC_EQUIPORA_SERVER_URL=http://localhost:5000

# Image Upload
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important:** Never commit `.env.local` or expose secret keys in your GitHub repository.

### 6. Start the backend

Make sure the separate `equipora-server` Express application is running.

### 7. Start the frontend

From the Equipora repository root:

```bash
npm run dev
```

Open your browser:

```text
http://localhost:3000
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `BETTER_AUTH_SECRET` | Secret used by Better Auth to sign session cookies |
| `BETTER_AUTH_URL` | Public application URL |
| `MONGODB_URL` | MongoDB connection string |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `NEXT_PUBLIC_EQUIPORA_SERVER_URL` | Express backend base URL |
| `NEXT_PUBLIC_IMGBB_API_KEY` | Image upload API key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe browser publishable key |
| `STRIPE_SECRET_KEY` | Stripe server-side secret key |
| `NEXT_PUBLIC_APP_URL` | Application URL used for Stripe return URLs |

---

## Authentication Architecture

Equipora uses Better Auth for authentication and MongoDB for session storage.

Authentication workflow:

1. Users register or log in using email and password.
2. Google sign-in is available when configured.
3. Better Auth manages user sessions.
4. Browser API clients retrieve the current session using `authClient.getSession()`.
5. The shared API client sends the session token to the Express backend using the Bearer authentication format.

Example authorization header:

```http
Authorization: Bearer YOUR_SESSION_TOKEN
```

The Express backend verifies the token and checks user permissions before allowing protected operations.

**Security:** Admin and owner permissions must be validated on the backend, not only in the frontend.

---

## Payment Integration

Equipora integrates Stripe Embedded Checkout for rental payments.

Payment workflow:

1. Customer selects equipment and rental details.
2. Frontend sends checkout information to the Next.js checkout API.
3. The checkout route validates the request and retrieves authoritative pricing from the backend.
4. A rental is created and Stripe Embedded Checkout is initialized.
5. Customer completes payment through Stripe.
6. The success page confirms payment through the backend.

Stripe test keys should be used during development.

Never expose the Stripe secret key in browser-side code.

---

## Available Scripts

Run these commands from the repository root.

| Command | Description |
|---|---|
| `npm run dev` | Start development servers |
| `npm run build` | Build production applications |
| `npm run lint` | Run ESLint across workspaces |
| `npm run typecheck` | Run TypeScript checks |
| `npm run format` | Format code using Prettier |

To run a script specifically for the web application:

```bash
npm run dev -w web
```

```bash
npm run build -w web
```

---

## UI Components

Equipora uses shadcn/ui with the base-nova style and Tailwind CSS 4.

Shared UI components are maintained in:

```text
packages/ui/src/components/
```

To add a new shadcn/ui component from the repository root:

```bash
npx shadcn@latest add button -c apps/web
```

Example import:

```tsx
import { Button } from "@workspace/ui/components/button"
```

---

## Theme Support

Equipora supports light and dark themes using `next-themes`.

The theme provider wraps the application, and the theme toggle allows users to switch between light and dark modes.

Theme preferences are persisted using browser localStorage.

---

## Deployment

The frontend is configured for deployment using Vercel.

### Deployment Steps

1. Push the frontend repository to GitHub.
2. Import the repository into Vercel.
3. Configure the project using the repository's root Vercel configuration.
4. Add the required environment variables in Vercel.
5. Configure the deployed frontend URL.
6. Ensure the Express backend is deployed and publicly accessible.
7. Update the backend URL in the frontend environment variables.
8. Deploy the application.

### Production Environment Configuration

Update the following values for production:

```env
BETTER_AUTH_URL=https://your-frontend-domain.com

NEXT_PUBLIC_EQUIPORA_SERVER_URL=https://your-backend-domain.com

NEXT_PUBLIC_APP_URL=https://your-frontend-domain.com
```

Also configure the production Stripe keys, MongoDB connection string, Better Auth secret, and optional Google OAuth credentials.

Make sure the backend CORS configuration allows requests from the deployed frontend origin.

---

## Future Improvements

- Advanced equipment filtering and sorting.
- Real-time booking notifications.
- Improved rental analytics and reporting.
- Enhanced owner earnings dashboard.
- Customer reviews and equipment ratings.
- Additional payment and booking features.


---

## License

This project is currently developed as a portfolio and learning project.

Add an appropriate LICENSE file before distributing it as open-source software.

---

**Equipora — Connecting Equipment Owners with Customers.**
