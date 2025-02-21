import "./AllCss/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="welcome-text">Selamat Datang di Sistem Manajemen RSIA</h1>
      <p className="description">
        Aplikasi ini membantu admin dalam mengelola data karyawan, unit, dan
        jabatan dengan mudah dan efisien.
      </p>
      <button className="start-btn">Mulai Sekarang</button>
    </div>
  );
};

export default Home;
