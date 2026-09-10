'use client';

import { useState } from 'react';
import { XCircle, CheckCircle2 } from 'lucide-react';

export default function ExchangerComparisonTabs() {
  const [activeTab, setActiveTab] = useState<'phe' | 'she'>('phe');

  return (
    <section className="exchanger-tabs" aria-label="Heat Exchanger Comparison">
      <div className="container">
        <div className="tabs-header">
          <h2>System Comparison</h2>
          <div className="tab-controls" role="tablist" aria-label="System Type">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'phe'}
              className={`tab-btn ${activeTab === 'phe' ? 'active' : ''}`}
              onClick={() => setActiveTab('phe')}
            >
              Plate Exchanger (PHE)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'she'}
              className={`tab-btn ${activeTab === 'she' ? 'active' : ''}`}
              onClick={() => setActiveTab('she')}
            >
              Spiral Exchanger (SHE)
            </button>
          </div>
        </div>

        <div className="tab-content">
          {activeTab === 'phe' && (
            <div className="tab-pane active" id="phe" role="tabpanel">
              <div className="comparison-grid">
                <div className="comp-image">
                  <img
                    src="/comp-phe.png"
                    alt="Plate Heat Exchanger"
                    loading="lazy"
                  />
                </div>
                <div className="comp-list">
                  <div className="comp-item negative">
                    <XCircle size={22} className="shrink-0" />
                    <span>Requires frequent gasket replacement</span>
                  </div>
                  <div className="comp-item negative">
                    <XCircle size={22} className="shrink-0" />
                    <span>Prone to scaling and clogging</span>
                  </div>
                  <div className="comp-item negative">
                    <XCircle size={22} className="shrink-0" />
                    <span>Significant heat loss from edges</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'she' && (
            <div className="tab-pane active" id="she" role="tabpanel">
              <div className="comparison-grid">
                <div className="comp-image">
                  <img
                    src="/comp-she.png"
                    alt="Spiral Heat Exchanger"
                    loading="lazy"
                  />
                </div>
                <div className="comp-list">
                  <div className="comp-item positive">
                    <CheckCircle2 size={22} className="shrink-0" />
                    <span>Gasket-free all-welded construction</span>
                  </div>
                  <div className="comp-item positive">
                    <CheckCircle2 size={22} className="shrink-0" />
                    <span>Self-cleaning turbulent flow</span>
                  </div>
                  <div className="comp-item positive">
                    <CheckCircle2 size={22} className="shrink-0" />
                    <span>97% volume efficiency</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
