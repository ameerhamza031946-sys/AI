const xlsx = require('xlsx');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

/**
 * Parse uploaded file into a unified JSON array
 */
async function parseFile(filePath, mimeType, originalName) {
  const ext = path.extname(originalName).toLowerCase();

  if (ext === '.csv') {
    return parseCSV(filePath);
  } else if (ext === '.xlsx' || ext === '.xls') {
    return parseExcel(filePath);
  } else if (ext === '.json') {
    return parseJSON(filePath);
  } else {
    throw new Error(`Unsupported file format: ${ext}`);
  }
}

function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

function parseExcel(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);
  return Promise.resolve(data);
}

function parseJSON(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const parsed = JSON.parse(content);
  const data = Array.isArray(parsed) ? parsed : [parsed];
  return Promise.resolve(data);
}

/**
 * Compute summary statistics for a dataset
 */
function computeStats(data) {
  if (!data || data.length === 0) return {};

  const columns = Object.keys(data[0]);
  const stats = { rowCount: data.length, columnCount: columns.length, columns: {} };

  columns.forEach((col) => {
    const values = data.map((row) => row[col]).filter((v) => v !== null && v !== undefined && v !== '');
    const numericValues = values.map(Number).filter((v) => !isNaN(v));

    if (numericValues.length > 0) {
      const sum = numericValues.reduce((a, b) => a + b, 0);
      const mean = sum / numericValues.length;
      const sorted = [...numericValues].sort((a, b) => a - b);
      stats.columns[col] = {
        type: 'numeric',
        count: numericValues.length,
        min: sorted[0],
        max: sorted[sorted.length - 1],
        mean: parseFloat(mean.toFixed(2)),
        median: sorted[Math.floor(sorted.length / 2)],
        missing: data.length - values.length,
      };
    } else {
      const uniqueValues = [...new Set(values)];
      stats.columns[col] = {
        type: 'categorical',
        count: values.length,
        unique: uniqueValues.length,
        topValues: uniqueValues.slice(0, 5),
        missing: data.length - values.length,
      };
    }
  });

  return stats;
}

module.exports = { parseFile, computeStats };
