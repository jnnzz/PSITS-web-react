export const Dashboard = () => {
  return (
    <div>
      <h2 className="mb-4 text-xl">Welcome to Admin Dashboard</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-blue-100 p-4 dark:bg-blue-900">
          <div className="text-2xl font-bold">120</div>
          <div>Users</div>
        </div>
        <div className="rounded-lg bg-green-100 p-4 dark:bg-green-900">
          <div className="text-2xl font-bold">45</div>
          <div>Events</div>
        </div>
        <div className="rounded-lg bg-purple-100 p-4 dark:bg-purple-900">
          <div className="text-2xl font-bold">12</div>
          <div>Organizations</div>
        </div>
      </div>
    </div>
  );
};
