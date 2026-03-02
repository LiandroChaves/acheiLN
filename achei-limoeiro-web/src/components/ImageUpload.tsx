'use client';

import { useState, ChangeEvent } from 'react';
import { api } from '@/services/api';

interface ImageUploadProps {
    companyId: string;
    onUploadSuccess: () => void;
}

export function ImageUpload({ companyId, onUploadSuccess }: ImageUploadProps) {
    const [loadingLogo, setLoadingLogo] = useState(false);
    const [loadingGallery, setLoadingGallery] = useState(false);

    async function handleLogoUpload(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('logo', file);

        setLoadingLogo(true);
        try {
            await api.patch(`/companies/${companyId}/logo`, formData);
            alert('Logo atualizada com sucesso!');
            onUploadSuccess();
        } catch (err) {
            alert('Erro ao subir a logo, mn.');
        } finally {
            setLoadingLogo(false);
        }
    }

    async function handleGalleryUpload(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);
        const formData = new FormData();
        files.forEach(file => formData.append('images', file));

        setLoadingGallery(true);
        try {
            await api.post(`/companies/${companyId}/images`, formData);
            alert('Fotos adicionadas à galeria!');
            onUploadSuccess();
        } catch (err) {
            alert('Erro ao subir galeria.');
        } finally {
            setLoadingGallery(false);
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 p-8 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
            <div>
                <h4 className="text-sm font-black text-gray-700 uppercase tracking-widest mb-4">Logo da Empresa (Thumbnail)</h4>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-primary border-dotted rounded-2xl cursor-pointer hover:bg-primary/5 transition-all">
                    <span className="text-xs font-bold text-primary">{loadingLogo ? 'Subindo...' : 'Selecionar Logo'}</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} disabled={loadingLogo} />
                </label>
            </div>

            <div>
                <h4 className="text-sm font-black text-gray-700 uppercase tracking-widest mb-4">Galeria de Fotos (Outras Fotos)</h4>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-secondary border-dotted rounded-2xl cursor-pointer hover:bg-secondary/5 transition-all">
                    <span className="text-xs font-bold text-secondary">{loadingGallery ? 'Subindo...' : 'Adicionar Fotos'}</span>
                    <input type="file" className="hidden" accept="image/*" multiple onChange={handleGalleryUpload} disabled={loadingGallery} />
                </label>
            </div>
        </div>
    );
}