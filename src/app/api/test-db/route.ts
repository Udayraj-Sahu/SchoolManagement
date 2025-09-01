import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
	try {
		const db = getDb();
		await db.execute("SELECT 1");
		return NextResponse.json({
			message: "Database connected successfully",
		});
	} catch (error) {
		console.error("Database connection error:", error);
		return NextResponse.json(
			{
				error: "Database connection failed",
				details:
					error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}
