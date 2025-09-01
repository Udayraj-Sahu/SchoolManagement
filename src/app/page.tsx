import Link from "next/link";

export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
			<div className="max-w-md mx-auto text-center">
				<h1 className="text-4xl font-bold text-gray-900 mb-8">
					School Management System
				</h1>
				<p className="text-lg text-gray-600 mb-8">
					Manage and discover schools in your area
				</p>

				<div className="space-y-4">
					<Link
						href="/add-school"
						className="block w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
						Add New School
					</Link>
					<Link
						href="/schools"
						className="block w-full bg-white text-indigo-600 py-3 px-6 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors">
						View All Schools
					</Link>
				</div>
			</div>
		</div>
	);
}
