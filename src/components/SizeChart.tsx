import React, { useState } from 'react';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';

interface SizeChartProps {
  sizeChart?: {
    _id: string;
    name: string;
    description?: string;
    sizeType: 'numeric' | 'alphabetic' | 'custom';
    sizes: Array<{
      size: string;
      measurements: {
        bust?: string;
        waist?: string;
        hips?: string;
        shoulder?: string;
        sleeveLength?: string;
        length?: string;
        custom?: Record<string, string>;
      };
    }>;
    imageUrl?: string;
    imageAltText?: string;
    isActive: boolean;
  };
  availableSizes?: string[];
}

const SizeChart: React.FC<SizeChartProps> = ({ sizeChart, availableSizes = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!sizeChart) {
    return null;
  }

  return (
    <>
      {/* Size Chart Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-sm text-blue-600 hover:text-blue-800 underline"
      >
        View Size Chart
      </button>

      {/* Size Chart Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{sizeChart.name}</h2>
                {sizeChart.description && (
                  <p className="text-gray-600 mt-1">{sizeChart.description}</p>
                )}
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Size Chart Image */}
              {sizeChart.imageUrl && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <PhotoIcon className="h-5 w-5 text-gray-500" />
                    <h3 className="text-lg font-semibold text-gray-900">Size Guide</h3>
                  </div>
                  <div className="flex justify-center">
                    <img
                      src={sizeChart.imageUrl}
                      alt={sizeChart.imageAltText || 'Size chart'}
                      className="max-w-full h-auto rounded-lg border border-gray-200 shadow-sm"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden text-center text-gray-500 py-8">
                      <PhotoIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                      <p>Size chart image not available</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Size Table */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Measurements</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Size
                        </th>
                        {sizeChart.sizes[0]?.measurements.bust && (
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Bust
                          </th>
                        )}
                        {sizeChart.sizes[0]?.measurements.waist && (
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Waist
                          </th>
                        )}
                        {sizeChart.sizes[0]?.measurements.hips && (
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Hips
                          </th>
                        )}
                        {sizeChart.sizes[0]?.measurements.shoulder && (
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Shoulder
                          </th>
                        )}
                        {sizeChart.sizes[0]?.measurements.sleeveLength && (
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sleeve Length
                          </th>
                        )}
                        {sizeChart.sizes[0]?.measurements.length && (
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Length
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sizeChart.sizes.map((size, index) => (
                        <tr key={index} className={availableSizes.includes(size.size) ? 'bg-blue-50' : ''}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {size.size}
                            {availableSizes.includes(size.size) && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Available
                              </span>
                            )}
                          </td>
                          {sizeChart.sizes[0]?.measurements.bust && (
                            <td className="px-4 py-3 text-sm text-gray-500">
                              {size.measurements.bust || '-'}
                            </td>
                          )}
                          {sizeChart.sizes[0]?.measurements.waist && (
                            <td className="px-4 py-3 text-sm text-gray-500">
                              {size.measurements.waist || '-'}
                            </td>
                          )}
                          {sizeChart.sizes[0]?.measurements.hips && (
                            <td className="px-4 py-3 text-sm text-gray-500">
                              {size.measurements.hips || '-'}
                            </td>
                          )}
                          {sizeChart.sizes[0]?.measurements.shoulder && (
                            <td className="px-4 py-3 text-sm text-gray-500">
                              {size.measurements.shoulder || '-'}
                            </td>
                          )}
                          {sizeChart.sizes[0]?.measurements.sleeveLength && (
                            <td className="px-4 py-3 text-sm text-gray-500">
                              {size.measurements.sleeveLength || '-'}
                            </td>
                          )}
                          {sizeChart.sizes[0]?.measurements.length && (
                            <td className="px-4 py-3 text-sm text-gray-500">
                              {size.measurements.length || '-'}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Custom Measurements */}
              {sizeChart.sizes.some(size => size.measurements.custom && Object.keys(size.measurements.custom).length > 0) && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Measurements</h3>
                  <div className="space-y-4">
                    {sizeChart.sizes.map((size, index) => (
                      size.measurements.custom && Object.keys(size.measurements.custom).length > 0 && (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">Size {size.size}</h4>
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(size.measurements.custom).map(([key, value]) => (
                              <div key={key}>
                                <span className="text-sm font-medium text-gray-700 capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                                </span>
                                <span className="ml-2 text-sm text-gray-600">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* Size Guide Tips */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Size Guide Tips</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Measure yourself with a flexible measuring tape</li>
                  <li>• Take measurements over undergarments</li>
                  <li>• Keep the tape snug but not tight</li>
                  <li>• If between sizes, we recommend sizing up</li>
                  <li>• Different brands may have slight variations</li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SizeChart;
