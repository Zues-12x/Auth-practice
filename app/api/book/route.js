
import { NextRequest, NextResponse } from 'next/server';



export async function POST(NextRequest) {

    try {
        // Get the user ID from headers
        const userId = NextRequest.headers.get('x-user-id');
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        console.log(userId)
        return NextResponse.json({ message: 'good' }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}
