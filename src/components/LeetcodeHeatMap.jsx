import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Chart as ChartJS, DoughnutController, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(DoughnutController, ArcElement, Tooltip, Legend);

const LeetCodeHeatMap = ({ username }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

      const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      rotate: [0, 1, -1, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

const fetchStats = async () => {
  try {
    setLoading(true);
    setError(null);

   

    const response = await fetch(`https://codash-next.vercel.app/api/platform/getLeetCodeDetails/${username}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");

    }
    if (response.status === 404) {
      throw new Error("User not found on LeetCode");
    }



    const data = await response.json();
    console.log(data);
   

    const submissionData = data?.submissions || [];
    const totalData = data?.leetCodeStats || [];

    const easySolved = submissionData?.Easy || 0;
    const mediumSolved =  submissionData?.Medium|| 0;
    const hardSolved = submissionData?.Hard || 0;
    const totalSolved = easySolved + mediumSolved + hardSolved;

    const totalEasy = totalData?.easy || 0;
    const totalMedium = totalData?.medium || 0;
    const totalHard = totalData?.hard|| 0;
    const totalQuestions = totalEasy + totalMedium + totalHard;

    const fetchedData = {
      username,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      totalQuestions,
      totalEasy,
      totalMedium,
      totalHard
    };

    setStats(fetchedData);
    console.log(fetchedData);
    setLoading(false);
  } catch (err) {
    console.error(err);
    setError("Failed to fetch LeetCode stats.");
    setLoading(false);
  }
};


  useEffect(() => {
    if (username) {
      fetchStats();
    }
  }, [username]);

  useEffect(() => {
   
    if (stats && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      
      const data = {
        labels: ['Easy', 'Medium', 'Hard'],
        datasets: [{
          data: [stats.easySolved, stats.mediumSolved, stats.hardSolved],
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)',
            'rgba(251, 191, 36, 0.8)',
            'rgba(239, 68, 68, 0.8)'
          ],
          borderColor: [
            'rgba(34, 197, 94, 1)',
            'rgba(251, 191, 36, 1)',
            'rgba(239, 68, 68, 1)'
          ],
          borderWidth: 2,
          cutout: '70%',
          borderRadius: 6,
          spacing: 2
        }]
      };

      const config = {
        type: 'doughnut',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: 'rgba(56, 189, 248, 0.5)',
              borderWidth: 1,
              cornerRadius: 8,
              displayColors: true,
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.parsed || 0;
                  return `${label}: ${value} problems`;
                }
              }
            }
          },
          animation: {
            animateRotate: true,
            animateScale: true,
            duration: 1500,
            easing: 'easeInOutQuart'
          }
        }
      };

      chartInstance.current = new ChartJS(ctx, config);
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [stats]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
console.log(stats);
  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-3"></div>
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-blue-500 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="text-white/70 text-sm">Loading stats...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto  rounded-2xl overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-purple-500/5 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.h1
                       className="text-3xl sm:text-4xl md:text-5xl text-center !mb-20 font-bold text-white mb-4 sm:mb-6 leading-tight"
                       variants={floatingVariants}
                       animate="animate"
                     >
                       Coding{" "}
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                         Stats
                       </span>
                     </motion.h1>

          {/* Main Stats Container */}
          <motion.div
            className="backdrop-blur-sm bg-white/5 rounded-2xl p-4 md:p-6 border border-white/10 shadow-xl"
            variants={itemVariants}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              
              {/* Chart Section */}
              <motion.div
                className="flex flex-col items-center"
                variants={itemVariants}
              >
                <div className="relative w-40 h-40 md:w-48 md:h-48">
                  <canvas ref={chartRef} className="w-full h-full"></canvas>
                  
                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                      {stats?.totalSolved || 0}
                    </div>
                    <div className="text-xs md:text-sm text-white/70">
                      Total Solved
                    </div>
                  </div>
                </div>

                {/* Custom Legend */}
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  {[
                    { label: 'Easy', color: 'bg-green-500', value: stats?.easySolved || 0 },
                    { label: 'Medium', color: 'bg-yellow-500', value: stats?.mediumSolved || 0 },
                    { label: 'Hard', color: 'bg-red-500', value: stats?.hardSolved || 0 }
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                      <span className="text-white text-xs md:text-sm">
                        {item.label}: {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Stats Details */}
              <motion.div
                className="space-y-4"
                variants={itemVariants}
              >
                <div className="text-center md:text-left">
                  <h3 className="text-base md:text-lg font-bold text-white mb-2">
                    Problem Stats
                  </h3>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto md:mx-0 mb-4"></div>
                </div>

                {/* Individual Stats */}
                <div className="space-y-3">
                  {[
                    { 
                      label: 'Total', 
                      value: stats?.totalSolved || 0, 
                      icon: '🎯', 
                      color: 'text-cyan-400',
                      bg: 'bg-cyan-500/10 border-cyan-500/20'
                    },
                    { 
                      label: 'Easy', 
                      value: stats?.easySolved || 0, 
                      icon: '🟢', 
                      color: 'text-green-400',
                      bg: 'bg-green-500/10 border-green-500/20'
                    },
                    { 
                      label: 'Medium', 
                      value: stats?.mediumSolved || 0, 
                      icon: '🟡', 
                      color: 'text-yellow-400',
                      bg: 'bg-yellow-500/10 border-yellow-500/20'
                    },
                    { 
                      label: 'Hard', 
                      value: stats?.hardSolved || 0, 
                      icon: '🔴', 
                      color: 'text-red-400',
                      bg: 'bg-red-500/10 border-red-500/20'
                    },
                  ].map((stat) => (
                    <motion.div
                      key={stat.label}
                      className={`p-3 rounded-lg border ${stat.bg} backdrop-blur-sm`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{stat.icon}</span>
                          <span className="text-white text-sm font-medium">
                            {stat.label}
                          </span>
                        </div>
                        <span className={`text-lg md:text-xl font-bold ${stat.color}`}>
                          {stat.value}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Compact Progress Bars */}
                <div className="mt-6 space-y-3">
                  <h4 className="text-sm font-semibold text-white mb-3">Progress</h4>
                  {[
                    { label: 'Easy', solved: stats?.easySolved || 0, total: stats?.totalEasy || 0, color: 'bg-green-500' },
                    { label: 'Medium', solved: stats?.mediumSolved || 0, total: stats?.totalMedium || 0, color: 'bg-yellow-500' },
                    { label: 'Hard', solved: stats?.hardSolved || 0, total: stats?.totalHard || 0, color: 'bg-red-500' }
                  ].map((progress) => (
                    <div key={progress.label} className="space-y-1">
                      <div className="flex justify-between text-xs text-white/70">
                        <span>{progress.label}</span>
                        <span>{progress.solved}/{progress.total}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5">
                        <motion.div
                          className={`h-1.5 rounded-full ${progress.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(progress.solved / progress.total) * 100}%` }}
                          transition={{ duration: 1.2, delay: 0.3 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LeetCodeHeatMap;