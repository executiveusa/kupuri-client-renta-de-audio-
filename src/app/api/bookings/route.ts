import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        equipment: true,
        user: true,
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

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const booking = await prisma.booking.create({
      data: {
        userId: data.userId,
        equipmentId: data.equipmentId,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        totalPrice: data.totalPrice,
        notes: data.notes || null,
      },
      include: {
        equipment: true,
        user: true,
      },
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}
