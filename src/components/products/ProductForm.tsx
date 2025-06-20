import { useState } from 'react';
import { Product } from '../../hooks/useProducts';

interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (data: Omit<Product, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const categories = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Kitchen',
  'Sports',
  'Other'
];

const ProductForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  isSubmitting,
}: ProductFormProps) => {
  const [formData, setFormData] = useState<Omit<Product, 'id' | 'createdAt'>>({
    name: initialData.name || '',
    price: initialData.price || 0,
    description: initialData.description || '',
    category: initialData.category || categories[0],
    image: initialData.image || '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: Omit<Product, 'id' | 'createdAt'>) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 transition-colors duration-200"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Price (฿) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 transition-colors duration-200"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 transition-colors duration-200"
            required
          >
            {categories.map(category => (
              <option 
                key={category} 
                value={category}
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 transition-colors duration-200"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Image URL
        </label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 transition-colors duration-200"
        />
        {formData.image && (
          <div className="mt-2">
            <img
              src={formData.image}
              alt="Preview"
              className="h-32 w-32 object-cover rounded border border-gray-200 dark:border-gray-600"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
