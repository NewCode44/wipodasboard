import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadInputProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({ label, value, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Clean up the old object URL to prevent memory leaks
      if (value && value.startsWith('blob:')) {
        URL.revokeObjectURL(value);
      }
      const newUrl = URL.createObjectURL(file);
      onChange(newUrl);
    }
  };

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <div
        onClick={handleAreaClick}
        className="cursor-pointer border-2 border-dashed border-white/20 rounded-lg p-4 text-center hover:border-primary-500/50 transition-colors flex items-center space-x-4"
      >
        {value ? (
          <img src={value} alt="Preview" className="w-16 h-16 object-cover rounded-md" />
        ) : (
          <div className="w-16 h-16 bg-white/5 rounded-md flex items-center justify-center">
            <Upload className="w-6 h-6 text-gray-400" />
          </div>
        )}
        <div className="text-left">
          <p className="text-sm text-gray-300">Haz clic para subir</p>
          <p className="text-xs text-gray-500 mt-1">O arrastra una imagen aquí</p>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
        />
      </div>
    </div>
  );
};
