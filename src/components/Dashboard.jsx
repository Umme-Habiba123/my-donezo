// components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
// import axios from 'axios';
import { 
  FiSettings, 
  FiHelpCircle, 
  FiLogOut, 
  FiPlus, 
  FiDownload,
  FiClock,
  FiCalendar,
  FiUsers,
  FiTrendingUp
} from 'react-icons/fi';
import { BsThreeDots } from 'react-icons/bs';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setDashboardData({
        totalProjects: 24,
        endedProjects: 10,
        runningProjects: 12,
        projectProgress: 41,
        timeTracker: "01:24:08",
        teamMembers: [
          { name: "Alexandra Deff", task: "Working on GitHub Project Repository", status: "Completed", avatar: "AD" },
          { name: "Edwin Aclentike", task: "Integrate User Authentication System", status: "In Progress", avatar: "EA" },
          { name: "Isaac Oluwatomiwon", task: "Develop Search and Filter Functionality", status: "Pending", avatar: "IO" },
          { name: "David Oshodi", task: "Responsive Layout for Homepage", status: "In Progress", avatar: "DO" }
        ],
        reminders: {
          title: "Meeting with Arc Company",
          time: "02:00 pm - 04:00 pm"
        }
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Completed': 'badge badge-success',
      'In Progress': 'badge badge-warning',
      'Pending': 'badge badge-info'
    };
    return statusClasses[status] || 'badge';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="navbar bg-base-100 shadow-sm px-4 md:px-8">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className="flex-none gap-4">
          <span className="text-sm text-base-content/70">Welcome, {user?.email || 'User'}</span>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                <span className="text-lg font-semibold">{user?.email?.charAt(0).toUpperCase() || 'U'}</span>
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li><a><FiSettings /> Settings</a></li>
              <li><a><FiHelpCircle /> Help</a></li>
              <li><a onClick={handleLogout}><FiLogOut /> Logout</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-8">
        <p className="text-base-content/70 mb-6">Plan, prioritize, and accomplish your tasks with ease.</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="stat bg-base-100 rounded-box p-6 shadow-sm">
            <div className="stat-title">Total Projects</div>
            <div className="stat-value text-3xl font-bold">{dashboardData.totalProjects}</div>
            <div className="stat-desc text-success flex items-center gap-1">
              <FiTrendingUp /> Increased from last month
            </div>
          </div>

          <div className="stat bg-base-100 rounded-box p-6 shadow-sm">
            <div className="stat-title">Ended Projects</div>
            <div className="stat-value text-3xl font-bold">{dashboardData.endedProjects}</div>
            <div className="stat-desc text-success flex items-center gap-1">
              <FiTrendingUp /> Increased from last month
            </div>
          </div>

          <div className="stat bg-base-100 rounded-box p-6 shadow-sm">
            <div className="stat-title">Running Projects</div>
            <div className="stat-value text-3xl font-bold">{dashboardData.runningProjects}</div>
            <div className="stat-desc text-success flex items-center gap-1">
              <FiTrendingUp /> Increased from last month
            </div>
          </div>

          <div className="stat bg-base-100 rounded-box p-6 shadow-sm">
            <div className="stat-title">Time Tracker</div>
            <div className="stat-value text-3xl font-mono">{dashboardData.timeTracker}</div>
            <div className="stat-desc">Current session</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button className="btn btn-primary">
            <FiPlus /> Add Project
          </button>
          <button className="btn btn-outline">
            <FiDownload /> Import Data
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Team Collaboration Section */}
          <div className="lg:col-span-2 bg-base-100 rounded-box p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FiUsers /> Team Collaboration
            </h2>
            <div className="space-y-4">
              {dashboardData.teamMembers.map((member, index) => (
                <div key={index} className="flex items-start gap-4 p-3 hover:bg-base-200 rounded-lg transition-colors">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                      <span>{member.avatar}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{member.name}</h3>
                      <span className={getStatusBadge(member.status)}>{member.status}</span>
                    </div>
                    <p className="text-sm text-base-content/70 mt-1">{member.task}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Reminders */}
            <div className="bg-base-100 rounded-box p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FiCalendar /> Reminders
              </h2>
              <div className="bg-primary/5 p-4 rounded-lg">
                <h3 className="font-semibold">{dashboardData.reminders.title}</h3>
                <p className="text-sm text-base-content/70 flex items-center gap-2 mt-2">
                  <FiClock /> {dashboardData.reminders.time}
                </p>
                <button className="btn btn-primary btn-sm w-full mt-4">
                  Start Meeting
                </button>
              </div>
            </div>

            {/* Project Progress */}
            <div className="bg-base-100 rounded-box p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Project Progress</h2>
              <div className="text-center">
                <div className="radial-progress text-primary" style={{ "--value": dashboardData.projectProgress, "--size": "8rem", "--thickness": "4px" }}>
                  {dashboardData.projectProgress}%
                </div>
                <p className="mt-4 font-semibold">Project Ended</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation (Mobile) */}
        <div className="btm-nav lg:hidden mt-8">
          <button className="text-primary">
            <FiSettings />
            <span className="btm-nav-label">Settings</span>
          </button>
          <button>
            <FiHelpCircle />
            <span className="btm-nav-label">Help</span>
          </button>
          <button onClick={handleLogout}>
            <FiLogOut />
            <span className="btm-nav-label">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;