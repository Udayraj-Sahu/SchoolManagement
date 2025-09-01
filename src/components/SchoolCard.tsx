import { School } from "@/lib/db";
import Image from "next/image";

interface SchoolCardProps {
	school: School;
}

export default function SchoolCard({ school }: SchoolCardProps) {
	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
			<div className="relative h-48 w-full">
				<Image
					src={school.image || "/placeholder-school.jpg"}
					alt={school.name}
					fill
					className="object-cover"
					onError={(e) => {
						const target = e.target as HTMLImageElement;
						target.src = "/placeholder-school.jpg";
					}}
				/>
			</div>
			<div className="p-4">
				<h3 className="text-xl font-semibold text-gray-900 mb-2">
					{school.name}
				</h3>
				<p className="text-gray-600 mb-1">{school.address}</p>
				<p className="text-gray-600 font-medium">
					{school.city}, {school.state}
				</p>
			</div>
		</div>
	);
}
