# Chronis: Product Rationale & Judgment

## Three UX Decisions

1. **Glassmorphic, Dark-Mode First Aesthetic:**
   Instead of a clinical, data-heavy dashboard, Chronis uses a highly polished, premium dark mode with translucent "glass" panels. This UX decision was made to make checking daily health and behavioral data feel less like looking at a spreadsheet and more like interacting with a premium, personalized lifestyle companion.

2. **Actionable "AI Insights" Cards:**
   Rather than overwhelming the user with raw charts, we process the data into human-readable, bite-sized "Insight Cards" (e.g., correlations between sleep and deep work). This UX decision bridges the gap between raw data collection and actual behavioral change, making the app immediately useful to non-technical users.

3. **Narrative Timeline over Pure Calendars:**
   Instead of a traditional calendar view, the Timeline is designed as a vertical scrolling narrative feed. It aggregates daily activities into a visual "Day Score" using color-coded indicators. This allows users to effortlessly scroll through their history and spot streaks or patterns without clicking into individual dates.

## One Tradeoff

**Aggregated Synthesized Data vs. Granular Real-Time Tracking**
*Tradeoff:* We opted to handle data at a "daily aggregate" level (e.g., total sleep hours, total steps per day) rather than implementing minute-by-minute granular tracking. 
*Why:* While granular tracking provides deeper analytical power, it requires complex time-series databases and heavy background syncing logic. By trading off minute-level precision for daily aggregates, we were able to drastically simplify the database schema (using SQLite/PostgreSQL effortlessly), reduce API latency, and deliver a clean, fast MVP that still provides 90% of the actionable value (macro-trends).

## Future Feature Priority

**Wearable API Integrations (Apple Health / Google Fit)**
If Chronis launched tomorrow, the absolute highest priority feature would be automated data ingestion via Apple HealthKit and Google Fit APIs. Currently, the platform relies on synthetic data or manual tracking logic. To achieve daily active use and retention in the real world, users must not feel the friction of manual data entry. Seamless background syncing of sleep, steps, and screen time is critical for the product's core value proposition.
