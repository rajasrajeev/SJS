import React, { useEffect } from 'react';
import { useDirection } from '../../hooks/useDirection';
import { useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import PageTitle from '../../components/dashboard/PageTitle';
import CountCard from '../../components/dashboard/CountCard';
import TitleCard from '../../components/dashboard/TitleCard';



const Dashboard = () => {
  const { direction, toggleDirection } = useDirection();
  const { user, loading } = useSelector((store) => store.auth);

  useEffect(() => {
    // Update the direction on component mount based on the context
    document.documentElement.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    // console.log(user)
  }, [user]);

  const employeeData = [
    { name: 'Jan', employees: 120 },
    { name: 'Feb', employees: 130 },
    { name: 'Mar', employees: 125 },
    // Add more data points
  ];

  const attendanceData = [
    { name: 'Mon', attendance: 95 },
    { name: 'Tue', attendance: 97 },
    { name: 'Wed', attendance: 96 },
    // Add more data points
  ];

  const payrollData = [
    { name: 'Dept A', pending: 2 },
    { name: 'Dept B', pending: 3 },
    { name: 'Dept C', pending: 1 },
    // Add more data points
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className=''>
      <main>
        <section className='pt-2 '>
          <PageTitle
            title="Dashboard"
            iname="bi bi-globe"
          />
          <div className="row">
            <div className="col-md-3">
              <TitleCard name="SJS Consultancy" phone="91-90786969" web="www.sjs.com"/>
            </div>
            <div className="col-md-3">
              <CountCard
                title="Branches"
                count="2"
                color="red"
                icon="bx bx-network-chart"
                date="09/01/2025"
              />
            </div>
            <div className="col-md-3">
              <CountCard
                title="Staffs"
                count="5"
                color="orange"
                icon="bx bx-group"
                date="09/01/2025"
              />
            </div>
            <div className="col-md-3">
              <CountCard
                title="Employees"
                count="120"
                color="blue"
                icon="bx bx-building-house"
                date="09/01/2025"
              />
            </div>
            
          </div>
          <br/>
          <div className='row d-none'>
            <div className='col-md-4'>
              {/* Employees Line Chart */}
              <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: '#fdfdfd' }}>
                <h3>Employees Over Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={employeeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="employees" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className='col-md-4'>
              {/* Attendance Bar Chart */}
              <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: '#fdfdfd' }}>
                <h3>Attendance This Week</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="attendance" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className='col-md-4'>
              {/* Payroll Pie Chart */}
              <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: '#fdfdfd' }}>
                <h3>Pending Payroll by Department</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={payrollData}
                      dataKey="pending"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {payrollData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/* Announcements Section */}
        <section style={{ marginTop: '20px' }}>
          <h3>Announcements</h3>
          <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: '#fdfdfd' }}>
            <p style={{ margin: 0 }}>Under Development.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
export default Dashboard;
