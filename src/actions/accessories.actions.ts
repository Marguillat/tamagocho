"use server"

import {connectMongooseToDatabase} from "@/db";
import Accessory from "@/db/models/accessory.model"
import Monster from "@/db/models/monster.model"
import {auth} from "@/lib/auth";
import mongoose from "mongoose";
import {headers} from "next/headers";
import {AccessoryData, DBAccessory} from "@/types/accessory";
import {buyAccessory} from "@/actions/shop.actions";
import {ObjectId} from "mongodb";


export async function createAccessoryForMonster(monsterId:string, accessoryData:AccessoryData): Promise<void> {
  await connectMongooseToDatabase()
  
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session === null || session === undefined) {
    throw new Error('User not authenticated')
  }
  
  
  const newAccessoryId = new  mongoose.Types.ObjectId()
  
  const newAccessory = new Accessory({
    _id: newAccessoryId,
    monsterId: monsterId,
    type: accessoryData.type,
    mainColor: accessoryData.mainColor,
  })
  
  await buyAccessory(monsterId, accessoryData, accessoryData.price)
  
  await newAccessory.save()
  
}


export async function toggleAccessoryToMonster(monsterId:string, accessoryId:string): Promise<void> {
  await connectMongooseToDatabase()

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session === null || session === undefined) {
    throw new Error('User not authenticated')
  }

  const monster = await Monster.findOne({_id: monsterId})
  if (monster === null || monster === undefined) {
    throw new Error('Monster not found')
  }
  
  const accessory = await Accessory.findOne({_id: accessoryId, monsterId: monsterId})
  if (accessory === null || accessory === undefined) {
    throw new Error('Accessory not found for this monster')
  }
  
  const accessoryObjectId = new mongoose.Types.ObjectId(accessoryId)
  if (monster.equipedAccessories.includes(accessoryId)) {
    monster.equipedAccessories = monster.equipedAccessories.filter((id:ObjectId) => !id.equals(accessoryObjectId))
    monster.markModified('equipedAccessories')
    await monster.save()
    return
  }

  monster.equipedAccessories.push(accessoryId) 
  monster.markModified('equipedAccessories')
  await monster.save()
  return
}  

export async function getAccessoriesForMonster(monsterId:string): Promise<DBAccessory[] | void> {
  try {
    await connectMongooseToDatabase()

    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (session === null || session === undefined) {
      throw new Error('User not authenticated')
    }

    const accessories = await Accessory.find({monsterId: monsterId}).exec()
    return JSON.parse(JSON.stringify(accessories))
  } catch (error) {
    console.error('Error fetching accessories for monster:', error)
  }
}
  