export const Dashboard = () => {
  return (
    <div>
      <h2 className="text-xl mb-4">Welcome to Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
          <div className="font-bold text-2xl">120</div>
          <div>Users</div>
        </div>
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
          <div className="font-bold text-2xl">45</div>
          <div>Events</div>
        </div>
        <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg">
          <div className="font-bold text-2xl">12</div>
          <div>Organizations</div>
        </div>
      </div>
    </div>
  );
};
