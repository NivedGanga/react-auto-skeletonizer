import React, { useState } from 'react';
import { Skeletonizer } from '../../src/Skeletonizer.jsx';
import { ProductCard } from './ProductCard.jsx';
import './index.css';

const MOCK_PRODUCTS = [
  {
    id: 1,
    title: 'Modern Wireless Headphones',
    price: 129.99,
    description: 'High-quality sound with active noise cancellation and 40-hour battery life.',
    category: 'Electronics',
    rating: { rate: 4.8, count: 124 },
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    items: ['Bluetooth 5.0', 'Active Noise Cancellation', '40h Battery', 'USB-C Charging', 'Foldable Design']
  },
  {
    id: 2,
    title: 'Minimalist Leather Watch',
    price: 85.00,
    description: 'Elegant timepiece with a genuine leather strap and scratch-resistant glass.',
    category: 'Accessories',
    rating: { rate: 4.5, count: 89 },
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    items: ['Swiss Movement', 'Genuine Leather', '3ATM Water Resistant', 'Safire Crystal', 'Night Glow']
  },
  {
    id: 3,
    title: 'Ergonomic Standing Desk',
    price: 450.00,
    description: 'Spacious work surface with motorized height adjustment and memory presets.',
    category: 'Furniture',
    rating: { rate: 4.9, count: 56 },
    image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=300&h=300&fit=crop',
    items: ['Motorized Height', 'Memory Presets', 'Cable Management', 'Anti-Collision Sensor', 'Solid Oak Top']
  },
];

function App() {
  const [loading, setLoading] = useState(true);
  const [distributorLoading, setDistributorLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isApiLoading, setIsApiLoading] = useState(true);

  const fetchUserData = () => {
    setIsApiLoading(true);
    setUserData(null);
    setTimeout(() => {
      setUserData({
        name: "Alex Johnson",
        age: 28,
        address: "123 React Street, Web City"
      });
      setIsApiLoading(false);
    }, 2000);
  };

  React.useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>React Skeletonizer Demo</h1>
        <button onClick={() => setLoading(!loading)} className="toggle-btn">
          {loading ? 'Show Content' : 'Show Skeleton'}
        </button>
      </header>

      <main className="dashboard-main">
        {/* API Fetch Mock Example */}
        <section className="api-fetch-example" style={{ marginBottom: '2rem' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.2rem', margin: 0 }}>API Loader Example</h2>
            <button onClick={fetchUserData} className="toggle-btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>
              Refetch Real API
            </button>
          </header>
          <Skeletonizer loading={isApiLoading}>
            <div className="profile-section" style={{ border: '1px solid #333', borderRadius: '8px', padding: '1rem' }}>
              <div className="profile-info">
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>{userData?.name || "Loading Name..."}</h3>
                <p style={{ margin: '0 0 0.5rem 0', color: '#aaa' }}>Age: {userData?.age || 50}</p>
                <p style={{ margin: 0, color: '#aaa' }}>Address: {userData?.address || "Loading Address Placeholder..."}</p>
              </div>
            </div>
          </Skeletonizer>
        </section>

        {/* User Profile */}
        <Skeletonizer loading={loading} >
          <section className="profile-section">
            <div className="profile-avatar">
              <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" />
            </div>
            <div className="profile-info">
              <h2><span>Jane Doe</span> <i className="material-icons verified-icon">verified</i></h2>
              <p className="profile-role">Senior Software Engineer at TechCorp</p>
              <p className="profile-bio">Passionate about building highly intuitive and dynamic React applications. Love creating open source tools that make developers' lives easier. Focuses on robust scalable front end architectures.</p>
            </div>
          </section>
        </Skeletonizer>

        {/* Card Grid */}
        <Skeletonizer loading={loading} className="section-skeleton">
          <section className="cards-grid">
            {[1, 2, 3].map(item => (
              <div key={item} className="card">
                <div className="card-image-placeholder"></div>
                <div className="card-content">
                  <h3>Project Alpha {item}</h3>
                  <p>A comprehensive overview of the alpha module metrics and performance indicators over the last quarter.</p>
                  <div className="card-actions">
                    <button className="action-btn">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </Skeletonizer>

        {/* Data Table */}
        <Skeletonizer loading={loading} className="section-skeleton">
          <section className="table-section">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '20%' }}>ID</th>
                  <th style={{ width: '40%' }}>Name</th>
                  <th style={{ width: '15%' }}>Status</th>
                  <th style={{ width: '25%' }}>Last Login</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map(row => (
                  <tr key={row}>
                    <td>#USR-00{row}</td>
                    <td>
                      <div className="user-cell">
                        <img src={`https://i.pravatar.cc/150?img=${row + 20}`} className="table-avatar" alt="user" />
                        <span>User Name {row}</span>
                      </div>
                    </td>
                    <td><span className="status-chip active">Active</span></td>
                    <td>2 hours ago</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </Skeletonizer>

        {/* ── Custom React Components (getOrCreateWrapper demo) ── */}
        <section style={{ marginBottom: '2rem' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', margin: '0 0 0.25rem 0' }}>Custom React Components</h2>
            </div>
            <button
              className="toggle-btn"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', flexShrink: 0 }}
              onClick={() => {
                setDistributorLoading(true);
                setTimeout(() => setDistributorLoading(false), 2000);
              }}
            >
              {distributorLoading ? 'Loading…' : 'Reload Skeleton'}
            </button>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {MOCK_PRODUCTS.map((p) => (
              <Skeletonizer key={p.id} loading={distributorLoading} hideBgColour hideBorders bgColor='white'>
                <ProductCard
                  title={p.title}
                  price={p.price}
                  description={p.description}
                  category={p.category}
                  rating={p.rating}
                  image={p.image}
                  items={p.items}
                />
              </Skeletonizer>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
