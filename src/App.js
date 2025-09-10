import React, { useState } from 'react';
import { BarChart3, LineChart, PieChart, Download, Upload } from 'lucide-react';
import Papa from 'papaparse';
import {
  BarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

function App() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [numericColumns, setNumericColumns] = useState([]);
  const [textColumns, setTextColumns] = useState([]);
  const [chartType, setChartType] = useState('bar');
  const [fileName, setFileName] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0'];

  const chartTypes = [
    { id: 'bar', name: 'Bar Chart', icon: BarChart3 },
    { id: 'line', name: 'Line Chart', icon: LineChart },
    { id: 'pie', name: 'Pie Chart', icon: PieChart },
  ];

  const handleFileUpload = (file) => {
    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data.slice(0, 20); // Limit to first 20 rows for performance
        setData(parsedData);

        if (parsedData.length > 0) {
          const cols = Object.keys(parsedData[0]);
          setColumns(cols);

          // Detect numeric vs text columns
          const numericCols = [];
          const textCols = [];

          cols.forEach(col => {
            const values = parsedData.map(row => row[col]).filter(val => val !== null && val !== '');
            const isNumeric = values.every(val => !isNaN(val) && val !== '');
            if (isNumeric) {
              numericCols.push(col);
            } else {
              textCols.push(col);
            }
          });

          setNumericColumns(numericCols);
          setTextColumns(textCols);
        }
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        alert('Error parsing CSV file. Please check the file format.');
      }
    });
  };

  const generateSampleData = () => {
    const sampleData = [
      { category: 'A', value: 400, description: 'First item' },
      { category: 'B', value: 300, description: 'Second item' },
      { category: 'C', value: 200, description: 'Third item' },
      { category: 'D', value: 278, description: 'Fourth item' },
      { category: 'E', value: 189, description: 'Fifth item' },
      { category: 'F', value: 239, description: 'Sixth item' },
      { category: 'G', value: 349, description: 'Seventh item' },
    ];

    setData(sampleData);
    setColumns(['category', 'value', 'description']);
    setNumericColumns(['value']);
    setTextColumns(['category', 'description']);
    setFileName('sample-data.csv');
  };

  const downloadSampleCSV = () => {
    const csvContent = `category,value,description
A,400,First item
B,300,Second item
C,200,Third item
D,278,Fourth item
E,189,Fifth item
F,239,Sixth item
G,349,Seventh item`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'sample-data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderChart = () => {
    if (data.length === 0) {
      return <p className="text-white/60">Upload a CSV file to see the chart</p>;
    }

    const xAxis = textColumns[0] || columns[0];
    const yAxis = numericColumns[0] || columns.find(col => !isNaN(data[0][col]));

    if (!xAxis || !yAxis) {
      return <p className="text-white/60">No suitable columns found for charting</p>;
    }

    const chartData = data.map((row, index) => ({
      ...row,
      [xAxis]: row[xAxis] || `Row ${index + 1}`,
      [yAxis]: parseFloat(row[yAxis]) || 0
    }));

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey={xAxis} stroke="#ffffff80" />
              <YAxis stroke="#ffffff80" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #ffffff20',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
              <Legend />
              <Bar dataKey={yAxis} fill={colors[0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsLineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey={xAxis} stroke="#ffffff80" />
              <YAxis stroke="#ffffff80" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #ffffff20',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey={yAxis} stroke={colors[0]} strokeWidth={2} />
            </RechartsLineChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsPieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey={yAxis}
                nameKey={xAxis}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #ffffff20',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        );

      default:
        return <p className="text-white/60">Select a chart type</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-white">Data Visualizer</h1>
            <div className="flex space-x-4">
              <button
                onClick={generateSampleData}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Load Sample Data
              </button>
              <button
                onClick={downloadSampleCSV}
                className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Sample CSV
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h2 className="text-lg font-semibold text-white mb-4">Upload Data</h2>

              {/* Drag & Drop Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                  isDragOver
                    ? 'border-blue-400 bg-blue-400/10'
                    : 'border-white/30 hover:border-white/50'
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragOver(false);
                  const files = e.dataTransfer.files;
                  if (files.length > 0) {
                    handleFileUpload(files[0]);
                  }
                }}
                onClick={() => document.getElementById('csv-file-input').click()}
              >
                <Upload className="w-8 h-8 text-white/60 mx-auto mb-2" />
                <p className="text-white/80 mb-2">Drag & drop your CSV file here</p>
                <p className="text-white/60 text-sm">or click to browse</p>
                <input
                  id="csv-file-input"
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                />
              </div>

              {fileName && (
                <div className="mt-4 p-3 bg-green-500/20 rounded-lg">
                  <p className="text-green-300 text-sm">File: {fileName}</p>
                  <p className="text-green-300 text-sm">Rows: {data.length}</p>
                </div>
              )}

              {/* Chart Type Selection */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Chart Type</h3>
                <div className="space-y-2">
                  {chartTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setChartType(type.id)}
                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                          chartType === type.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-white/10 text-white/80 hover:bg-white/20'
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {type.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h2 className="text-lg font-semibold text-white mb-4">Chart Visualization</h2>

              {/* Chart Area */}
              <div className="bg-white/5 rounded-lg p-4 mb-6 min-h-[400px] flex items-center justify-center">
                {renderChart()}
              </div>

              {/* Data Preview */}
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Data Preview</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-white/80">
                    <thead>
                      <tr className="border-b border-white/20">
                        {columns.map((col, index) => (
                          <th key={index} className="text-left py-2 px-4">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.slice(0, 5).map((row, index) => (
                        <tr key={index} className="border-b border-white/10">
                          {columns.map((col, colIndex) => (
                            <td key={colIndex} className="py-2 px-4">{row[col]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {data.length === 0 && (
                    <p className="text-white/60 text-center py-8">No data loaded yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
