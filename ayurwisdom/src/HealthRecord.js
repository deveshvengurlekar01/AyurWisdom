import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HealthRecord = ({ dosha, healthData }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (dosha) {
      const prakrutiData = healthData[dosha];
      setChartData({
        labels: Object.keys(prakrutiData),
        datasets: [{
          label: 'Health Parameters',
          data: Object.values(prakrutiData),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        }],
      });
    }
  }, [dosha, healthData]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Overall Health Report", 20, 10);

    if (dosha) {
      doc.text(`Prakruti Type: ${dosha}`, 20, 20);
      const tableColumn = ["Health Factor", "Value"];
      const tableRows = [];

      for (let factor in healthData[dosha]) {
        tableRows.push([factor, healthData[dosha][factor]]);
      }

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 30,
      });
    } else {
      doc.text("No dosha identified", 20, 20);
    }

    doc.save('health_report.pdf');
  };

  return (
    <div className="health-record">
      <h2>Health Records</h2>

      {dosha ? (
        <>
          <div className="chart-container">
            {chartData && <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />}
          </div>
          <button onClick={downloadPDF}>Download PDF Report</button>
        </>
      ) : (
        <p>No dosha identified. Please complete the Prakruti Assessment.</p>
      )}
    </div>
  );
};

export default HealthRecord;
