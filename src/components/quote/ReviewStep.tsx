'use client';

import type { QuoteFormState, QuoteResult } from '@/lib/quote-types';
import { formatPrice } from '@/lib/products';

interface ReviewStepProps {
  formState: QuoteFormState;
  quote: QuoteResult | null;
  onChange: (field: keyof QuoteFormState, value: string | boolean) => void;
  errors: Record<string, string>;
  isGenerating: boolean;
}

export default function ReviewStep({
  formState,
  quote,
  onChange,
  errors,
  isGenerating,
}: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Review & Contact Details
        </h2>
        <p className="text-gray-600">
          Review your selections and provide your contact information to receive the quote.
        </p>
      </div>

      {/* Quote Summary */}
      {quote && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-primary-700 text-white px-6 py-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Quote Summary</h3>
              <span className="text-sm bg-white/20 px-3 py-1 rounded">
                Ref: {quote.referenceNumber}
              </span>
            </div>
          </div>

          {/* Cable Spec Summary */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h4 className="font-medium text-gray-900 mb-2">Cable Specifications</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Size:</span>
                <span className="ml-1 font-medium">{quote.cableSpec.cableSize} sq mm</span>
              </div>
              <div>
                <span className="text-gray-500">Cores:</span>
                <span className="ml-1 font-medium">{quote.cableSpec.numberOfCores}</span>
              </div>
              <div>
                <span className="text-gray-500">Material:</span>
                <span className="ml-1 font-medium capitalize">{quote.cableSpec.material}</span>
              </div>
              <div>
                <span className="text-gray-500">Quantity:</span>
                <span className="ml-1 font-medium">{quote.cableSpec.quantity}</span>
              </div>
            </div>
          </div>

          {/* Calculation Breakdown */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Calculation Breakdown</h4>
            <div className="bg-blue-50 rounded-lg p-3 text-sm">
              <p className="text-blue-800 font-medium mb-1">
                {quote.coreMultiplierExplanation}
              </p>
              <ul className="text-blue-700 space-y-1">
                {quote.calculationBreakdown.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Line Items */}
          <div className="px-6 py-4">
            <h4 className="font-medium text-gray-900 mb-3">Line Items</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 font-medium text-gray-600">Product</th>
                    <th className="text-left py-2 font-medium text-gray-600">Catalog No.</th>
                    <th className="text-right py-2 font-medium text-gray-600">Qty</th>
                    <th className="text-right py-2 font-medium text-gray-600">Unit Price</th>
                    <th className="text-right py-2 font-medium text-gray-600">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {quote.lineItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="py-3">
                        <div>
                          <p className="font-medium text-gray-900">{item.description}</p>
                          <p className="text-xs text-gray-500">{item.specification}</p>
                          {item.notes && item.notes.length > 0 && (
                            <div className="mt-1">
                              {item.notes.map((note, i) => (
                                <p key={i} className="text-xs text-amber-600">{note}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 font-mono text-gray-700">{item.catalogNo}</td>
                      <td className="py-3 text-right">{item.quantity}</td>
                      <td className="py-3 text-right">{formatPrice(item.unitPrice)}</td>
                      <td className="py-3 text-right font-medium">{formatPrice(item.totalPrice)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="py-3 text-right font-semibold">
                      Subtotal (List Price)
                    </td>
                    <td className="py-3 text-right font-bold text-primary-700">
                      {formatPrice(quote.subtotal)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Notes */}
          {quote.notes.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
              <ul className="space-y-2">
                {quote.notes.map((note, i) => (
                  <li
                    key={i}
                    className={`flex items-start text-sm ${
                      note.type === 'warning'
                        ? 'text-amber-700'
                        : note.type === 'error'
                        ? 'text-red-700'
                        : 'text-gray-600'
                    }`}
                  >
                    <span className="mr-2">
                      {note.type === 'warning' && '⚠️'}
                      {note.type === 'error' && '❌'}
                      {note.type === 'info' && 'ℹ️'}
                    </span>
                    {note.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {isGenerating && (
        <div className="bg-gray-50 rounded-xl p-8 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Generating your quote...</p>
        </div>
      )}

      {/* Contact Information */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
        <p className="text-sm text-gray-600 mb-4">
          Provide your details and our team will review the quote and contact you with final pricing.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="customerName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="customerName"
              value={formState.customerName}
              onChange={(e) => onChange('customerName', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.customerName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Your full name"
            />
            {errors.customerName && (
              <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="customerCompany"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Company
            </label>
            <input
              type="text"
              id="customerCompany"
              value={formState.customerCompany}
              onChange={(e) => onChange('customerCompany', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Your company name"
            />
          </div>

          <div>
            <label
              htmlFor="customerEmail"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="customerEmail"
              value={formState.customerEmail}
              onChange={(e) => onChange('customerEmail', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.customerEmail ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="your@email.com"
            />
            {errors.customerEmail && (
              <p className="mt-1 text-sm text-red-600">{errors.customerEmail}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="customerPhone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="customerPhone"
              value={formState.customerPhone}
              onChange={(e) => onChange('customerPhone', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.customerPhone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+91 XXXXX XXXXX"
            />
            {errors.customerPhone && (
              <p className="mt-1 text-sm text-red-600">{errors.customerPhone}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label
            htmlFor="additionalNotes"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Additional Notes
          </label>
          <textarea
            id="additionalNotes"
            value={formState.additionalNotes}
            onChange={(e) => onChange('additionalNotes', e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Any special requirements or questions..."
          />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <p>
          <strong>Note:</strong> This is an automated quote based on list prices.
          Final pricing will be confirmed by our team and may include discounts
          for bulk orders. Prices are subject to change without notice.
        </p>
      </div>
    </div>
  );
}
