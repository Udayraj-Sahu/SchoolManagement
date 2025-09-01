"use client";

import Link from "next/link";
import { useEffect } from "react";
import gsap from "gsap";

// We declare Shery as a global variable to avoid TypeScript errors
declare const Shery: any;

export default function Home() {
	useEffect(() => {
		// Check if Shery is available before using it
		if (typeof Shery !== "undefined") {
			Shery.mouseFollower();
			Shery.makeMagnet(".magnet-target");
			Shery.imageEffect(".magnet-target", {
				style: 5,
				gooey: true,
				config: {
					a: { value: 2, range: [0, 30] },
					b: { value: 0.75, range: [-1, 1] },
					zindex: { value: -9996999, range: [-9999999, 9999999] },
					aspect: { value: 0.7272749983570035 },
					ignoreShapeAspect: { value: true },
					shapePosition: { value: { x: 0, y: 0 } },
					shapeScale: { value: { x: 0.5, y: 0.5 } },
					shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
					shapeRadius: { value: 0, range: [0, 2] },
					currentScroll: { value: 0 },
					scrollLerp: { value: 0.07 },
					gooey: { value: true },
					infiniteGooey: { value: false },
					growSize: { value: 4, range: [1, 15] },
					durationOut: { value: 1, range: [0.1, 5] },
					durationIn: { value: 1.5, range: [0.1, 5] },
					displaceAmount: { value: 0.5 },
					masker: { value: true },
					maskVal: { value: 1.21, range: [1, 5] },
					scrollType: { value: 0 },
					geoVertex: {
						range: [1, 64],
						value: 1,
					},
					noEffectGooey: { value: true },
					onMouse: { value: 1 },
					noise_speed: { value: 0.2, range: [0, 10] },
					metaball: { value: 0.45, range: [0, 2] },
					discard_threshold: { value: 0.5, range: [0, 1] },
					antialias_threshold: { value: 0, range: [0, 0.1] },
					noise_height: { value: 0.5, range: [0, 2] },
					noise_scale: { value: 10, range: [0, 100] },
				},
			});
		}

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
