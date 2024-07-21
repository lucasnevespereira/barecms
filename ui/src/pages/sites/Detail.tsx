import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Article, Project, Site} from "@/types";  // Assuming you have a Site type defined

const SiteDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();  // Extract ID from route params
    const [site, setSite] = useState<Site | null>(null);
    const [projects, setProjects] = useState<Project[] | null>([]);
    const [articles, setArticles] = useState<Article[] | null>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSite = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/sites/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch site details');
                }
                const data = await response.json();
                setSite(data.site);
                setProjects(data.site.projects);
                setArticles(data.site.articles);
            } catch (err: any) {
                setError(err.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchSite();
        }
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <main className='py-10 min-h-[600px]'>
            <div className="w-full flex justify-between items-center">
                <h2 className={"text-xl font-bold"}>Site Details</h2>
                <button className="btn btn-outline" >Remove Site</button>
            </div>
            {site ? (
                <div className="w-full">
                    <h2 className="text-2xl font-semibold mb-2">{site.name}</h2>
                    <p className="text-gray-600 mb-4">Id: {site.id}</p>
                    <p className="text-gray-600 mb-4">Slug: {site.slug}</p>

                    {/* Site Projects Section */}
                    <section className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">Site Projects</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {projects && projects.length > 0 ? (
                                projects.map(project => (
                                    <div key={project.id}
                                         className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                                        <h4 className="text-lg font-semibold mb-2">{project.name}</h4>
                                        <p className="text-gray-600">{project.description}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No projects found</p>
                            )}
                        </div>
                    </section>

                    {/* Site Articles Section */}
                    <section>
                        <h3 className="text-xl font-semibold mb-2">Site Articles</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {articles && articles.length > 0 ? (
                                articles.map(article => (
                                    <div key={article.id}
                                         className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                                        <h4 className="text-lg font-semibold mb-2">{article.title}</h4>
                                        <p className="text-gray-600">{article.content}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No articles found</p>
                            )}
                        </div>
                    </section>
                </div>
            ) : (
                <p>No site found</p>
            )}
        </main>
    );
}

export default SiteDetailsPage;
