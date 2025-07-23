import React from 'react'
import { TowerData } from 'shared'

interface TowerDetailsProps {
  tower: TowerData
}

const TowerDetails: React.FC<TowerDetailsProps> = ({ tower }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-4">
      <h2 className="text-xl font-bold mb-4">Tower Details</h2>
      
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-red-600">{tower.carrier}</h3>
          <p className="text-gray-600">{tower.towerType} Tower</p>
        </div>

        <div>
          <h4 className="font-medium">Location</h4>
          <p className="text-sm text-gray-700">
            {tower.latitude.toFixed(6)}, {tower.longitude.toFixed(6)}
          </p>
        </div>

        {tower.frequency && (
          <div>
            <h4 className="font-medium">Frequency</h4>
            <p className="text-sm text-gray-700">{tower.frequency} MHz</p>
          </div>
        )}

        {tower.signalStrength && (
          <div>
            <h4 className="font-medium">Signal Strength</h4>
            <p className="text-sm text-gray-700">{tower.signalStrength} dBm</p>
          </div>
        )}

        <div>
          <h4 className="font-medium">Submitted By</h4>
          <p className="text-sm text-gray-700">{tower.submittedBy}</p>
        </div>

        <div>
          <h4 className="font-medium">Submitted</h4>
          <p className="text-sm text-gray-700">
            {new Date(tower.submittedAt).toLocaleDateString()}
          </p>
        </div>

        <div>
          <h4 className="font-medium">Status</h4>
          <p className={`text-sm font-medium ${tower.verified ? 'text-green-600' : 'text-yellow-600'}`}>
            {tower.verified ? '✓ Verified' : '⏳ Pending Verification'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TowerDetails 