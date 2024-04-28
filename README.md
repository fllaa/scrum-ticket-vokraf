# Scrum Ticket

## Description

This is technical test for Vokraf

## Installation

1. Clone this repository

```bash
git clone https://github.com/fllaa/scrum-ticket-vokraf.git
```

2. Install dependencies

```bash
yarn install
```

4. Create environment file on api-gateway and each microservices

```bash
cp .env.example .env
```

5. Run migration

```bash
yarn db:migrate
```

6. Generate prisma client

```bash
yarn db:generate
```

7. Run the project

```bash
yarn dev
```
