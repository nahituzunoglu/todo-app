import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080';

export default function App() {
  // Oturum ve Kullanıcı Durumu
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Form Durumları
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [tcNo, setTcNo] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Görev (Task) Durumları
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('HEPSI');

  // Kullanıcı giriş yaptıysa görevlerini getir
  useEffect(() => {
    if (user) {
      fetchUserTasks();
    }
  }, [user]);

  // --- KULLANICI İŞLEMLERİ ---

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (!username || !password || (isRegister && !tcNo)) {
      setAuthError('Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      if (isRegister) {
        // Kayıt Olma (Kullanıcı Adı, TC Kimlik No, Şifre)
        await axios.post(`${API_URL}/users`, {
          user_name: username,
          tc: tcNo,
          password: password,
        });
        alert('Kayıt başarılı! Şimdi oluşturduğunuz şifre ile giriş yapabilirsiniz.');
        setIsRegister(false);
        setPassword('');
        setTcNo('');
      } else {
        // Giriş Yapma
        const response = await axios.post(`${API_URL}/users`, {
          user_name: username,
          password: password,
        });

        const loggedUser = response.data;
        setUser(loggedUser);
        localStorage.setItem('currentUser', JSON.stringify(loggedUser));
        setUsername('');
        setPassword('');
      }
    } catch (err) {
      setAuthError(err.response?.data?.message || 'İşlem sırasında bir hata oluştu.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    setTasks([]);
  };

  // --- GÖREV İŞLEMLERİ ---

  const fetchUserTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/tasks/user/${user.id}`);
      setTasks(res.data);
    } catch (err) {
      console.error('Görevler çekilemedi:', err);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!taskTitle || !taskDueDate) {
      alert('Lütfen başlık ve bitiş tarihi seçin.');
      return;
    }

    try {
      await axios.post(`${API_URL}/tasks`, {
        title: taskTitle,
        dueTime: taskDueDate,
        user: {
          id: user.id,
        },
      });

      setTaskTitle('');
      setTaskDueDate('');
      fetchUserTasks();
    } catch (err) {
      alert('Görev eklenirken hata oluştu.');
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await axios.patch(`${API_URL}/tasks/${taskId}/complete`);
      fetchUserTasks();
    } catch (err) {
      alert('Görev güncellenirken hata oluştu.');
    }
  };

  // Filtrelenmiş görevler
  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === 'HEPSI') return true;
    return task.status === filterStatus;
  });

  // --- EKRAN 1: GİRİŞ / KAYIT FORMU ---
  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>{isRegister ? 'Kayıt Ol' : 'Giriş Yap'}</h2>
          {authError && <p style={styles.error}>{authError}</p>}
          <form onSubmit={handleAuth} style={styles.form}>
            <input
              type="text"
              placeholder="Kullanıcı Adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />

            {/* Sadece Kayıt Ol ekranında TC Kimlik No gösterilir */}
            {isRegister && (
              <input
                type="text"
                placeholder="TC Kimlik No (11 Haneli)"
                maxLength={11}
                value={tcNo}
                onChange={(e) => setTcNo(e.target.value)}
                style={styles.input}
              />
            )}

            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />

            <button type="submit" style={styles.button}>
              {isRegister ? 'Kayıt Ol' : 'Giriş Yap'}
            </button>
          </form>

          <p style={styles.toggleText}>
            {isRegister ? 'Zaten hesabınız var mı?' : 'Hesabınız yok mu?'}{' '}
            <span
              onClick={() => {
                setIsRegister(!isRegister);
                setAuthError('');
              }}
              style={styles.toggleLink}
            >
              {isRegister ? 'Giriş Yapın' : 'Kayıt Olun'}
            </span>
          </p>
        </div>
      </div>
    );
  }

  // --- EKRAN 2: TO-DO DASHBOARD ---
  return (
    <div style={styles.dashboardContainer}>
      <header style={styles.header}>
        <h2>Hoş Geldin, {user.user_name || user.username || 'Kullanıcı'}! 👋</h2>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Çıkış Yap
        </button>
      </header>

      {/* GÖREV EKLEME FORMU */}
      <div style={styles.card}>
        <h3>Yeni Görev Ekle</h3>
        <form onSubmit={handleAddTask} style={styles.formInline}>
          <input
            type="text"
            placeholder="Görev Başlığı..."
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            style={{ ...styles.input, flex: 2 }}
          />
          <input
            type="datetime-local"
            value={taskDueDate}
            onChange={(e) => setTaskDueDate(e.target.value)}
            style={{ ...styles.input, flex: 1 }}
          />
          <button type="submit" style={styles.button}>
            Ekle
          </button>
        </form>
      </div>

      {/* FİLTRE DÜĞMELERİ */}
      <div style={styles.filterGroup}>
        {['HEPSI', 'BEKLIYOR', 'TAMAMLANDI', 'BASARISIZ'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            style={{
              ...styles.filterButton,
              backgroundColor: filterStatus === status ? '#007bff' : '#e0e0e0',
              color: filterStatus === status ? '#fff' : '#333',
            }}
          >
            {status}
          </button>
        ))}
      </div>

      {/* GÖREV LİSTESİ */}
      <div style={styles.taskList}>
        <h3>Görevlerim ({filteredTasks.length})</h3>
        {filteredTasks.length === 0 ? (
          <p style={{ color: '#777' }}>Gösterilecek görev bulunamadı.</p>
        ) : (
          filteredTasks.map((t) => (
            <div key={t.id} style={styles.taskItem}>
              <div>
                <strong style={{ fontSize: '18px' }}>{t.title}</strong>
                <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
                  Bitiş Saati: {t.dueTime ? t.dueTime.replace('T', ' ') : 'Belirtilmedi'}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    ...styles.badge,
                    backgroundColor:
                      t.status === 'TAMAMLANDI'
                        ? '#28a745'
                        : t.status === 'BASARISIZ'
                          ? '#dc3545'
                          : '#ffc107',
                    color: t.status === 'BEKLIYOR' ? '#000' : '#fff',
                  }}
                >
                  {t.status || 'BEKLIYOR'}
                </span>

                {t.status === 'BEKLIYOR' && (
                  <button
                    onClick={() => handleCompleteTask(t.id)}
                    style={styles.completeButton}
                  >
                    Tamamla ✓
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Stiller
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f6f9',
    fontFamily: 'sans-serif',
  },
  dashboardContainer: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'sans-serif',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formInline: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: '8px 16px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  toggleText: {
    marginTop: '15px',
    textAlign: 'center',
    fontSize: '14px',
  },
  toggleLink: {
    color: '#007bff',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  error: {
    color: '#dc3545',
    marginBottom: '10px',
  },
  filterGroup: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  filterButton: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  taskList: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  taskItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 0',
    borderBottom: '1px solid #eee',
  },
  badge: {
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  completeButton: {
    padding: '6px 12px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};