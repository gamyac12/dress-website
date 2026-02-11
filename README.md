# LuxeDresses

A modern ecommerce application built with Django (Backend) and React (Frontend).

## Prerequisites

-   Python 3.x
-   Node.js and npm

## Setup & Running

This project consists of two parts: `backend` (Django) and `luxedresses-react` (React). You need to run both concurrently.

### 1. Backend

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies (if using a virtual environment, activate it first):
    ```bash
    pip install django djangorestframework django-cors-headers
    ```
3.  Apply migrations:
    ```bash
    python manage.py migrate
    ```
4.  Start the server:
    ```bash
    python manage.py runserver
    ```
    The backend will run at `http://127.0.0.1:8000`.

### 2. Frontend

1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd luxedresses-react
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The frontend will run at `http://localhost:5173`.

## Verification

-   Visit `http://localhost:5173` in your browser.
-   Ensure products are displayed (fetched from backend).

## Updating the App

### Database Changes
If you modify models in `backend/*/models.py`:
```bash
python manage.py makemigrations
python manage.py migrate
```

### Frontend Dependencies
If you add new packages to `luxedresses-react/package.json`:
```bash
npm install
```
