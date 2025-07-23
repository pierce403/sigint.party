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
