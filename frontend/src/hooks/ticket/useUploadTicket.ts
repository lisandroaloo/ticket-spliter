import { useState } from "react";

const useUploadTicket = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadUrl, setUploadUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const uploadFile = async (file: File) => {
        setIsUploading(true);
        setError(null);
        setUploadUrl(null);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "your_upload_preset"); // Preset de Cloudinary

        try {
            const response = await fetch("http://localhost:5000/api/tickets/upload", {
                method: "POST",
                body: formData,
                credentials: 'include', // Esto incluye cookies, si es necesario
            });

            if (!response.ok) {
                // Si la respuesta no es ok, arrojar un error
                const errorMessage = await response.text();
                throw new Error(errorMessage || "Error uploading file");
            }

            const result = await response.json();
            setUploadUrl(result.url); // Guarda la URL de la imagen subida
        } catch (err: unknown) {
            setIsUploading(false); // Asegúrate de resetear el estado si ocurre un error

            if (err instanceof Error) {
                setError(err.message); // Guarda el mensaje de error
                console.error("Upload failed:", err.message);
            } else {
                setError("An unknown error occurred");
                console.error("Unknown error:", err);
            }
        } finally {
            setIsUploading(false); // En cualquier caso, ya no estamos subiendo
        }
    };

    return { uploadFile, isUploading, uploadUrl, error };
};

export default useUploadTicket;
