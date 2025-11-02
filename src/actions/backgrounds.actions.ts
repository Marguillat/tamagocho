'use server'

import { connectMongooseToDatabase } from '@/db'
import Background from '@/db/models/background.model'
import Monster from '@/db/models/monster.model'
import { auth } from '@/lib/auth'
import mongoose from 'mongoose'
import { headers } from 'next/headers'
import { BackgroundData, DBBackground } from '@/types/background'
import { subtractKoins } from '@/actions/wallet.actions'

/**
 * Crée un nouveau background pour un monstre et le stocke en base de données
 * @param monsterId - L'ID du monstre pour lequel créer le background
 * @param backgroundData - Les données du background (url, description, price)
 */
export async function createBackgroundForMonster (monsterId: string, backgroundData: BackgroundData): Promise<void> {
  await connectMongooseToDatabase()

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session === null || session === undefined) {
    throw new Error('User not authenticated')
  }

  const monster = await Monster.findOne({ _id: monsterId })
  if (monster === null || monster === undefined) {
    throw new Error('Monster not found')
  }

  const newBackground = new Background({
    monsterId: monsterId,
    url: backgroundData.url,
    description: backgroundData.description
  })

  await subtractKoins(backgroundData.price)

  await newBackground.save()
}

/**
 * Active un background pour un monstre (le définit comme background équipé)
 * @param monsterId - L'ID du monstre
 * @param backgroundId - L'ID du background à activer
 */
export async function activateBackgroundForMonster (monsterId: string, backgroundId: string): Promise<void> {
  await connectMongooseToDatabase()

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session === null || session === undefined) {
    throw new Error('User not authenticated')
  }

  const monster = await Monster.findOne({ _id: monsterId })
  if (monster === null || monster === undefined) {
    throw new Error('Monster not found')
  }

  const background = await Background.findOne({ _id: backgroundId, monsterId })
  if (background === null || background === undefined) {
    throw new Error('Background not found for this monster')
  }

  monster.equipedBackground = backgroundId
  monster.markModified('equipedBackground')
  await monster.save()
}

/**
 * Retire le background équipé d'un monstre
 * @param monsterId - L'ID du monstre dont retirer le background
 */
export async function removeBackgroundFromMonster (monsterId: string): Promise<void> {
  await connectMongooseToDatabase()

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session === null || session === undefined) {
    throw new Error('User not authenticated')
  }

  const monster = await Monster.findOne({ _id: monsterId })
  if (monster === null || monster === undefined) {
    throw new Error('Monster not found')
  }

  monster.equipedBackground = null
  monster.markModified('equipedBackground')
  await monster.save()
}

/**
 * Récupère tous les backgrounds d'un monstre
 * @param monsterId - L'ID du monstre
 * @returns La liste des backgrounds ou undefined en cas d'erreur
 */
export async function getBackgroundsForMonster (monsterId: string): Promise<DBBackground[] | undefined> {
  try {
    await connectMongooseToDatabase()

    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (session === null || session === undefined) {
      throw new Error('User not authenticated')
    }

    const backgrounds = await Background.find({ monsterId }).exec()
    return JSON.parse(JSON.stringify(backgrounds))
  } catch (error) {
    console.error('Error fetching backgrounds for monster:', error)
  }
}
