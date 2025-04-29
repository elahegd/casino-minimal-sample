# 🎰 Minimal Casino Website – Frontend Project

This project is a simple casino-style web application built with a focus on frontend functionality and integration with a mock backend API using Deno. It features login/logout, game listing, filtering, and a game details view.

---

## 🚀 Project Overview

The goal is to implement a functional casino frontend by connecting to the provided API endpoints and presenting game-related data in a clear and responsive interface.

---

## ✅ Features

### 🔐 Login Functionality

- Connects to the `/login` API.
- On valid credentials, redirects to the **Games List** screen.
- On invalid login, displays error feedback and allows retry.

### 🔓 Logout Functionality

- Connects to the `/logout` API.
- Clears user session and returns to the login screen with reset fields.

### 🎮 Games List Screen

- Requires user authentication.
- Fetches games from `/games` and categories from `/categories`.
- Allows filtering games by:
  - Typing (search input).
  - Category selection.
- Clickable play icon navigates to a game’s detail page.

### 📄 Game Detail Page

- Requires user to be logged in.
- Loads game data from `/games/:gameId`.
- Displays full game information including:
  - Name
  - Description
  - Icon
  - Category names

---

## 🛠 Setup Instructions

### 1. Install Deno

First, install Deno using the instructions for your operating system:  
👉 [Deno Installation Guide](https://docs.deno.com/runtime/getting_started/installation/)

### 2. Run the Mock API Server

```bash
deno run --watch --allow-net mock/mock-api.js


### Login
Path: /login

You can use the following account to log in:

```
username: alex
password: xela

```

