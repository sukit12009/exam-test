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
      className={`flex items-center px-4 py-2 border-b border-gray-100 transition-colors duration-200 
        ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} 
        hover:bg-blue-50 hover:text-blue-600 cursor-pointer`}
    >
      <span className="inline-flex items-center justify-center min-w-[28px] h-7 mr-3 text-xs font-medium text-white bg-blue-500 rounded-full px-1.5">
        {index + 1}
      </span>
      <span className="text-gray-800 truncate">
        {data[index]}
      </span>
    </div>
  );

  return (
    <div className="overflow-hidden rounded-lg shadow-sm border border-gray-200 bg-white">
      <List
        height={height}
        itemCount={data.length}
        itemSize={itemHeight}
        width={width}
        className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      >
        {Row}
      </List>
    </div>
  );
};

export default VirtualizedList;
