# sigint.party 📡

![cover](https://cdn.stevedylan.dev/ipfs/bafybeievx27ar5qfqyqyud7kemnb5n2p4rzt2matogi6qttwkpxonqhra4)

A collaborative cellphone tower mapping platform built with a full-stack TypeScript monorepo architecture.

> 🚀 **Now with auto-deployment!** Every commit automatically deploys to [sigint.party](https://sigint.party) via Orbiter.

## About sigint.party

sigint.party is a community-driven application that enables users to contribute and explore cellphone tower information on an interactive world map. Similar to projects like Wigle, our platform crowdsources cellular infrastructure data to create a comprehensive database of tower locations, signal strengths, and network information.

Whether you're a radio enthusiast, researcher, or simply curious about the cellular infrastructure around you, sigint.party provides the tools to map and share this valuable information with the community.

## Features

- **Interactive World Map**: Explore cellphone towers on a dynamic, zoomable world map
- **Community Contributions**: Upload and share cellphone tower data from your area
- **Real-time Updates**: See new tower submissions as they're added by the community
- **Tower Details**: View comprehensive information including signal strength, carrier, and technical specifications
- **Search & Filter**: Find towers by location, carrier, frequency, or other criteria
- **Full-Stack TypeScript**: End-to-end type safety between client and server
- **Shared Types**: Common type definitions shared between client and server
- **Monorepo Structure**: Organized as a workspaces-based monorepo with Turbo for build orchestration
- **Modern Stack**:
  - [Bun](https://bun.sh) as the JavaScript runtime and package manager
  - [Hono](https://hono.dev) as the backend framework
  - [Vite](https://vitejs.dev) for frontend bundling
  - [React](https://react.dev) for the frontend UI
  - [Turbo](https://turbo.build) for monorepo build orchestration and caching

## Project Structure

```
.
├── client/               # React frontend with map interface
├── server/               # Hono backend API for tower data
├── shared/               # Shared TypeScript definitions
│   └── src/types/        # Type definitions used by both client and server
├── package.json          # Root package.json with workspaces
└── turbo.json            # Turbo configuration for build orchestration
```

### Server

The backend API handles tower data storage, retrieval, and user submissions. Built with Hono for performance and simplicity.

```
server
├── bun.lock
├── package.json
├── README.md
├── src
│   └── index.ts
└── tsconfig.json
```

```typescript src/index.ts
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { TowerData, ApiResponse } from 'shared/dist'

const app = new Hono()

app.use(cors())

app.get('/', (c) => {
  return c.text('Welcome to sigint.party API!')
})

app.get('/towers', async (c) => {
  // Return tower data for map display
  const data: ApiResponse<TowerData[]> = {
    message: "Tower data retrieved successfully",
    success: true,
    data: [] // Tower data would come from database
  }

  return c.json(data, { status: 200 })
})

app.post('/towers', async (c) => {
  // Handle new tower submissions
  const towerData = await c.req.json()
  
  // Process and store tower data
  const response: ApiResponse = {
    message: "Tower data submitted successfully",
    success: true
  }

  return c.json(response, { status: 201 })
})

export default app
```

The server integrates with mapping databases and handles geospatial queries for efficient tower data retrieval based on map bounds and zoom levels.

### Client

The frontend provides an interactive map interface for viewing and submitting cellphone tower data. Built with React and modern mapping libraries.

```
client
├── eslint.config.js
├── index.html
├── package.json
├── public
│   └── vite.svg
├── README.md
├── src
│   ├── App.tsx
│   ├── assets
│   ├── components/
│   │   ├── Map.tsx          # Interactive world map
│   │   ├── TowerForm.tsx    # Tower submission form
│   │   └── TowerDetails.tsx # Tower information display
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

```typescript src/App.tsx
import { useState, useEffect } from 'react'
import { TowerData, ApiResponse } from 'shared'
import MapComponent from './components/Map'
import TowerForm from './components/TowerForm'
import './App.css'

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"

function App() {
  const [towers, setTowers] = useState<TowerData[]>([])
  const [selectedTower, setSelectedTower] = useState<TowerData | null>(null)

  useEffect(() => {
    loadTowers()
  }, [])

  async function loadTowers() {
    try {
      const req = await fetch(`${SERVER_URL}/towers`)
      const res: ApiResponse<TowerData[]> = await req.json()
      if (res.success && res.data) {
        setTowers(res.data)
      }
    } catch (error) {
      console.error('Failed to load towers:', error)
    }
  }

  async function submitTower(towerData: TowerData) {
    try {
      const req = await fetch(`${SERVER_URL}/towers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(towerData)
      })
      const res: ApiResponse = await req.json()
      if (res.success) {
        loadTowers() // Refresh tower data
      }
    } catch (error) {
      console.error('Failed to submit tower:', error)
    }
  }

  return (
    <div className="app">
      <header>
        <h1>sigint.party</h1>
        <p>Community Cellphone Tower Mapping</p>
      </header>
      
      <main>
        <MapComponent 
          towers={towers}
          onTowerSelect={setSelectedTower}
        />
        
        <div className="sidebar">
          <TowerForm onSubmit={submitTower} />
          {selectedTower && (
            <TowerDetails tower={selectedTower} />
          )}
        </div>
      </main>
    </div>
  )
}

export default App
```

### Shared

The shared package contains type definitions for tower data structures and API responses used throughout the application.

```
shared
├── package.json
├── src
│   ├── index.ts
│   └── types
│       └── index.ts
└── tsconfig.json
```

Example types for tower data:

```typescript types/index.ts
export interface TowerData {
  id: string
  latitude: number
  longitude: number
  carrier: string
  frequency?: number
  signalStrength?: number
  towerType: 'GSM' | 'CDMA' | 'LTE' | '5G' | 'Unknown'
  submittedBy: string
  submittedAt: Date
  verified: boolean
}

export interface ApiResponse<T = any> {
  message: string
  success: boolean
  data?: T
}
```

By running `bun run dev` or `bun run build` it will compile and export the packages from `shared` so it can be used in either `client` or `server`.

## Getting Started

### Installation

```bash
# Install dependencies for all workspaces
bun install
```

### Development

```bash
# Run all workspaces in development mode with Turbo
bun run dev

# Or run individual workspaces directly
bun run dev:client    # Run the Vite dev server for React
bun run dev:server    # Run the Hono backend
```

### Building

```bash
# Build all workspaces with Turbo
bun run build

# Or build individual workspaces directly
bun run build:client  # Build the React frontend
bun run build:server  # Build the Hono backend
```

### Additional Commands

```bash
# Lint all workspaces
bun run lint

# Type check all workspaces
bun run type-check

# Run tests across all workspaces
bun run test
```

### Environment Configuration

Create a `.env` file in the client directory for environment-specific settings:

```bash
# Client environment variables
VITE_SERVER_URL=http://localhost:3000
VITE_MAP_API_KEY=your_map_api_key_here
```

### Database Setup

sigint.party requires a database to store tower information. Recommended options:

- **PostgreSQL with PostGIS** for geospatial queries
- **Supabase** for managed PostgreSQL with built-in geospatial support
- **MongoDB** with geospatial indexing

### Deployment

**Client**
- [Orbiter](https://orbiter.host)
- [GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages)
- [Netlify](https://vite.dev/guide/static-deploy.html#netlify)
- [Cloudflare Pages](https://vite.dev/guide/static-deploy.html#cloudflare-pages)

**Server**
- [Cloudflare Worker](https://gist.github.com/stevedylandev/4aa1fc569bcba46b7169193c0498d0b3)
- [Railway](https://railway.app) - Great for Bun deployments
- [Fly.io](https://fly.io) - Docker-based deployment
- [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)

## Type Sharing

Types are automatically shared between the client and server thanks to the shared package and TypeScript path aliases. Import tower data types and API responses using:

```typescript
import { TowerData, ApiResponse } from 'shared/types';
```

## Contributing

We welcome contributions to sigint.party! Whether you're submitting tower data, reporting bugs, or contributing code:

1. **Submit Tower Data**: Use the web interface to add towers in your area
2. **Report Issues**: Open GitHub issues for bugs or feature requests
3. **Code Contributions**: Fork the repository and submit pull requests
4. **Documentation**: Help improve our documentation and guides

### Data Guidelines

When submitting tower data:
- Ensure location accuracy (GPS coordinates preferred)
- Include as much technical detail as possible
- Verify information before submission
- Respect privacy and local regulations

## Privacy & Legal

- All submitted data becomes part of the public database
- No personal information is stored beyond submission metadata
- Users are responsible for compliance with local regulations
- Data is provided "as-is" for educational and research purposes

## Learn More

**Technology Stack:**
- [Bun Documentation](https://bun.sh/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev/learn)
- [Hono Documentation](https://hono.dev/docs)
- [Turbo Documentation](https://turbo.build/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

**Related Projects:**
- [Wigle](https://wigle.net) - WiFi and cellular network mapping
- [OpenCellID](https://opencellid.org) - Open cellular tower database
- [CellMapper](https://cellmapper.net) - Crowdsourced cellular coverage maps

---

Built with ❤️ by the sigint.party community
