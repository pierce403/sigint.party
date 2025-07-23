import { useState, useEffect } from 'react'
import { TowerData, ApiResponse } from 'shared'
import MapComponent from './components/Map'
import TowerForm from './components/TowerForm'
import TowerDetails from './components/TowerDetails'

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"

// Example tower data for demonstration
const exampleTowers: TowerData[] = [
  {
    id: '1',
    latitude: 40.7128,
    longitude: -74.0060,
    carrier: 'Verizon',
    frequency: 1900,
    signalStrength: -85,
    towerType: '5G',
    submittedBy: 'nyc_radio_guy',
    submittedAt: new Date('2024-01-15'),
    verified: true
  },
  {
    id: '2',
    latitude: 34.0522,
    longitude: -118.2437,
    carrier: 'T-Mobile',
    frequency: 2100,
    signalStrength: -78,
    towerType: 'LTE',
    submittedBy: 'la_scanner',
    submittedAt: new Date('2024-01-14'),
    verified: true
  },
  {
    id: '3',
    latitude: 41.8781,
    longitude: -87.6298,
    carrier: 'AT&T',
    frequency: 850,
    signalStrength: -92,
    towerType: 'LTE',
    submittedBy: 'chicago_mapper',
    submittedAt: new Date('2024-01-13'),
    verified: false
  },
  {
    id: '4',
    latitude: 51.5074,
    longitude: -0.1278,
    carrier: 'EE',
    frequency: 2600,
    signalStrength: -80,
    towerType: '5G',
    submittedBy: 'london_tech',
    submittedAt: new Date('2024-01-12'),
    verified: true
  },
  {
    id: '5',
    latitude: 35.6762,
    longitude: 139.6503,
    carrier: 'NTT DoCoMo',
    frequency: 3500,
    signalStrength: -75,
    towerType: '5G',
    submittedBy: 'tokyo_rf',
    submittedAt: new Date('2024-01-11'),
    verified: true
  },
  {
    id: '6',
    latitude: -33.8688,
    longitude: 151.2093,
    carrier: 'Telstra',
    frequency: 1800,
    signalStrength: -88,
    towerType: 'LTE',
    submittedBy: 'sydney_explorer',
    submittedAt: new Date('2024-01-10'),
    verified: false
  }
]

function App() {
  const [towers, setTowers] = useState<TowerData[]>(exampleTowers)
  const [selectedTower, setSelectedTower] = useState<TowerData | null>(null)

  async function submitTower(towerData: TowerData) {
    try {
      // For now, just add to local state since we don't have a backend running
      setTowers(prev => [...prev, towerData])
      
      // In a real app, this would POST to the server:
      // const req = await fetch(`${SERVER_URL}/towers`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(towerData)
      // })
      // const res: ApiResponse = await req.json()
      // if (res.success) {
      //   loadTowers() // Refresh tower data
      // }
      
      alert('Tower data submitted successfully!')
    } catch (error) {
      console.error('Failed to submit tower:', error)
      alert('Failed to submit tower data')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="text-2xl">📡</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">sigint.party</h1>
              <p className="text-gray-600">Community Cellphone Tower Mapping</p>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Tower Map</h2>
              <MapComponent 
                towers={towers}
                onTowerSelect={setSelectedTower}
              />
              <div className="mt-4 text-sm text-gray-600">
                <p>📍 {towers.length} towers mapped • Click markers for details</p>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <TowerForm onSubmit={submitTower} />
            
            {selectedTower && (
              <TowerDetails tower={selectedTower} />
            )}
            
            {!selectedTower && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-3">Recent Submissions</h3>
                <div className="space-y-2">
                  {towers.slice(-3).reverse().map(tower => (
                    <div 
                      key={tower.id}
                      className="p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100"
                      onClick={() => setSelectedTower(tower)}
                    >
                      <div className="font-medium">{tower.carrier}</div>
                      <div className="text-sm text-gray-600">{tower.towerType} • {tower.submittedBy}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
