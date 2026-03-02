'use client';

import { useEffect, useState } from 'react';
import { companyService } from '@/services/companyService';
import { api } from '@/services/api';
import { Company, Category } from '@/types';
import { Header } from '@/components/Header'; // Importando o Header inteligente

export default function Home() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [cityId, setCityId] = useState<string>('');

  useEffect(() => {
    async function getLimoeiro() {
      try {
        const res = await api.get('/cities');
        const limoeiro = res.data.find((c: any) => c.slug === 'limoeiro-do-norte');
        if (limoeiro) setCityId(limoeiro.id);
      } catch (err) {
        console.error("Não achei a cidade, mn");
      }
    }
    getLimoeiro();
  }, []);

  useEffect(() => {
    if (!cityId) return;

    async function loadData() {
      setLoading(true);
      try {
        const [catsRes, compsRes] = await Promise.all([
          api.get('/categories'),
          companyService.getAll(cityId, selectedCategory || undefined)
        ]);
        setCategories(catsRes.data);
        setCompanies(compsRes);
      } catch (error) {
        console.error("Deu ruim na busca, mn", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [cityId, selectedCategory]);

  const filteredCompanies = companies.filter(c =>
    c.name.toUpperCase().includes(search.toUpperCase())
  );

  return (
    <div className="min-h-screen">
      {/* Usando o Header que gerencia Login/Logout sozinho */}
      <Header />

      {/* Hero com Gradiente */}
      <section className="relative bg-primary-dark pt-20 pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark opacity-90" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            O que você procura em <br />
            <span className="text-secondary">Limoeiro do Norte?</span>
          </h1>

          <div className="relative max-w-2xl mx-auto group">
            <input
              type="text"
              placeholder="Ex: Pizzaria, Farmácia, Advogado..."
              className="w-full h-16 pl-14 pr-6 rounded-2xl bg-white text-gray-900 shadow-2xl outline-none focus:ring-4 focus:ring-secondary/30 transition-all text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Principal */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 -mt-12 pb-20">
        {/* Categorias Pills */}
        <div className="flex gap-3 overflow-x-auto pb-8 scrollbar-hide no-scrollbar">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-8 py-3 rounded-2xl font-bold whitespace-nowrap shadow-lg transition-all border-2 ${!selectedCategory
              ? 'bg-secondary border-secondary text-white scale-105'
              : 'bg-white border-transparent text-gray-500 hover:border-gray-200'
              }`}
          >
            Tudo
          </button>

          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-8 py-3 rounded-2xl font-bold whitespace-nowrap shadow-lg transition-all border-2 ${selectedCategory === cat.id
                ? 'bg-secondary border-secondary text-white scale-105'
                : 'bg-white border-transparent text-gray-500 hover:border-gray-200'
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="text-center col-span-full py-20 font-bold text-gray-400">Carregando o progresso, mn...</p>
          ) : filteredCompanies.map(company => (
            <div key={company.id} className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-56 bg-gray-100">
                {company.logoUrl ? (
                  /* Ajuste do caminho da imagem para a pasta da empresa */
                  <img
                    src={`http://localhost:3333/uploads/${company.id}/${company.logoUrl}`}
                    className="w-full h-full object-cover"
                    alt={company.name}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-gray-50 to-gray-200">
                    <span className="text-3xl font-black text-gray-300 tracking-tighter">SEM LOGO</span>
                  </div>
                )}
                {company.plan === 'PREMIUM' && (
                  <span className="absolute top-4 right-4 bg-secondary text-white px-4 py-1.5 rounded-full text-xs font-black shadow-lg uppercase tracking-widest">
                    DESTAQUE
                  </span>
                )}
              </div>

              <div className="p-6">
                <span className="text-xs font-bold text-primary mb-2 block uppercase tracking-wider">{company.category.name}</span>
                <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-primary transition-colors">{company.name}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-6 h-10">{company.description || 'Nenhuma descrição informada.'}</p>

                <div className="flex gap-3">
                  <a
                    href={`https://wa.me/${company.whatsapp}`}
                    target="_blank"
                    className="flex-1 bg-accent/10 text-accent hover:bg-accent hover:text-white py-4 rounded-2xl font-black text-center transition-all flex items-center justify-center gap-2"
                  >
                    WHATSAPP
                  </a>
                  <button className="bg-gray-50 text-gray-400 px-5 py-4 rounded-2xl hover:bg-gray-100 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && filteredCompanies.length === 0 && (
          <div className="bg-white rounded-[2rem] p-20 text-center shadow-inner border border-gray-50 mt-10">
            <span className="text-6xl mb-6 block">🌵</span>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Nada por aqui, mn!</h3>
            <p className="text-gray-400 max-w-xs mx-auto font-medium">Não achamos nenhuma empresa nessa categoria em Limoeiro ainda.</p>
          </div>
        )}
      </main>
    </div>
  );
}