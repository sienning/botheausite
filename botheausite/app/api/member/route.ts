'use server'
// app/api/member/route.ts
import { NextResponse } from 'next/server'
import { getDB } from '../../lib/db'  // adjust the relative path if needed

interface Member {
  MEMBERS_ID: number
  NOM: string
  PRENOM: string
  // …add other columns here
}

export async function GET() {
  let db
  try {
    db = getDB()
    console.log(db)
    const members = db
      .prepare('SELECT * FROM MEMBERS')
      .all() as Member[]
    db.close()

    return NextResponse.json({ members })
  } catch (err) {
    if (db) db.close()
    console.error('DB error:', err)
    return NextResponse.json(
      { error: 'Failed to query MEMBERS table' },
      { status: 500 }
    )
  }
}
