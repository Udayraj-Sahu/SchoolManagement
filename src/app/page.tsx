"use client";

import Link from "next/link";
import { useEffect } from "react";

// We declare Shery as a global variable to avoid TypeScript errors
declare const Shery: any;

export default function Home() {
	useEffect(() => {
		// Dynamically import GSAP
		import("gsap").then(({ gsap }) => {
			// GSAP Animations
			gsap.from(".anim-text", {
				y: 50,
				opacity: 0,
				duration: 1,
				ease: "power3.out",
				stagger: 0.2,
			});

			gsap.from(".anim-button", {
				y: 50,
				opacity: 0,
				duration: 1,
				ease: "power3.out",
				stagger: 0.2,
				delay: 0.5,
			});
		});

		// Check if Shery is available before using it
		if (typeof Shery !== "undefined") {
			Shery.mouseFollower();
			Shery.makeMagnet(".magnet-target");
			Shery.imageEffect(".magnet-target", {
				style: 5,
				gooey: true,
				config: { a: { value: 2 }, b: { value: 0.75 }, gooey: { value: true }, noEffectGooey: { value: true }, onMouse: { value: 1 }, metaball: { value: 0.45 }, noise_scale: { value: 10 } },
			});
		}
	}, []);

	return (
		// Shery.js often requires a main wrapper element
		<main id="main">
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
				<div className="max-w-md mx-auto text-center">
					<h1 className="text-4xl font-bold text-gray-900 mb-8 anim-text">
						School Management System
					</h1>
					<p className="text-lg text-gray-600 mb-8 anim-text">
						Manage and discover schools in your area
					</p>

					<div className="space-y-4">
						<Link
							href="/add-school"
							className="block w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors anim-button magnet-target">
							Add New School
						</Link>
						<Link
							href="/schools"
							className="block w-full bg-white text-indigo-600 py-3 px-6 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors anim-button magnet-target">
							View All Schools
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}
