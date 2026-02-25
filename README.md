# Gator
A CLI RSS feed aggregator written in TypeScript with Drizzle ORM and PostgreSQL.

Gator lets users subscribe to RSS feeds, follow/unfollow feeds, and browse the latest posts directly from the terminal.

---

# Requirements

To run Gator you need:

- Node.js 18+
- PostgreSQL 16+
- npm

---

# Installation

Clone the repository:
```bash
git clone https://github.com/xDaoud/ts-blog-aggregator.git
cd ts-blog-aggregator
```

Create a PostgreSQL database:
```sql
CREATE DATABASE gator;
```

Run migrations:
```bash
npm run migrate
```

---

# Config File Setup

Gator uses a config file stored at:

```
~/.gatorconfig.json
```

Create this file:
```bash
touch ~/.gatorconfig.json
```

Example config:
```json
{
  "db_url": "postgres://postgres:postgres@localhost:5432/gator",
  "current_user_name": "daoud"
}
```

Fields:

- db_url → PostgreSQL connection string
- current_user_name → active CLI user

---

# Running the CLI

Run any command with:
```bash
npm run start <command> [args]
```

Example:
```bash
npm run start users
```

---

# Commands

Create User:
```bash
npm run start register <username>
```

Add Feed:
```bash
npm run start addfeed <name> <url>
```
Automatically follows the feed.

Follow Feed:
```bash
npm run start follow <url>
```

Unfollow Feed:
```bash
npm run start unfollow <url>
```

List Feeds:
```bash
npm run start feeds
```

Following:
Shows feeds the current user follows:
```bash
npm run start following
```

Aggregate Feeds:
Fetches RSS feeds continuously:
```bash
npm run start agg 1m
```

Example durations:

- 10s
- 1m
- 1h

Browse Posts:
Shows latest posts from followed feeds:
```bash
npm run start browse
npm run start browse 5
```

---

# Example RSS Feeds

You can try:

- https://techcrunch.com/feed/
- https://news.ycombinator.com/rss
- https://blog.boot.dev/index.xml

---

# Tech Stack

- TypeScript
- Drizzle ORM
- PostgreSQL
- Node.js
