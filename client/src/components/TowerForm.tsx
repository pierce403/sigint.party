import React, { useState } from 'react'
import { TowerData } from 'shared'

interface TowerFormProps {
  onSubmit: (tower: TowerData) => void
}

const TowerForm: React.FC<TowerFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    latitude: '',
    longitude: '',
    carrier: '',
    frequency: '',
    signalStrength: '',
    towerType: 'Unknown' as TowerData['towerType'],
    submittedBy: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const towerData: TowerData = {
      id: Math.random().toString(36).substr(2, 9),
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      carrier: formData.carrier,
      frequency: formData.frequency ? parseFloat(formData.frequency) : undefined,
      signalStrength: formData.signalStrength ? parseFloat(formData.signalStrength) : undefined,
      towerType: formData.towerType,
      submittedBy: formData.submittedBy,
      submittedAt: new Date(),
      verified: false
    }

    onSubmit(towerData)
    
    // Reset form
    setFormData({
      latitude: '',
      longitude: '',
      carrier: '',
      frequency: '',
      signalStrength: '',
      towerType: 'Unknown',
      submittedBy: ''
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Submit Tower Data</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Latitude *</label>
            <input
              type="number"
              step="any"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="40.7128"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Longitude *</label>
            <input
              type="number"
              step="any"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="-74.0060"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Carrier *</label>
          <input
            type="text"
            name="carrier"
            value={formData.carrier}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
            placeholder="Verizon, AT&T, T-Mobile, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tower Type *</label>
          <select
            name="towerType"
            value={formData.towerType}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          >
            <option value="Unknown">Unknown</option>
            <option value="GSM">GSM</option>
            <option value="CDMA">CDMA</option>
            <option value="LTE">LTE</option>
            <option value="5G">5G</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Frequency (MHz)</label>
            <input
              type="number"
              step="any"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="1900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Signal (dBm)</label>
            <input
              type="number"
              step="any"
              name="signalStrength"
              value={formData.signalStrength}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="-85"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Your Name *</label>
          <input
            type="text"
            name="submittedBy"
            value={formData.submittedBy}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
            placeholder="Your name or username"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
        >
          Submit Tower Data
        </button>
      </form>
    </div>
  )
}

export default TowerForm 