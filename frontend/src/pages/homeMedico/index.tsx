
interface medicoProps {
   onLogout?: () => void;
  onNavigate?: (page: string) => void;
}

const DashboardMedico: React.FC<medicoProps> = ({ onNavigate })=> {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div>
      <h1>Dashboard do Médico</h1>
      <p>Bem-vindo, Dr(a). {user.nome}!</p>
    </div>
  );
};

export default DashboardMedico;