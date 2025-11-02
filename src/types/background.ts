export interface DBBackground {
  _id: string
  monsterId: string
  url: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export type BackgroundData = Omit<DBBackground, '_id' | 'monsterId' | 'createdAt' | 'updatedAt'> & { price: number }
