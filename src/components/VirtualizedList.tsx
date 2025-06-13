import React from 'react';
import { FixedSizeList as List } from 'react-window';

type VirtualizedListProps = {
  data: string[];
  height?: number;
  width?: number | string;
  itemHeight?: number;
};

const VirtualizedList: React.FC<VirtualizedListProps> = ({
  data,
  height = 500,
  width = '100%',
  itemHeight = 48, // Slightly increased for better touch targets
}) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div 
      style={style}
      className={`flex items-center px-4 py-2 border-b transition-colors duration-200 
        ${index % 2 === 0 
          ? 'bg-white dark:bg-gray-800' 
          : 'bg-gray-50 dark:bg-gray-700/50'} 
        border-gray-100 dark:border-gray-700
        hover:bg-blue-50 dark:hover:bg-blue-900/30 
        hover:text-blue-600 dark:hover:text-blue-400 
        cursor-pointer`}
    >
      <span className="inline-flex items-center justify-center min-w-[28px] h-7 mr-3 text-xs font-medium 
        text-white bg-blue-500 dark:bg-blue-600 rounded-full px-1.5">
        {index + 1}
      </span>
      <span className="text-gray-800 dark:text-gray-200 truncate">
        {data[index].replace(/\d+/g, num => parseInt(num).toLocaleString())}
      </span>
    </div>
  );

  return (
    <div className="overflow-hidden rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-200">
      <List
        height={height}
        itemCount={data.length}
        itemSize={itemHeight}
        width={width}
        className="scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800"
      >
        {Row}
      </List>
    </div>
  );
};

export default VirtualizedList;
