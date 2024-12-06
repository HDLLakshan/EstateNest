import { cookies } from "next/headers";

const Dashboard = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;
  console.log(token);
  if (!token) {
    // Redirect to login if no token
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // // Optionally fetch user data using the token
  // const res = await fetch('http://localhost:5000/api/protected', {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  // const userData = await res.json();

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {/* <p>User Data: {JSON.stringify(userData)}</p> */}
    </div>
  );
};

export default Dashboard;
