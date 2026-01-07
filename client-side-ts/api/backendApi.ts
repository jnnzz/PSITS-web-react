function backendConnection() {
  return (import.meta as any).env?.VITE_API_URL;
}

export default backendConnection;
