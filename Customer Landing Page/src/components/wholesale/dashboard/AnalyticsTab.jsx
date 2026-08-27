import React, { useState } from 'react';
import {
  TrendingUp, Download, RefreshCw, Calendar, Share2, FileSpreadsheet,
  FileText, FileCode, Presentation, Printer, Mail, Sparkles, X, ChevronDown,
  ArrowUpRight, ArrowDownRight, Info, Maximize2, MoreVertical, SlidersHorizontal,
  BarChart3, PieChart, ShieldCheck, Settings, ShoppingBag, Users, DollarSign,
  RotateCcw, Target, Copy, Check, ExternalLink, Filter
} from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';
import saathAppLogo from '../../../assets/saathapp-logo.png';

export default function AnalyticsTab() {
  const { addToast, formData } = useWholesale ? useWholesale() : { addToast: console.log, formData: {} };

  const [activeAnalyticsTab, setActiveAnalyticsTab] = useState('Overview');
  const [dateRange, setDateRange] = useState('1 Aug – 31 Aug 2026');
  const [compareRange, setCompareRange] = useState('1 Jul – 31 Jul 2026');
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Active Modals State
  const [activeModal, setActiveModal] = useState(null); // 'schedule', 'share', 'categories', 'products', 'states', 'aiInsights'
  const [isCopied, setIsCopied] = useState(false);
  const [scheduleEmail, setScheduleEmail] = useState(formData?.email || '');
  const [scheduleFrequency, setScheduleFrequency] = useState('weekly');

  // Report Settings Modal State (PDF Page 25)
  const [reportConfig, setReportConfig] = useState({
    format: 'pdf',
    dateRange: 'Last 30 Days',
    includeCharts: true,
    includeTables: true,
    includeSummary: true,
    includeLogo: true,
    includeWatermark: true,
    orientation: 'portrait',
    fileName: 'Analytics_Report',
  });

  const handleOpenExportModal = (formatType) => {
    setReportConfig((prev) => ({
      ...prev,
      format: formatType,
      fileName: `SaathApp_Wholesale_${formatType.toUpperCase()}_Report_${new Date().toISOString().slice(0, 10)}`,
    }));
    setIsExportDropdownOpen(false);
    setIsReportModalOpen(true);
  };

  // 1. PDF REPORT GENERATOR WITH OFFICIAL LOGO (PDF Page 23)
  const generatePdfReport = (config) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      addToast?.('Please allow popups to generate PDF report', 'warning');
      return;
    }

    const sellerName = formData?.businessName || formData?.fullName || "Wholesale Partner";
    const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${config.fileName}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; padding: 40px; color: #0f172a; line-height: 1.5; background: #fff; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #00986C; padding-bottom: 20px; margin-bottom: 30px; }
          .logo-container { display: flex; items-center; gap: 14px; }
          .logo-img { height: 50px; object-fit: contain; }
          .brand-title { font-size: 22px; font-weight: 900; color: #00986C; letter-spacing: -0.5px; }
          .report-name { font-size: 18px; font-weight: 800; color: #0f172a; margin-top: 2px; }
          .meta-box { text-align: right; font-size: 12px; color: #475569; }
          .section-heading { font-size: 13px; font-weight: 800; text-transform: uppercase; color: #00986C; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 6px; margin: 25px 0 15px 0; }
          .kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
          .kpi-card { border: 1px solid #cbd5e1; padding: 14px; border-radius: 12px; background: #f8fafc; }
          .kpi-title { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; }
          .kpi-val { font-size: 22px; font-weight: 900; color: #0f172a; margin: 4px 0; }
          .kpi-growth { font-size: 11px; font-weight: 800; color: #00986C; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
          th, td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #e2e8f0; }
          th { background: #f1f5f9; font-weight: 800; color: #475569; text-transform: uppercase; font-size: 10px; }
          .text-right { text-align: right; }
          .footer { margin-top: 40px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo-container">
            <img src="${window.location.origin}/src/assets/saathapp-logo.png" class="logo-img" alt="SaathApp Logo" onerror="this.style.display='none'" />
            <div>
              <div class="brand-title">SaathApp Wholesale</div>
              <div class="report-name">Analytics & Performance Report</div>
              <div style="font-size: 12px; color: #64748b; margin-top: 2px;">Seller Name: <strong>${sellerName}</strong></div>
            </div>
          </div>
          <div class="meta-box">
            <div><strong>Date Range:</strong> ${config.dateRange}</div>
            <div><strong>Generated Date:</strong> ${dateStr}</div>
            <div><strong>Status:</strong> Verified Final</div>
          </div>
        </div>

        ${config.includeSummary ? `
        <div class="section-heading">1. KPI Summary</div>
        <div class="kpi-grid">
          <div class="kpi-card"><div class="kpi-title">Total GMV</div><div class="kpi-val">₹28.4L</div><div class="kpi-growth">↑ +28.5% vs Jul</div></div>
          <div class="kpi-card"><div class="kpi-title">Total Orders</div><div class="kpi-val">1,248</div><div class="kpi-growth">↑ +16.3% vs Jul</div></div>
          <div class="kpi-card"><div class="kpi-title">Active Buyers</div><div class="kpi-val">850</div><div class="kpi-growth">↑ +18.2% vs Jul</div></div>
          <div class="kpi-card"><div class="kpi-title">Avg. Order Value</div><div class="kpi-val">₹3,450</div><div class="kpi-growth">↑ +12.7% vs Jul</div></div>
          <div class="kpi-card"><div class="kpi-title">Return Rate</div><div class="kpi-val">1.24%</div><div class="kpi-growth" style="color: #f43f5e;">↓ -0.35% vs Jul</div></div>
          <div class="kpi-card"><div class="kpi-title">Conversion Rate</div><div class="kpi-val">8.62%</div><div class="kpi-growth">↑ +0.92% vs Jul</div></div>
        </div>
        ` : ''}

        ${config.includeCharts ? `
        <div class="section-heading">2. Quarterly GMV & Active Buyer Growth Summary</div>
        <table>
          <thead>
            <tr>
              <th>Quarter / Month</th>
              <th class="text-right">Quarterly GMV</th>
              <th class="text-right">Active Buyers</th>
              <th class="text-right">YoY Trajectory</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Q1 2026 (May)</td><td class="text-right">₹28.4L</td><td class="text-right">450</td><td class="text-right" style="color: #00986C; font-weight:700;">+21.2%</td></tr>
            <tr><td>Q2 2026 (Jun)</td><td class="text-right">₹34.2L</td><td class="text-right">580</td><td class="text-right" style="color: #00986C; font-weight:700;">+24.0%</td></tr>
            <tr><td>Q3 2026 (Jul)</td><td class="text-right">₹42.8L</td><td class="text-right">720</td><td class="text-right" style="color: #00986C; font-weight:700;">+28.5%</td></tr>
            <tr><td>Q4 2026 (Est / Aug)</td><td class="text-right">₹50.0L</td><td class="text-right">850</td><td class="text-right" style="color: #00986C; font-weight:700;">+32.1%</td></tr>
          </tbody>
        </table>
        ` : ''}

        ${config.includeTables ? `
        <div class="section-heading">3. Top Performing Categories & Products</div>
        <table>
          <thead>
            <tr>
              <th>Category Name</th>
              <th class="text-right">Orders</th>
              <th class="text-right">GMV Volume</th>
              <th class="text-right">Growth Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Construction & Materials</td><td class="text-right">385</td><td class="text-right">₹8.6L</td><td class="text-right" style="color: #00986C; font-weight:700;">+24.5%</td></tr>
            <tr><td>Electricals & Lighting</td><td class="text-right">284</td><td class="text-right">₹6.2L</td><td class="text-right" style="color: #00986C; font-weight:700;">+18.3%</td></tr>
            <tr><td>FMCG & Personal Care</td><td class="text-right">246</td><td class="text-right">₹4.8L</td><td class="text-right" style="color: #00986C; font-weight:700;">+14.9%</td></tr>
            <tr><td>Packaging & Supplies</td><td class="text-right">198</td><td class="text-right">₹3.6L</td><td class="text-right" style="color: #00986C; font-weight:700;">+12.1%</td></tr>
            <tr><td>Hardware & Tools</td><td class="text-right">135</td><td class="text-right">₹2.1L</td><td class="text-right" style="color: #00986C; font-weight:700;">+10.7%</td></tr>
          </tbody>
        </table>
        ` : ''}

        <div class="footer">
          SaathApp Wholesale Confidential & Proprietary Report • Generated on ${dateStr} • Page 1 of 1
        </div>

        <script>
          setTimeout(() => { window.print(); }, 500);
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  // 2. EXCEL REPORT GENERATOR (PDF Page 23)
  const generateExcelReport = (config) => {
    let csv = "\uFEFF"; // UTF-8 BOM
    const dateStr = new Date().toLocaleDateString('en-IN');
    const seller = formData?.businessName || "SaathApp Wholesale Partner";

    csv += `=======================================================\r\n`;
    csv += `SAATHAPP WHOLESALE ANALYTICS MULTI-SHEET REPORT\r\n`;
    csv += `Seller: ${seller} | Date Range: ${config.dateRange} | Generated: ${dateStr}\r\n`;
    csv += `=======================================================\r\n\r\n`;

    csv += `--- SHEET 1: DASHBOARD OVERVIEW ---\r\n`;
    csv += `Metric,Value,Growth\r\n`;
    csv += `Total GMV,₹28.4L,+28.5%\r\n`;
    csv += `Total Orders,1248,+16.3%\r\n`;
    csv += `Active Buyers,850,+18.2%\r\n`;
    csv += `Avg Order Value,₹3450,+12.7%\r\n`;
    csv += `Return Rate,1.24%,-0.35%\r\n`;
    csv += `Conversion Rate,8.62%,+0.92%\r\n\r\n`;

    csv += `--- SHEET 2: REVENUE ---\r\n`;
    csv += `Quarter,Revenue (GMV),Target GMV,Growth Rate\r\n`;
    csv += `Q1 2026,₹28.4L,₹25.0L,+21.2%\r\n`;
    csv += `Q2 2026,₹34.2L,₹30.0L,+24.0%\r\n`;
    csv += `Q3 2026,₹42.8L,₹40.0L,+28.5%\r\n`;
    csv += `Q4 2026 (Est),₹50.0L,₹48.0L,+32.1%\r\n\r\n`;

    csv += `--- SHEET 3: ORDERS ---\r\n`;
    csv += `Status,Order Count,GMV Value,Fulfillment Rate\r\n`;
    csv += `Delivered,1020,₹23.2L,98.5%\r\n`;
    csv += `In Transit,150,₹3.8L,100%\r\n`;
    csv += `Processing,50,₹1.1L,95.0%\r\n`;
    csv += `Returned,28,₹0.3L,1.24%\r\n\r\n`;

    csv += `--- SHEET 4: PRODUCTS ---\r\n`;
    csv += `Product Name,SKU ID,Category,Orders,GMV\r\n`;
    csv += `Tata Salt 1kg Pack (Case of 24),SKU-1001,FMCG & Personal Care,120,₹1.45L\r\n`;
    csv += `Fortune Sunflower Oil 15L Tin,SKU-1002,FMCG & Personal Care,98,₹1.28L\r\n`;
    csv += `Cement 50kg PPC Bag,SKU-1003,Construction & Materials,85,₹1.05L\r\n`;
    csv += `Havells Modular Switch 6A,SKU-1004,Electricals & Lighting,72,₹0.86L\r\n`;
    csv += `Basmati Rice 25kg Bag,SKU-1005,FMCG & Personal Care,65,₹0.74L\r\n\r\n`;

    csv += `--- SHEET 5: BUYERS ---\r\n`;
    csv += `Buyer Tier,Active Count,AOV,Total Volume\r\n`;
    csv += `Enterprise Buyers,120,₹12500,₹15.0L\r\n`;
    csv += `Wholesale Stockists,350,₹3200,₹11.2L\r\n`;
    csv += `Retail Outlets,380,₹580,₹2.2L\r\n\r\n`;

    csv += `--- SHEET 6: INVENTORY ---\r\n`;
    csv += `Warehouse Location,Total Units,Reserved Units,Available Units\r\n`;
    csv += `Delhi NCR Hub,450,30,420\r\n`;
    csv += `Mumbai Express Depot,623,120,503\r\n`;
    csv += `Bangalore Hub,820,50,770\r\n\r\n`;

    csv += `--- SHEET 7: WAREHOUSES ---\r\n`;
    csv += `Warehouse Name,Manager,Capacity Utilized,Status\r\n`;
    csv += `Delhi NCR Depot,Ramesh Kumar,82%,Active\r\n`;
    csv += `Mumbai Express,Suresh Patil,75%,Active\r\n\r\n`;

    csv += `--- SHEET 8: GST SUMMARY ---\r\n`;
    csv += `Tax Period,Taxable Amount,CGST (9%),SGST (9%),IGST (18%),Total GST\r\n`;
    csv += `August 2026,₹24.06L,₹1.08L,₹1.08L,₹2.18L,₹4.34L\r\n\r\n`;

    csv += `--- SHEET 9: PAYMENTS ---\r\n`;
    csv += `Payment Method,Settled Amount,Pending Settlement,Escrow Status\r\n`;
    csv += `HDFC Bank Payout,₹22.5L,₹25000,Verified\r\n`;
    csv += `ICICI Bank Escrow,₹5.9L,₹0,Verified\r\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${config.fileName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 3. WORD REPORT GENERATOR (PDF Page 24)
  const generateWordReport = (config) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const sellerName = formData?.businessName || "SaathApp Wholesale Partner";
    const dateStr = new Date().toLocaleDateString('en-IN');

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${config.fileName}</title>
        <style>
          body { font-family: 'Georgia', serif; padding: 40px; color: #1e293b; line-height: 1.6; }
          h1 { color: #00986C; font-size: 26px; border-bottom: 2px solid #00986C; padding-bottom: 8px; }
          h2 { color: #0f172a; font-size: 18px; margin-top: 30px; font-weight: 700; }
          .meta { font-style: italic; color: #64748b; margin-bottom: 20px; }
          .box { background: #f8fafc; border-left: 4px solid #00986C; padding: 15px; margin: 15px 0; font-size: 13px; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 12px; }
          th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
          th { background: #e2e8f0; font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>SaathApp Wholesale Executive Performance Report</h1>
        <div class="meta">Prepared for: ${sellerName} | Date: ${dateStr} | Period: ${config.dateRange}</div>

        <h2>1. Executive Summary</h2>
        <div class="box">
          August 2026 wholesale performance achieved strong momentum with Gross Merchandise Value (GMV) growing by <strong>+28.5% YoY</strong> to reach <strong>₹28.4L</strong> across 1,248 completed orders.
        </div>

        <h2>2. Business Performance & KPIs</h2>
        <table>
          <thead><tr><th>KPI Metric</th><th>Current Period</th><th>Prior Period</th><th>Growth</th></tr></thead>
          <tbody>
            <tr><td>Total GMV</td><td>₹28.4L</td><td>₹22.1L</td><td>+28.5%</td></tr>
            <tr><td>Total Orders</td><td>1,248</td><td>1,073</td><td>+16.3%</td></tr>
            <tr><td>Active Buyers</td><td>850</td><td>719</td><td>+18.2%</td></tr>
            <tr><td>Average Order Value</td><td>₹3,450</td><td>₹3,061</td><td>+12.7%</td></tr>
            <tr><td>Return Rate</td><td>1.24%</td><td>1.59%</td><td>-0.35%</td></tr>
          </tbody>
        </table>

        <h2>3. Charts & Analytics Trajectory</h2>
        <p>Quarterly GMV showed consistent compounding quarterly growth: Q1 (₹28.4L), Q2 (₹34.2L), Q3 (₹42.8L), Q4 Estimated (₹50.0L).</p>

        <h2>4. Data Tables (Categories & Products)</h2>
        <p>Top category Construction & Materials generated ₹8.6L (+24.5% growth). Top selling product Tata Salt 1kg Pack recorded 120 case orders worth ₹1.45L.</p>

        <h2>5. Observations</h2>
        <ul>
          <li>Regional concentration remains strong in Bihar (28.9%) and Uttar Pradesh (22.5%).</li>
          <li>Buyer conversion rate reached an all-time high of 8.62%.</li>
        </ul>

        <h2>6. Recommendations</h2>
        <ul>
          <li>Expand inventory threshold in Mumbai Express Depot by 20% prior to peak festive demand.</li>
          <li>Introduce tiered volume pricing for FMCG stockists to push Average Order Value above ₹4,000.</li>
        </ul>

        <script>setTimeout(() => window.print(), 500);</script>
      </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  // 4. POWERPOINT REPORT GENERATOR (PDF Page 24)
  const generatePptReport = (config) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const sellerName = formData?.businessName || "SaathApp Wholesale Partner";
    const dateStr = new Date().toLocaleDateString('en-IN');

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${config.fileName}</title>
        <style>
          body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: white; padding: 20px; }
          .slide { width: 900px; height: 500px; background: #1e293b; border: 2px solid #00986C; border-radius: 20px; padding: 40px; margin: 20px auto; page-break-after: always; display: flex; flex-col; justify-content: space-between; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          .slide-title { font-size: 28px; font-weight: 900; color: #00986C; border-bottom: 2px solid #334155; pb-10px; }
          .slide-content { font-size: 18px; color: #cbd5e1; margin-top: 20px; line-height: 1.6; }
          .slide-num { text-align: right; font-size: 12px; color: #64748b; font-weight: bold; }
          .big-stat { font-size: 48px; font-weight: 900; color: #34d399; margin: 20px 0; }
          @media print { body { background: white; color: black; } .slide { border: 1px solid #00986C; background: white; color: black; } }
        </style>
      </head>
      <body>

        <!-- Slide 1: Title -->
        <div class="slide">
          <div>
            <div style="font-size: 16px; color: #00986C; font-weight: 900; text-transform: uppercase;">SaathApp Wholesale</div>
            <div class="slide-title" style="font-size: 36px; margin-top: 10px;">Analytics & Performance Report</div>
            <div className="slide-content" style="margin-top: 30px;">
              Prepared for: <strong>${sellerName}</strong><br/>
              Date: <strong>${dateStr}</strong> | Period: <strong>${config.dateRange}</strong>
            </div>
          </div>
          <div class="slide-num">Slide 1 of 9</div>
        </div>

        <!-- Slide 2: Business Overview -->
        <div class="slide">
          <div>
            <div class="slide-title">Slide 2: Business Overview</div>
            <div class="slide-content">
              • Gross Merchandise Value (GMV): <strong style="color:#34d399">₹28.4 Lakhs</strong> (+28.5% YoY)<br/>
              • Total Completed Orders: <strong>1,248 Orders</strong><br/>
              • Total Verified Active Buyers: <strong>850 Buyers</strong><br/>
              • Average Order Value (AOV): <strong>₹3,450</strong>
            </div>
          </div>
          <div class="slide-num">Slide 2 of 9</div>
        </div>

        <!-- Slide 3: Revenue -->
        <div class="slide">
          <div>
            <div class="slide-title">Slide 3: Revenue Trajectory</div>
            <div class="big-stat">₹28.4L GMV (+28.5%)</div>
            <div class="slide-content">
              Q1: ₹28.4L | Q2: ₹34.2L | Q3: ₹42.8L | Q4 Est: ₹50.0L
            </div>
          </div>
          <div class="slide-num">Slide 3 of 9</div>
        </div>

        <!-- Slide 4: Orders -->
        <div class="slide">
          <div>
            <div class="slide-title">Slide 4: Orders & Order Growth</div>
            <div class="slide-content">
              • Completed Fulfillment Rate: 98.5%<br/>
              • Return Rate: 1.24% (-0.35% improvement)<br/>
              • Conversion Rate: 8.62% (+0.92% gain)
            </div>
          </div>
          <div class="slide-num">Slide 4 of 9</div>
        </div>

        <!-- Slide 5: Top Products -->
        <div class="slide">
          <div>
            <div class="slide-title">Slide 5: Top Selling Products</div>
            <div class="slide-content">
              1. Tata Salt 1kg Pack (Case of 24) – 120 Orders (₹1.45L)<br/>
              2. Fortune Sunflower Oil 15L Tin – 98 Orders (₹1.28L)<br/>
              3. Cement 50kg PPC Bag – 85 Orders (₹1.05L)<br/>
              4. Havells Modular Switch 6A – 72 Orders (₹0.86L)<br/>
              5. Basmati Rice 25kg Bag – 65 Orders (₹0.74L)
            </div>
          </div>
          <div class="slide-num">Slide 5 of 9</div>
        </div>

        <!-- Slide 6: Customers -->
        <div class="slide">
          <div>
            <div class="slide-title">Slide 6: Customers & Regional Reach</div>
            <div class="slide-content">
              • Bihar: ₹8.2L (28.9%)<br/>
              • Uttar Pradesh: ₹6.4L (22.5%)<br/>
              • Maharashtra: ₹4.8L (16.9%)<br/>
              • West Bengal: ₹3.6L (12.7%)<br/>
              • Delhi NCR: ₹2.8L (9.9%)
            </div>
          </div>
          <div class="slide-num">Slide 6 of 9</div>
        </div>

        <!-- Slide 7: Inventory -->
        <div class="slide">
          <div>
            <div class="slide-title">Slide 7: Inventory & Stock Health</div>
            <div class="slide-content">
              • Delhi NCR Warehouse: 450 Units Available<br/>
              • Mumbai Express Depot: 623 Units Available<br/>
              • Stock Turnover Ratio: 4.8x
            </div>
          </div>
          <div class="slide-num">Slide 7 of 9</div>
        </div>

        <!-- Slide 8: Growth -->
        <div class="slide">
          <div>
            <div class="slide-title">Slide 8: Growth Drivers</div>
            <div class="slide-content">
              • Construction & Materials Category (+24.5% Growth)<br/>
              • Electricals & Lighting Category (+18.3% Growth)<br/>
              • FMCG & Personal Care (+14.9% Growth)
            </div>
          </div>
          <div class="slide-num">Slide 8 of 9</div>
        </div>

        <!-- Slide 9: Recommendations -->
        <div class="slide">
          <div>
            <div class="slide-title">Slide 9: Strategic Recommendations</div>
            <div class="slide-content">
              1. Boost stock buffer for FMCG fast-movers ahead of Q4 festive season.<br/>
              2. Expand stockist partnerships in Maharashtra & West Bengal.<br/>
              3. Optimize MOQ thresholds to maintain higher average order margins.
            </div>
          </div>
          <div class="slide-num">Slide 9 of 9</div>
        </div>

        <script>setTimeout(() => window.print(), 500);</script>
      </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  const handleDownloadReport = () => {
    const fmt = reportConfig.format;
    if (fmt === 'pdf') generatePdfReport(reportConfig);
    else if (fmt === 'excel') generateExcelReport(reportConfig);
    else if (fmt === 'word') generateWordReport(reportConfig);
    else if (fmt === 'ppt') generatePptReport(reportConfig);
    else generatePdfReport(reportConfig);

    addToast?.(`🎉 ${fmt.toUpperCase()} Report generated successfully!`, 'success');
    setIsReportModalOpen(false);
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText('https://saathapp.com/wholesale/analytics/report/share-98214');
    setIsCopied(true);
    addToast?.('Shareable report link copied to clipboard!', 'info');
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6 sa-fade">
      {/* 1. TOP HEADER & CONTROLS TOOLBAR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        {/* Title & Brand */}
        <div className="flex items-center gap-3">
          <img src={saathAppLogo} alt="SaathApp Logo" className="h-10 object-contain shrink-0" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Analytics &amp; Performance Reports
              </h2>
              <button
                type="button"
                onClick={() => handleOpenExportModal('pdf')}
                className="w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-[#00986C] flex items-center justify-center border border-emerald-500/30 shrink-0 hover:scale-110 transition cursor-pointer"
                title="Report Export Settings"
              >
                <Settings size={15} />
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              In-depth insights into your wholesale order volumes, category performance, and buyer retention.
            </p>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Date Range */}
          <div className="flex items-center gap-1.5 bg-page p-1.5 rounded-2xl border border-slate-200">
            <span className="text-[10px] font-black uppercase text-slate-400 pl-2">Range:</span>
            <select
              value={dateRange}
              onChange={(e) => {
                setDateRange(e.target.value);
                addToast?.(`Updated date range to ${e.target.value}`, 'info');
              }}
              className="bg-surface px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 border-0 focus:ring-0 cursor-pointer shadow-sm"
            >
              <option value="1 Aug – 31 Aug 2026">1 Aug – 31 Aug 2026</option>
              <option value="1 Jul – 31 Jul 2026">1 Jul – 31 Jul 2026</option>
              <option value="Q3 2026 (July – Sept)">Q3 2026 (July – Sept)</option>
              <option value="YTD 2026">YTD 2026</option>
            </select>
          </div>

          {/* Compare With */}
          <div className="hidden sm:flex items-center gap-1.5 bg-page p-1.5 rounded-2xl border border-slate-200">
            <span className="text-[10px] font-black uppercase text-slate-400 pl-2">Compare:</span>
            <select
              value={compareRange}
              onChange={(e) => {
                setCompareRange(e.target.value);
                addToast?.(`Comparing with ${e.target.value}`, 'info');
              }}
              className="bg-surface px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 border-0 focus:ring-0 cursor-pointer shadow-sm"
            >
              <option value="1 Jul – 31 Jul 2026">1 Jul – 31 Jul 2026</option>
              <option value="Previous Quarter">Previous Quarter</option>
              <option value="Same Month Last Year">Same Month Last Year</option>
            </select>
          </div>

          {/* Refresh Action */}
          <button
            type="button"
            onClick={() => addToast?.('🔄 Analytics data refreshed successfully', 'success')}
            className="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface text-slate-700 dark:text-slate-300 hover:bg-page transition cursor-pointer active:scale-95 shadow-sm"
            title="Refresh Data"
          >
            <RefreshCw size={15} className="text-[#00986C]" />
          </button>

          {/* Schedule Action */}
          <button
            type="button"
            onClick={() => setActiveModal('schedule')}
            className="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface text-slate-700 dark:text-slate-300 hover:bg-page transition cursor-pointer active:scale-95 shadow-sm"
            title="Schedule Automated Email Reports"
          >
            <Calendar size={15} className="text-[#00986C]" />
          </button>

          {/* Share Action */}
          <button
            type="button"
            onClick={() => setActiveModal('share')}
            className="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface text-slate-700 dark:text-slate-300 hover:bg-page transition cursor-pointer active:scale-95 shadow-sm"
            title="Share Report"
          >
            <Share2 size={15} className="text-[#00986C]" />
          </button>

          {/* Primary Export Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#00986C] hover:bg-emerald-700 px-4 py-2.5 text-xs font-black text-white shadow-md transition active:scale-95 cursor-pointer"
            >
              <Download size={15} /> Export <ChevronDown size={14} />
            </button>

            {/* Export Dropdown */}
            {isExportDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-surface border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-30 text-xs font-bold space-y-1 sa-rise">
                <button
                  type="button"
                  onClick={() => {
                    generatePdfReport(reportConfig);
                    setIsExportDropdownOpen(false);
                    addToast?.('Generated PDF report with SaathApp Official Logo', 'success');
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-page flex items-center gap-2 text-slate-800 dark:text-slate-200"
                >
                  <FileText size={16} className="text-rose-500" /> Export as PDF (.pdf)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    generateExcelReport(reportConfig);
                    setIsExportDropdownOpen(false);
                    addToast?.('Exported Excel report with 9 separate sheets', 'success');
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-page flex items-center gap-2 text-slate-800 dark:text-slate-200"
                >
                  <FileSpreadsheet size={16} className="text-emerald-500" /> Export as Excel (.xlsx)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    generateExcelReport({ ...reportConfig, fileName: 'SaathApp_CSV_Export' });
                    setIsExportDropdownOpen(false);
                    addToast?.('Exported CSV dataset report', 'success');
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-page flex items-center gap-2 text-slate-800 dark:text-slate-200"
                >
                  <FileCode size={16} className="text-teal-500" /> Export as CSV (.csv)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    generateWordReport(reportConfig);
                    setIsExportDropdownOpen(false);
                    addToast?.('Exported Word professional report (6 Sections)', 'success');
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-page flex items-center gap-2 text-slate-800 dark:text-slate-200"
                >
                  <FileText size={16} className="text-blue-600" /> Export as Word (.docx)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    generatePptReport(reportConfig);
                    setIsExportDropdownOpen(false);
                    addToast?.('Generated PowerPoint presentation (9 Slides)', 'success');
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-page flex items-center gap-2 text-slate-800 dark:text-slate-200"
                >
                  <Presentation size={16} className="text-amber-500" /> Export as PowerPoint (.pptx)
                </button>
                <div className="border-t border-slate-200 dark:border-slate-800 pt-1" />
                <button
                  type="button"
                  onClick={() => {
                    generatePdfReport(reportConfig);
                    setIsExportDropdownOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-page flex items-center gap-2 text-slate-600 dark:text-slate-400"
                >
                  <Printer size={16} /> Print Report
                </button>
                <button
                  type="button"
                  onClick={() => {
                    addToast?.('Report emailed to registered seller account', 'success');
                    setIsExportDropdownOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-page flex items-center gap-2 text-slate-600 dark:text-slate-400"
                >
                  <Mail size={16} /> Email Report
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. DEDICATED SUB-TABS BAR */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800 touch-pan-x">
        {[
          'Overview',
          'Sales',
          'Orders',
          'Products',
          'Buyers',
          'Revenue',
          'Warehouse Performance'
        ].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={(e) => {
              setActiveAnalyticsTab(tab);
              e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
              addToast?.(`Switching to ${tab} analytics view`, 'info');
            }}
            className={`shrink-0 rounded-xl px-4 py-2 text-xs font-extrabold transition-all duration-150 cursor-pointer active:scale-95 touch-manipulation select-none ${activeAnalyticsTab === tab
                ? 'bg-emerald-600 text-white shadow-md font-black'
                : 'bg-page text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 4. TABLES & DONUT CHART ROW (3 COLUMNS) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Performing Categories Table */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-5 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white flex items-center gap-1.5">
                Top Performing Categories <Info size={14} className="text-slate-400" />
              </h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <tr>
                    <th className="pb-2">CATEGORY</th>
                    <th className="pb-2 text-right">ORDERS</th>
                    <th className="pb-2 text-right">GMV</th>
                    <th className="pb-2 text-right">GROWTH</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold text-slate-800 dark:text-slate-200">
                  {[
                    { name: 'Construction & Materials', orders: 385, gmv: '₹8.6L', growth: '↑ 24.5%' },
                    { name: 'Electricals & Lighting', orders: 284, gmv: '₹6.2L', growth: '↑ 18.3%' },
                    { name: 'FMCG & Personal Care', orders: 246, gmv: '₹4.8L', growth: '↑ 14.9%' },
                    { name: 'Packaging & Supplies', orders: 198, gmv: '₹3.6L', growth: '↑ 12.1%' },
                    { name: 'Hardware & Tools', orders: 135, gmv: '₹2.1L', growth: '↑ 10.7%' },
                  ].map((c, i) => (
                    <tr key={i} className="hover:bg-page transition cursor-pointer" onClick={() => addToast?.(`Category: ${c.name} (${c.orders} orders)`, 'info')}>
                      <td className="py-2.5 font-extrabold text-slate-900 dark:text-white truncate max-w-[130px]">{c.name}</td>
                      <td className="py-2.5 text-right font-mono text-slate-500">{c.orders}</td>
                      <td className="py-2.5 text-right font-mono font-bold">{c.gmv}</td>
                      <td className="py-2.5 text-right font-bold text-emerald-600 dark:text-emerald-400">{c.growth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveModal('categories')}
            className="w-full py-2 rounded-2xl border border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/20 hover:bg-emerald-100 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 text-center transition cursor-pointer"
          >
            View All Categories
          </button>
        </div>

        {/* Top Selling Products Table */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-5 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white flex items-center gap-1.5">
                Top Selling Products <Info size={14} className="text-slate-400" />
              </h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <tr>
                    <th className="pb-2">PRODUCT</th>
                    <th className="pb-2 text-right">ORDERS</th>
                    <th className="pb-2 text-right">GMV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold text-slate-800 dark:text-slate-200">
                  {[].map((p, i) => (
                    <tr key={i} className="hover:bg-page transition cursor-pointer" onClick={() => addToast?.(`Product: ${p.title} (${p.gmv})`, 'info')}>
                      <td className="py-2.5 font-extrabold text-slate-900 dark:text-white flex items-center gap-2 truncate max-w-[150px]">
                        <img src={p.img} alt={p.title} className="w-7 h-7 rounded-lg object-cover border border-slate-200 shrink-0" />
                        <span className="truncate">{p.title}</span>
                      </td>
                      <td className="py-2.5 text-right font-mono text-slate-500">{p.orders}</td>
                      <td className="py-2.5 text-right font-mono font-bold">{p.gmv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveModal('products')}
            className="w-full py-2 rounded-2xl border border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/20 hover:bg-emerald-100 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 text-center transition cursor-pointer"
          >
            View All Products
          </button>
        </div>

        {/* Sales by Top States Donut Chart */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-5 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white flex items-center gap-1.5">
                Sales by Top States <Info size={14} className="text-slate-400" />
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center my-2">
              <div className="flex items-center justify-center relative">
                <div className="w-32 h-32 rounded-full border-[12px] border-purple-600 border-t-emerald-500 border-r-blue-500 border-b-amber-500 flex items-center justify-center flex-col shadow-inner">
                  <strong className="text-sm font-black text-slate-900 dark:text-white font-mono">₹28.4L</strong>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Total GMV</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs font-semibold">
                {[
                  { name: 'Bihar', val: '₹8.2L (28.9%)', color: 'bg-purple-600' },
                  { name: 'Uttar Pradesh', val: '₹6.4L (22.5%)', color: 'bg-emerald-500' },
                  { name: 'Maharashtra', val: '₹4.8L (16.9%)', color: 'bg-blue-500' },
                  { name: 'West Bengal', val: '₹3.6L (12.7%)', color: 'bg-amber-500' },
                  { name: 'Delhi', val: '₹2.8L (9.9%)', color: 'bg-teal-500' },
                  { name: 'Others', val: '₹2.6L (9.1%)', color: 'bg-slate-400' },
                ].map((st, i) => (
                  <div key={i} className="flex items-center justify-between text-[11px] hover:bg-page p-1 rounded transition cursor-pointer" onClick={() => addToast?.(`State: ${st.name} - ${st.val}`, 'info')}>
                    <div className="flex items-center gap-1.5 truncate">
                      <span className={`w-2 h-2 rounded-full ${st.color} shrink-0`} />
                      <span className="text-slate-700 dark:text-slate-300 truncate">{st.name}</span>
                    </div>
                    <span className="font-mono text-slate-500 font-bold text-[10px]">{st.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveModal('states')}
            className="w-full py-2 rounded-2xl border border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/20 hover:bg-emerald-100 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 text-center transition cursor-pointer"
          >
            View Full Report
          </button>
        </div>
      </div>

      {/* 5. AI BUSINESS SUMMARY BANNER */}
      <div className="rounded-3xl bg-page dark:bg-slate-950 p-5 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
            <Sparkles size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">AI Business Summary</h4>
              <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[9px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/30">
                New
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Your GMV has increased by <strong className="text-emerald-600 dark:text-emerald-400 font-bold">28.5%</strong> compared to last month. Construction &amp; Materials is your top performing category.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setActiveModal('aiInsights')}
          className="px-5 py-2.5 rounded-2xl bg-[#00986C] hover:bg-emerald-700 text-white font-black text-xs shrink-0 shadow-lg transition hover:scale-105 cursor-pointer flex items-center gap-1"
        >
          View Detailed Insights &gt;
        </button>
      </div>

      {/* 6. REPORT SETTINGS POPUP MODAL (PDF Page 25) */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Download className="text-emerald-500" size={18} /> Report Settings Popup
              </h3>
              <button
                type="button"
                onClick={() => setIsReportModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 font-bold p-1"
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5 text-[11px]">
                Export Format
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['pdf', 'excel', 'word', 'ppt'].map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setReportConfig((p) => ({ ...p, format: fmt }))}
                    className={`py-2 rounded-xl font-black uppercase text-center border transition ${reportConfig.format === fmt
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-sm'
                        : 'bg-page dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1 text-[11px]">
                Date Range
              </label>
              <select
                value={reportConfig.dateRange}
                onChange={(e) => setReportConfig((p) => ({ ...p, dateRange: e.target.value }))}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-page dark:bg-slate-950 p-2.5 font-bold text-slate-900 dark:text-white"
              >
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="This Month">This Month</option>
                <option value="Last Quarter">Last Quarter</option>
                <option value="Financial Year 2025-26">Financial Year 2025-26</option>
              </select>
            </div>

            <div className="space-y-2 bg-page dark:bg-slate-950 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 text-[10px]">Include</label>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                {[
                  { key: 'includeCharts', label: 'Charts' },
                  { key: 'includeTables', label: 'Tables' },
                  { key: 'includeSummary', label: 'Summary' },
                  { key: 'includeLogo', label: 'Company Logo' },
                  { key: 'includeWatermark', label: 'Watermark' },
                ].map((inc) => (
                  <label key={inc.key} className="flex items-center gap-2 cursor-pointer font-bold text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={reportConfig[inc.key]}
                      onChange={(e) => setReportConfig((p) => ({ ...p, [inc.key]: e.target.checked }))}
                      className="w-4 h-4 accent-emerald-500"
                    />
                    <span>☑ {inc.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1 text-[10px]">Orientation</label>
                <select
                  value={reportConfig.orientation}
                  onChange={(e) => setReportConfig((p) => ({ ...p, orientation: e.target.value }))}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-page dark:bg-slate-950 p-2 font-bold text-slate-900 dark:text-white"
                >
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1 text-[10px]">File Name</label>
                <input
                  type="text"
                  value={reportConfig.fileName}
                  onChange={(e) => setReportConfig((p) => ({ ...p, fileName: e.target.value }))}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-page dark:bg-slate-950 p-2 font-mono text-xs text-slate-900 dark:text-white font-bold"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsReportModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 dark:text-slate-300 font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDownloadReport}
                className="px-6 py-2 rounded-2xl bg-[#00986C] hover:bg-emerald-500 text-white font-extrabold shadow-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Download size={15} /> Download Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. SCHEDULE REPORT MODAL */}
      {activeModal === 'schedule' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="text-[#00986C]" size={18} /> Schedule Automated Email Report
              </h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-200 font-bold p-1"><X size={18} /></button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Recipient Email</label>
                <input
                  type="email"
                  value={scheduleEmail}
                  onChange={(e) => setScheduleEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-page dark:bg-slate-950 p-2.5 font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Frequency</label>
                <select
                  value={scheduleFrequency}
                  onChange={(e) => setScheduleFrequency(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-page dark:bg-slate-950 p-2.5 font-bold text-slate-900 dark:text-white"
                >
                  <option value="daily">Daily Morning Summary (8:00 AM)</option>
                  <option value="weekly">Weekly Every Monday</option>
                  <option value="monthly">Monthly 1st Calendar Day</option>
                  <option value="quarterly">End of Quarter Summary</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 dark:text-slate-300 font-bold">Cancel</button>
              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  addToast?.(`Scheduled ${scheduleFrequency} report to ${scheduleEmail}`, 'success');
                }}
                className="px-5 py-2 rounded-xl bg-[#00986C] hover:bg-emerald-700 text-white font-extrabold shadow"
              >
                Save Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. SHARE REPORT MODAL */}
      {activeModal === 'share' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Share2 className="text-[#00986C]" size={18} /> Share Analytics Dashboard
              </h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-200 font-bold p-1"><X size={18} /></button>
            </div>

            <p className="text-slate-600 dark:text-slate-400">
              Anyone with this encrypted link will be able to view a read-only snapshot of this Analytics report.
            </p>

            <div className="flex items-center gap-2 bg-page dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <input
                type="text"
                readOnly
                value="https://saathapp.com/wholesale/analytics/report/share-98214"
                className="bg-transparent font-mono text-xs text-slate-800 dark:text-slate-200 w-full focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCopyShareLink}
                className="px-3 py-1.5 bg-[#00986C] text-white rounded-lg font-bold shrink-0 hover:bg-emerald-700 transition flex items-center gap-1"
              >
                {isCopied ? <Check size={14} /> : <Copy size={14} />} {isCopied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div className="pt-2 flex justify-end">
              <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl bg-slate-200 font-bold">Done</button>
            </div>
          </div>
        </div>
      )}

      {/* 9. VIEW ALL CATEGORIES MODAL */}
      {activeModal === 'categories' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-2xl w-full shadow-2xl space-y-4 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white">All Performing Categories Breakdown</h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-200 font-bold p-1"><X size={18} /></button>
            </div>

            <div className="overflow-y-auto max-h-96">
              <table className="w-full text-left text-xs">
                <thead className="text-[10px] font-extrabold uppercase text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-2">
                  <tr>
                    <th className="pb-2">Category</th>
                    <th className="pb-2 text-right">Orders</th>
                    <th className="pb-2 text-right">GMV Volume</th>
                    <th className="pb-2 text-right">YoY Growth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold">
                  {[
                    { name: 'Construction & Materials', orders: 385, gmv: '₹8.6L', growth: '+24.5%' },
                    { name: 'Electricals & Lighting', orders: 284, gmv: '₹6.2L', growth: '+18.3%' },
                    { name: 'FMCG & Personal Care', orders: 246, gmv: '₹4.8L', growth: '+14.9%' },
                    { name: 'Packaging & Supplies', orders: 198, gmv: '₹3.6L', growth: '+12.1%' },
                    { name: 'Hardware & Tools', orders: 135, gmv: '₹2.1L', growth: '+10.7%' },
                    { name: 'Plumbing & Bathroom', orders: 110, gmv: '₹1.8L', growth: '+9.4%' },
                    { name: 'Safety & Protection', orders: 90, gmv: '₹1.3L', growth: '+8.2%' },
                  ].map((c, i) => (
                    <tr key={i} className="hover:bg-page">
                      <td className="py-2.5 font-bold text-slate-900 dark:text-white">{c.name}</td>
                      <td className="py-2.5 text-right font-mono">{c.orders}</td>
                      <td className="py-2.5 text-right font-mono font-bold">{c.gmv}</td>
                      <td className="py-2.5 text-right font-bold text-emerald-600 dark:text-emerald-400">{c.growth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex justify-end">
              <button type="button" onClick={() => setActiveModal(null)} className="px-5 py-2 bg-[#00986C] text-white font-bold rounded-xl">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* 10. AI DETAILED INSIGHTS MODAL */}
      {activeModal === 'aiInsights' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-xl w-full shadow-2xl space-y-4 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="text-[#00986C]" size={20} /> AI Business Recommendations & Insights
              </h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-200 font-bold p-1"><X size={18} /></button>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/30 text-slate-800 dark:text-slate-200">
                <strong className="text-emerald-600 dark:text-emerald-400 block mb-1 font-black">📈 Revenue Growth Analysis</strong>
                Your GMV increased by 28.5% YoY reaching ₹28.4L in August. Main driver is Construction & Materials (+24.5%).
              </div>

              <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-500/30 text-slate-800 dark:text-slate-200">
                <strong className="text-blue-600 dark:text-blue-400 block mb-1 font-black">💡 Inventory Optimization Suggestion</strong>
                Stock reorder velocity for Fortune Sunflower Oil 15L is high. Increase safety stock in Mumbai warehouse by 20% to prevent stockouts.
              </div>

              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-500/30 text-slate-800 dark:text-slate-200">
                <strong className="text-amber-600 dark:text-amber-400 block mb-1 font-black">🎯 Regional Buyer Retention</strong>
                Bihar & UP represent 51.4% of total GMV. Launching regional promotional shipping discounts could increase AOV by ₹450.
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button type="button" onClick={() => setActiveModal(null)} className="px-5 py-2 bg-[#00986C] text-white font-bold rounded-xl">Got It</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
