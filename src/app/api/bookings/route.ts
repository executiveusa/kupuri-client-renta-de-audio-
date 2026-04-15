import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        equipment: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(bookings)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}