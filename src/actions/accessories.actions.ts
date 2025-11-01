"use server"

import {connectMongooseToDatabase} from "@/db";
import Accessory from "@/db/models/accessory.model";
import {auth} from "@/lib/auth";
import mongoose from "mongoose";
import {headers} from "next/headers";
import {AccessoryData} from "@/types/accessory";


export async function createAccessoryForMonster(monsterId:string, accessoryData:AccessoryData): Promise<void> {
  await connectMongooseToDatabase()
  
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session === null || session === undefined) {
    throw new Error('User not authenticated')
  }
  
  //TODO implémenter logique creation
  // - créer ID accessoire X
  // - retirer koins de wallet (use server action)
  
  const newAccessoryId = new  mongoose.Types.ObjectId()
  
  const newAccessory = new Accessory({
    _id: newAccessoryId,
    monsterId: monsterId,
    type: accessoryData.type,
    mainColor: accessoryData.mainColor,
  })
  
  // TODO acheter avec wallet
  
  await newAccessory.save()
  
}

//TODO - ajouter id a monster accessoire (create server action) 