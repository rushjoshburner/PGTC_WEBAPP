
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Assuming this component exists, if not I'll fall back to standard textarea or create it
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import ImageUpload from "@/components/ui/image-upload";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function NewEventPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        location: "",
        description: "",
        imageUrl: "",
        registrationLink: "",
        isActive: true
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("/api/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle Zod validation errors
                if (data.details && Array.isArray(data.details)) {
                    const errorMessage = data.details.map((err: any) => err.message).join(", ");
                    throw new Error(errorMessage);
                }
                throw new Error(data.error || "Failed to create event");
            }

            toast.success("Event created successfully");
            router.push("/admin/events");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-8">
            <div className="mb-6">
                <Link href="/admin/events" className="flex items-center text-gray-400 hover:text-white transition-colors text-sm mb-2">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
                </Link>
                <h1 className="text-3xl font-display font-bold text-white">Create New Event</h1>
                <p className="text-gray-400">Add a new drive, meetup, or track day.</p>
            </div>

            <Card className="bg-[#1A1A1A] border-white/10">
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-white">Event Title</Label>
                            <Input
                                id="title"
                                placeholder="e.g. Monsoon Drive 2025"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                                className="bg-black/50 border-white/10 text-white"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="date" className="text-white">Date</Label>
                                <Input
                                    id="date"
                                    type="datetime-local"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    required
                                    className="bg-black/50 border-white/10 text-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location" className="text-white">Location</Label>
                                <Input
                                    id="location"
                                    placeholder="e.g. Lonavala Ghats"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    required
                                    className="bg-black/50 border-white/10 text-white"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-white">Cover Image</Label>
                            <div className="bg-black/20 p-4 rounded-md border border-white/10 border-dashed">
                                <ImageUpload
                                    value={formData.imageUrl}
                                    onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                                    onRemove={() => setFormData({ ...formData, imageUrl: "" })}
                                />
                                <p className="text-xs text-gray-500 mt-2">Recommended size: 1920x1080px (16:9)</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-white">Description</Label>
                            <textarea
                                id="description"
                                placeholder="Event details, meeting point, route info..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="flex min-h-[120px] w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="link" className="text-white">Registration Link (Optional)</Label>
                            <Input
                                id="link"
                                placeholder="https://..."
                                value={formData.registrationLink}
                                onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                                className="bg-black/50 border-white/10 text-white"
                            />
                        </div>

                        <div className="flex items-center space-x-2 pt-2">
                            <input
                                type="checkbox"
                                id="isActive"
                                checked={formData.isActive}
                                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
                            />
                            <Label htmlFor="isActive" className="text-white cursor-pointer">Active (Visible on Website)</Label>
                        </div>

                        <div className="pt-4 flex gap-4">
                            <Link href="/admin/events" className="flex-1">
                                <Button variant="outline" type="button" className="w-full border-white/10 text-white hover:bg-white/10 hover:text-white">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Create Event
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
