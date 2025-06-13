import VirtualizedList from '../components/VirtualizedList';

const VirtualizedListPage = () => {
  // สร้างข้อมูลจำลอง 100,000 รายการ
  const data = Array.from({ length: 100000 }, (_, i) => `รายการที่ ${i + 1}`);

  return (
   
      <div >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">รายการทั้งหมด</h2>
          <p className="text-gray-600">
            แสดงผลทั้งหมด <span className="font-medium text-blue-600">{data.length.toLocaleString()}</span> รายการ
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-2">
          <VirtualizedList data={data} height={600} />
        </div>
      </div>
   
  );
};

export default VirtualizedListPage;
