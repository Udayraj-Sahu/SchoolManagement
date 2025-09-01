"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { School } from "@/lib/db";

interface FormData extends Omit<School, "id"> {
	imageFile: FileList;
}

export default function AddSchoolForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [message, setMessage] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>();

	const onSubmit = async (data: FormData) => {
		setIsSubmitting(true);
		setMessage("");

		try {
			let imagePath = "";

			// Upload image if provided
			if (data.imageFile && data.imageFile.length > 0) {
				const formData = new FormData();
				formData.append("file", data.imageFile[0]);

				const uploadResponse = await fetch("/api/upload", {
					method: "POST",
					body: formData,
				});

				const uploadResult = await uploadResponse.json();
				if (uploadResponse.ok) {
					imagePath = uploadResult.filename;
				} else {
					throw new Error(uploadResult.error);
				}
			}

			// Submit school data
			const schoolData: School = {
				name: data.name,
				address: data.address,
				city: data.city,
				state: data.state,
				contact: Number(data.contact),
				email_id: data.email_id,
				image: imagePath,
			};

			const response = await fetch("/api/schools", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(schoolData),
			});

			const result = await response.json();

			if (response.ok) {
				setMessage("School added successfully!");
				reset();
			} else {
				throw new Error(result.error);
			}
		} catch (error) {
			setMessage(
				`Error: ${
					error instanceof Error ? error.message : "Unknown error"
				}`
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
				<h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
					Add New School
				</h1>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							School Name
						</label>
						<input
							{...register("name", {
								required: "School name is required",
							})}
							type="text"
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
						/>
						{errors.name && (
							<p className="mt-1 text-sm text-red-600">
								{errors.name.message}
							</p>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">
							Address
						</label>
						<textarea
							{...register("address", {
								required: "Address is required",
							})}
							rows={3}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
						/>
						{errors.address && (
							<p className="mt-1 text-sm text-red-600">
								{errors.address.message}
							</p>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">
							City
						</label>
						<input
							{...register("city", {
								required: "City is required",
							})}
							type="text"
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
						/>
						{errors.city && (
							<p className="mt-1 text-sm text-red-600">
								{errors.city.message}
							</p>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">
							State
						</label>
						<input
							{...register("state", {
								required: "State is required",
							})}
							type="text"
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
						/>
						{errors.state && (
							<p className="mt-1 text-sm text-red-600">
								{errors.state.message}
							</p>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">
							Contact Number
						</label>
						<input
							{...register("contact", {
								required: "Contact number is required",
								pattern: {
									value: /^[0-9]{10}$/,
									message: "Contact number must be 10 digits",
								},
							})}
							type="tel"
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
						/>
						{errors.contact && (
							<p className="mt-1 text-sm text-red-600">
								{errors.contact.message}
							</p>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							{...register("email_id", {
								required: "Email is required",
								pattern: {
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									message:
										"Please enter a valid email address",
								},
							})}
							type="email"
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
						/>
						{errors.email_id && (
							<p className="mt-1 text-sm text-red-600">
								{errors.email_id.message}
							</p>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">
							School Image
						</label>
						<input
							{...register("imageFile")}
							type="file"
							accept="image/*"
							className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
						/>
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
						{isSubmitting ? "Adding School..." : "Add School"}
					</button>
				</form>

				{message && (
					<div
						className={`mt-4 p-3 rounded-md ${
							message.includes("Error")
								? "bg-red-100 text-red-700"
								: "bg-green-100 text-green-700"
						}`}>
						{message}
					</div>
				)}

				<div className="mt-6 text-center">
					<a
						href="/schools"
						className="text-indigo-600 hover:text-indigo-500">
						View All Schools →
					</a>
				</div>
			</div>
		</div>
	);
}
