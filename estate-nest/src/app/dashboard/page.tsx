import Card from '../components/card';
import { pages } from '../utils/const';

const Dashboard = async () => (
  <div className="w-full flex justify-center p-2">
    <div className="m-auto space-y-4">
      {pages.map((page) => (
        <Card
          key={page.name}
          name={page.name}
          url="/estate-management"
          description={page.description}
        />
      ))}
    </div>
  </div>
);

export default Dashboard;
