import Logout from '../components/auth/Logout';
import Navbar from '../ui/navbar';

const Dashboard = async () => (
  <div>
    <Navbar />
    <h1>Welcome to the Dashboard</h1>
    <Logout />
  </div>
);

export default Dashboard;
