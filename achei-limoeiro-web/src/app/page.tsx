'use client';

import { useEffect, useState } from 'react';
import { companyService } from '@/services/companyService';
import { api } from '@/services/api';
import { Company, Category } from '@/types';
import { Header } from '@/components/Header'; // Importando o Header inteligente
import Link from 'next/link';

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

      {/* Hero Section Modernizado */}
      <section className="relative pt-24 pb-40 px-6 overflow-hidden bg-slate-900">
        {/* Background Patterns/Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.15),transparent)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent opacity-30" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-black text-primary uppercase tracking-widest">Guia Oficial de Limoeiro do Norte</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
            Encontre o que você <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-primary">precisa agora.</span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Conectamos você às melhores empresas e serviços da cidade de forma simples, rápida e moderna.
          </p>

          <div className="relative max-w-2xl mx-auto group animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-light rounded-[2rem] blur opacity-25 group-focus-within:opacity-50 transition duration-500" />
            <div className="relative">
              <input
                type="text"
                placeholder="Ex: Pizzaria, Farmácia, Advogado..."
                className="w-full h-20 pl-16 pr-6 rounded-[1.8rem] bg-white text-slate-900 shadow-2xl outline-none focus:ring-0 transition-all text-xl font-medium placeholder:text-slate-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 -mt-20 pb-32">
        {/* Filtros de Categoria */}
        <div className="flex gap-4 overflow-x-auto pb-12 no-scrollbar scroll-smooth">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-8 py-4 rounded-2xl font-black whitespace-nowrap transition-all duration-300 shadow-lg ${!selectedCategory
              ? 'bg-primary text-white scale-105 shadow-primary/25'
              : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
              }`}
          >
            Todos os Segmentos
          </button>

          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-8 py-4 rounded-2xl font-black whitespace-nowrap transition-all duration-300 shadow-lg ${selectedCategory === cat.id
                ? 'bg-primary text-white scale-105 shadow-primary/25'
                : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid de Empresas */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-[450px] bg-slate-100 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredCompanies.map(company => (
              <div key={company.id} className="group modern-card rounded-3xl overflow-hidden flex flex-col h-full">
                {/* Imagem do Card */}
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  {company.logoUrl ? (
                    <img
                      src={`http://localhost:3333/uploads/${company.id}/${company.logoUrl}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt={company.name}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200">
                      <span className="text-4xl mb-2">🏢</span>
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Sem Imagem</span>
                    </div>
                  )}

                  {/* Badge de Plano */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm">
                      {company.category.name}
                    </span>
                    {company.plan === 'PREMIUM' && (
                      <span className="bg-secondary text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-lg">
                        Destaque
                      </span>
                    )}
                  </div>
                </div>

                {/* Informações */}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-1">
                    {company.name}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 line-clamp-2 h-10">
                    {company.description || 'Uma excelente opção para você em Limoeiro do Norte.'}
                  </p>

                  <div className="mt-auto flex items-center gap-3">
                    <a
                      href={`https://wa.me/${company.whatsapp?.replace(/\D/g, '')}`}
                      target="_blank"
                      className="flex-[2] h-14 bg-slate-900 text-white hover:bg-primary rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-lg active:scale-95"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.15-.67-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.408.002 12.04c0 2.12.554 4.189 1.602 6.06L0 24l6.091-1.599a11.802 11.802 0 005.954 1.599h.005c6.635 0 12.046-5.41 12.049-12.042a11.758 11.758 0 00-3.486-8.527z" />
                      </svg>
                      CONTATO
                    </a>
                    <Link
                      href={`/company/${company.id}`}
                      className="flex-1 h-14 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-2xl flex items-center justify-center transition-all active:scale-95"
                      title="Ver Detalhes"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Estado Vazio */}
        {!loading && filteredCompanies.length === 0 && (
          <div className="bg-slate-50 rounded-[3rem] p-24 text-center border-2 border-dashed border-slate-200">
            <span className="text-7xl mb-8 block">🔍</span>
            <h3 className="text-3xl font-black text-slate-900 mb-4">Nenhum resultado encontrado</h3>
            <p className="text-slate-500 max-w-sm mx-auto font-medium text-lg">
              Não encontramos nenhuma empresa em "<span className="text-primary font-bold">{search}</span>" nesta categoria.
            </p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory(null); }}
              className="mt-10 text-primary font-black uppercase tracking-widest text-sm hover:underline"
            >
              Limpar todos os filtros
            </button>
          </div>
        )}
      </main>
    </div>
  );
}