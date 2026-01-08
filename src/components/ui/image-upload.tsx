"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, Trash, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string;
}

export default function ImageUpload({
    disabled,
    onChange,
    onRemove,
    value
}: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);

    const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];
            if (!file) return;

            setIsUploading(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            onChange(publicUrl);
            toast.success("Image uploaded successfully");
        } catch (error) {
            toast.error("Error uploading image");
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value && (
                    <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                        <div className="z-10 absolute top-2 right-2">
                            <Button type="button" onClick={() => onRemove(value)} variant="destructive" size="icon">
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <img className="object-cover w-full h-full" alt="Image" src={value} />
                    </div>
                )}
            </div>

            <div className="relative">
                <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    onChange={onUpload}
                    disabled={disabled || isUploading}
                />
                <Button
                    type="button"
                    disabled={disabled || isUploading}
                    variant="secondary"
                    className="pointer-events-none"
                >
                    {isUploading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                        <ImagePlus className="h-4 w-4 mr-2" />
                    )}
                    {isUploading ? "Uploading..." : "Upload an Image"}
                </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
                Images are stored in your private Supabase bucket.
            </p>
        </div>
    );
}
