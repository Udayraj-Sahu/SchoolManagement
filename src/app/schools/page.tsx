"use client";

import SchoolCard from "@/components/SchoolCard";
import { School } from "@/lib/db";
import { useEffect, useState } from "react";
import gsap from "gsap";

// We declare Shery as a global variable to avoid TypeScript errors
declare const Shery: any;

export default function SchoolsPage() {
	const [schools, setSchools] = useState<School[]>([]);

	useEffect(() => {
		async function getSchools() {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BASE_URL}/api/schools`,
					{
						cache: "no-store",
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch schools");
				}

				const data = await response.json();
				setSchools(data);
			} catch (error) {
				console.error("Error fetching schools:", error);
			}
		}

		getSchools();
	}, []);

	useEffect(() => {
		if (typeof Shery !== "undefined" && schools.length > 0) {
			Shery.imageEffect(".img-container", {
				style: 4, // Choose a style that you like
				gooey: true,
				config: {
					/* You can customize the effect here */
				},
			});
		}
	}, [schools]);

	return (
		<main id="main">
			<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-12">
						<h1 className="text-3xl font-bold text-gray-900 mb-4">
							Schools Directory
						</h1>
						<p className="text-xl text-gray-600">
							Discover amazing educational institutions
						</p>
						<div className="mt-6">
							<a
								href="/add-school"
								className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
								Add New School
							</a>
						</div>
					</div>

					{schools.length === 0 ? (
						<div className="text-center py-12">
							<p className="text-gray-500 text-lg">
								No schools found. Add the first school!
							</p>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{schools.map((school) => (
								<SchoolCard key={school.id} school={school} />
							))}
						</div>
					)}
				</div>
			</div>
		</main>
	);
}
