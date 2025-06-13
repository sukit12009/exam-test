import { Product } from './types';

export const convertToCSV = (data: Product[]): string => {
  if (!data.length) return '';
  
  // Define headers with proper Thai labels
  const headers = [
    { key: 'id', label: 'รหัส' },
    { key: 'name', label: 'ชื่อสินค้า' },
    { key: 'price', label: 'ราคา' },
    { key: 'category', label: 'หมวดหมู่' },
    { key: 'description', label: 'คำอธิบาย' }
  ];
  
  // Create CSV content with BOM for UTF-8
  const headerRow = headers.map(h => `"${h.label}"`).join(',');
  
  const dataRows = data.map(product => 
    headers.map(header => {
      let value = product[header.key as keyof Product];
      if (value === undefined || value === null) return '';
      
      // Format ID as string by adding a tab character
      if (header.key === 'id') {
        value = `\t${value}`;
      }
      
      const stringValue = String(value).replace(/"/g, '""');
      return `"${stringValue}"`;
    }).join(',')
  );
  
  // Add BOM and join rows
  return '\uFEFF' + [headerRow, ...dataRows].join('\n');
};

export const downloadCSV = (csvContent: string, filename: string): void => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
