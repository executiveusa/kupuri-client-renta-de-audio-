import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get('category')
    
    const equipment = await prisma.equipment.findMany({
      where: category ? { category } : {},
      include: {
        reviews: {
          select: { rating: true },
        },
      },
    })

    return NextResponse.json(equipment)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch equipment' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const equipment = await prisma.equipment.create({
      data,
    })

    return NextResponse.json(equipment)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create equipment' },
      { status: 500 }
    )
  }
}
