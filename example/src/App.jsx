import React, { useState } from 'react';
import { Skeletonizer } from '../../src/Skeletonizer.jsx';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);
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
      </main>
    </div>
  );
}

export default App;
