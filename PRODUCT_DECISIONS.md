# Product Decisions - Chronis

This document outlines the key product judgments and trade-offs made during the development of Chronis.

## 3 UX Decisions

1. **Dark Theme as Default & Only Option**: Behavioral data is best consumed in a low-distraction environment. Because Chronis surfaces highly personal data such as sleep and screen time patterns, a dark interface reduces cognitive load and eye strain, making the colorful Recharts data visualizations pop significantly more than they would on a light background.
2. **Confidence Levels on Insights**: We introduced a "ConfidenceBadge" component that shows whether an auto-generated insight has High, Medium, or Low confidence based on the number of supporting data points. Users must know when to trust the system's conclusions and when the data is too sparse to make a definitive judgment.
3. **Color Coding on Narrative Timeline**: The timeline relies heavily on color-coding for individual metrics (e.g., green/teal for sleep, purple for steps) and highlights days as "above average" or "below average". Pattern recognition is much faster visually than parsing numbers, allowing the user to scroll through 30 days of history and instantly spot bad weeks or great days.

## 1 Tradeoff

- **Computed Insights vs. User-Defined Goals**: We chose to focus on auto-generating insights based on behavioral correlations (e.g., "Screen time impacts sleep") rather than forcing the user to define static goals (e.g., "I want to walk 10,000 steps"). This provides a much simpler onboarding experience and immediate "aha!" moments, but sacrifices some personalization for users who want strict accountability to their own custom targets.

## 1 Future Feature

- **Natural Language Query**: In the future, we plan to implement a natural language search bar where a user can ask *"When do I work best?"* or *"Why was my sleep bad last week?"* and the application will parse their data via an LLM to provide a tailored, data-backed answer directly in the UI.
