// API Client for Fireslab-frontend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/categories`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch categories');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Error fetching categories:', err);
    return [];
  }
}

export async function fetchApplications() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/applications`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch applications');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Error fetching applications:', err);
    return [];
  }
}

export async function fetchSiteSettings() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/settings`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch site settings');
    const json = await res.json();
    return json.data || null;
  } catch (err) {
    console.error('Error fetching settings:', err);
    return null;
  }
}

export async function fetchHeroSlides() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/hero-slides`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch hero slides');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Error fetching hero slides:', err);
    return [];
  }
}

export async function fetchCompanyStats() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/company-stats`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch company stats');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Error fetching company stats:', err);
    return [];
  }
}

export async function fetchCertifications() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/certifications`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch certifications');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Error fetching certifications:', err);
    return [];
  }
}

export async function submitLeadInquiry(data: {
  name: string;
  email: string;
  company?: string;
  solution_interest: string;
  message?: string;
}) {
  const res = await fetch(`${API_BASE_URL}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || 'Failed to submit inquiry');
  }
  return json;
}

export async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch products');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Error fetching products:', err);
    return [];
  }
}

export async function fetchFeaturedProjects() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/projects?featured=true`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch featured projects');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Error fetching featured projects:', err);
    return [];
  }
}

export async function fetchProjects(category?: string) {
  try {
    const url = category && category !== 'all'
      ? `${API_BASE_URL}/api/projects?category=${encodeURIComponent(category)}`
      : `${API_BASE_URL}/api/projects`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch projects');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Error fetching projects:', err);
    return [];
  }
}

export async function fetchSolutions() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/solutions`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch solutions');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Error fetching solutions:', err);
    return [];
  }
}

export async function fetchProductBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`Failed to fetch product with slug: ${slug}`);
    const json = await res.json();
    return json.data || null;
  } catch (err) {
    console.error(`Error fetching product by slug ${slug}:`, err);
    return null;
  }
}
