'use client';

import { useState, useCallback, useEffect } from 'react';
import StepIndicator from './StepIndicator';
import CableSpecStep from './CableSpecStep';
import GlandStep from './GlandStep';
import LugStep from './LugStep';
import ReviewStep from './ReviewStep';
import { DEFAULT_QUOTE_FORM, type QuoteFormState, type QuoteResult } from '@/lib/quote-types';
import { generateQuote, getQuoteOptions } from '@/lib/quote-engine';
import type { CableSpecification, LugPreference, GlandPreference } from '@/lib/quote-types';

const STEP_LABELS = ['Cable Specs', 'Glands', 'Lugs', 'Review'];

export default function QuoteWizard() {
  const [formState, setFormState] = useState<QuoteFormState>(DEFAULT_QUOTE_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const options = getQuoteOptions();

  const handleChange = useCallback(
    (field: keyof QuoteFormState, value: string | boolean) => {
      setFormState((prev) => ({ ...prev, [field]: value }));
      // Clear error when field changes
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    },
    [errors]
  );

  // Validate current step
  const validateStep = useCallback((step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formState.cableSize) {
        newErrors.cableSize = 'Please select a cable size';
      }
      if (!formState.quantity || parseInt(formState.quantity) < 1) {
        newErrors.quantity = 'Please enter a valid quantity';
      }
    }

    if (step === 4) {
      if (!formState.customerName.trim()) {
        newErrors.customerName = 'Please enter your name';
      }
      if (!formState.customerEmail.trim()) {
        newErrors.customerEmail = 'Please enter your email';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.customerEmail)) {
        newErrors.customerEmail = 'Please enter a valid email';
      }
      if (!formState.customerPhone.trim()) {
        newErrors.customerPhone = 'Please enter your phone number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formState]);

  // Generate quote when reaching step 4
  useEffect(() => {
    if (formState.step === 4 && !quote) {
      setIsGenerating(true);

      // Small delay to show loading state
      const timer = setTimeout(() => {
        const cableSpec: CableSpecification = {
          cableSize: parseFloat(formState.cableSize),
          numberOfCores: parseFloat(formState.numberOfCores) as 1 | 2 | 3 | 3.5 | 4,
          conductorType: formState.conductorType as 'round' | 'sector',
          material: formState.material as 'copper' | 'aluminium' | 'bimetallic',
          quantity: parseInt(formState.quantity),
          application: formState.application || undefined,
        };

        const lugPref: LugPreference = {
          type: formState.lugType as 'ring' | 'pin' | 'fork' | 'tube-terminal',
          insulated: formState.lugInsulated,
          holeSize: formState.holeSize ? parseFloat(formState.holeSize) : undefined,
          barrelType: formState.barrelType as 'short' | 'long' | 'medium' | undefined,
        };

        const glandPref: GlandPreference = {
          needed: formState.needsGland,
          material: formState.glandMaterial as 'brass' | 'ss316' | 'nylon' | undefined,
          type: formState.glandType as 'weather-proof' | 'flame-proof' | undefined,
          cableOD: formState.cableOD ? parseFloat(formState.cableOD) : undefined,
        };

        const result = generateQuote(cableSpec, lugPref, glandPref);
        setQuote(result);
        setIsGenerating(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [formState.step, quote, formState]);

  const handleNext = useCallback(() => {
    if (!validateStep(formState.step)) return;

    if (formState.step < 4) {
      // Clear quote when going back through steps
      setQuote(null);
      setFormState((prev) => ({ ...prev, step: (prev.step + 1) as 1 | 2 | 3 | 4 }));
    }
  }, [formState.step, validateStep]);

  const handlePrev = useCallback(() => {
    if (formState.step > 1) {
      setQuote(null);
      setFormState((prev) => ({ ...prev, step: (prev.step - 1) as 1 | 2 | 3 | 4 }));
    }
  }, [formState.step]);

  const handleSubmit = useCallback(async () => {
    if (!validateStep(4) || !quote) return;

    setIsSubmitting(true);

    // Simulate form submission (in production, send to API)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Update quote with customer info
    const finalQuote: QuoteResult = {
      ...quote,
      customerName: formState.customerName,
      customerEmail: formState.customerEmail,
      customerPhone: formState.customerPhone,
      customerCompany: formState.customerCompany,
    };

    console.log('Quote submitted:', finalQuote);
    setIsSubmitting(false);
    setSubmitSuccess(true);
  }, [quote, formState, validateStep]);

  const handleReset = useCallback(() => {
    setFormState(DEFAULT_QUOTE_FORM);
    setQuote(null);
    setErrors({});
    setSubmitSuccess(false);
  }, []);

  // Success state
  if (submitSuccess && quote) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Quote Request Submitted!
        </h2>
        <p className="text-gray-600 mb-4">
          Your quote reference number is:{' '}
          <span className="font-mono font-bold text-primary-700">
            {quote.referenceNumber}
          </span>
        </p>
        <p className="text-gray-600 mb-8">
          Our team will review your requirements and contact you at{' '}
          <strong>{formState.customerEmail}</strong> with final pricing.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Create Another Quote
          </button>
          <a
            href="/products"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Browse Products
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <StepIndicator
        currentStep={formState.step}
        totalSteps={4}
        stepLabels={STEP_LABELS}
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        {formState.step === 1 && (
          <CableSpecStep
            formState={formState}
            options={options}
            onChange={handleChange}
            errors={errors}
          />
        )}

        {formState.step === 2 && (
          <GlandStep
            formState={formState}
            options={options}
            onChange={handleChange}
            errors={errors}
          />
        )}

        {formState.step === 3 && (
          <LugStep
            formState={formState}
            options={options}
            onChange={handleChange}
            errors={errors}
          />
        )}

        {formState.step === 4 && (
          <ReviewStep
            formState={formState}
            quote={quote}
            onChange={handleChange}
            errors={errors}
            isGenerating={isGenerating}
          />
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handlePrev}
            disabled={formState.step === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              formState.step === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Previous
          </button>

          {formState.step < 4 ? (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || isGenerating || !quote}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                isSubmitting || isGenerating || !quote
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-accent-500 text-white hover:bg-accent-600'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Quote Request'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
