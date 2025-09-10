# 📊 Data Visualizer

A modern, interactive web application for visualizing CSV data through beautiful charts. Upload your CSV files and instantly transform them into insightful bar charts, line charts, and pie charts with an intuitive drag-and-drop interface.

<img width="1903" height="874" alt="image" src="https://github.com/user-attachments/assets/17d3105f-bfe6-4dd7-a865-27adbdac03b4" />


## ✨ Features

- **📁 Drag & Drop Upload** - Simply drag your CSV files into the application or click to browse
- **📊 Multiple Chart Types** - Support for bar charts, line charts, and pie charts
- **🎨 Beautiful UI** - Modern glassmorphism design with gradient backgrounds
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **⚡ Real-time Preview** - Instantly see your data visualized as you upload
- **🔍 Data Preview** - View your raw data in a clean table format
- **📥 Sample Data** - Includes sample dataset to get started quickly
- **🎯 Smart Column Detection** - Automatically identifies numeric and text columns
- **🎨 Color Coded Charts** - Beautiful color schemes for better data representation

## 🚀 Live Demo

[View Live Demo](https://data-visualizer-topaz.vercel.app/) *(Replace with your actual demo link)*

## 🛠️ Technologies Used

- **React** - Frontend framework
- **Recharts** - Chart library for data visualization
- **Papa Parse** - CSV parsing library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Vite** - Build tool and development server

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

## 🏃‍♂️ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/data-visualizer.git
   cd data-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the application running.

## 📊 Supported Chart Types

### Bar Chart
Perfect for comparing categories or showing distributions across different groups.

### Line Chart
Ideal for displaying trends over time or continuous data relationships.

### Pie Chart
Great for showing proportions and parts of a whole dataset.

## 📁 CSV File Requirements

Your CSV files should follow these guidelines for optimal results:

- **Headers Required** - First row should contain column headers
- **Mixed Data Types** - Include both text columns (for labels) and numeric columns (for values)
- **Clean Data** - Remove any special characters or formatting that might interfere with parsing
- **Size Limit** - For performance, the app displays the first 20 rows of large datasets

### Example CSV Format
```csv
category,value,description
Product A,450,Electronics
Product B,320,Clothing
Product C,280,Home & Garden
Product D,190,Sports
```

## 🎯 How to Use

1. **Upload Data**
   - Drag and drop your CSV file into the upload area, or
   - Click the upload area to browse and select a file, or
   - Use the "Load Sample Data" button to try with example data

2. **Choose Chart Type**
   - Select from Bar Chart, Line Chart, or Pie Chart
   - The chart updates automatically when you change the type

3. **View Results**
   - Your data is instantly visualized in the selected chart format
   - Preview your raw data in the table below the chart

4. **Download Sample**
   - Click "Download Sample CSV" to get a template file

## 🏗️ Project Structure

```
data-visualizer/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── App.js          # Main application component
│   ├── App.css         # Additional styles
│   ├── index.js        # Application entry point
│   └── index.css       # Global styles
├── package.json
├── tailwind.config.js
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the project**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and formatting
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature request? Please open an issue on GitHub with:

- **Bug Reports**: Steps to reproduce, expected behavior, actual behavior, screenshots if applicable
- **Feature Requests**: Clear description of the proposed feature and its benefits

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Recharts](https://recharts.org/) for the excellent charting library
- [Papa Parse](https://www.papaparse.com/) for reliable CSV parsing
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for beautiful icons



⭐ If you found this project helpful, please give it a star on GitHub!
