# Credit Wise 

A simple platform to help people find the right credit card in India.

Credit Wise lets users explore different credit cards, compare their benefits, understand interest charges, and find cards that match their spending habits. It also includes an AI assistant to help with credit card-related questions and recommendations.

## Features

### 1. Explore Credit Cards
- Browse credit cards from popular banks like HDFC, SBI, ICICI, Axis, IDFC FIRST, and more.
- Filter cards by categories like Cashback, Travel, Rewards, Lifetime Free, Dining, and Fuel.
- Apply filters based on bank, annual fees, and available benefits.
- Sort cards by fees, ratings, and other options.
- View detailed information about each card, including fees, rewards, and eligibility.

### 2. AI Assistant – Ask Buddy 
- Powered by Google's Gemini API.
- Get credit card recommendations based on your needs.
- Compare different credit cards.
- Ask questions about credit cards and their benefits.
- Uses the available card dataset to provide relevant recommendations.

### 3. Credit School 
A dedicated section to help users understand credit cards and how they work.

- **Card Types:** Understand different types of credit cards and their benefits.
- **Credit Scores:** Learn about the factors that affect your credit score.
- **APR Calculator:** Calculate interest and understand how much you may end up paying.
- **Interest Calculator:** Compare paying the minimum amount with paying your full bill.
- **Hidden Charges:** Learn about late payment fees, overlimit charges, and other common credit card charges.

## Tech Stack

| Technology | Usage |
|---|---|
| Next.js 16 | Framework |
| React 19 | UI Library |
| TypeScript | Programming Language |
| Tailwind CSS v4 | Styling |
| Radix UI & shadcn/ui | UI Components |
| Lucide React | Icons |
| Recharts | Charts |
| Framer Motion | Animations |
| Google GenAI SDK | AI Integration |
| Bun / npm | Package Manager |

## Project Structure

```text
credit/
├── public/
│   ├── cards/              # Credit card images
│   └── icon.svg
├── src/
│   ├── app/
│   │   ├── api/ai/         # AI API route
│   │   ├── assistant/      # AI assistant page
│   │   ├── cards/          # Credit card listing
│   │   ├── learn/          # Credit School
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── learn/          # Learning components
│   │   ├── ui/             # Reusable UI components
│   │   ├── AvailableCard.tsx
│   │   ├── CardDiv.tsx
│   │   ├── ChatSection.tsx
│   │   ├── Credit-card-visual.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   └── SummaryModel.tsx
│   ├── data/
│   │   └── cards.json      # Credit card dataset
│   ├── lib/
│   │   ├── card-filters.ts
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── .env.example
├── package.json
└── tsconfig.json
```

## Getting Started

Follow these steps to run Credit Wise locally.

### Prerequisites

Make sure you have one of the following installed:

- [Node.js](https://nodejs.org/) (v20 or later)
- [Bun](https://bun.sh/) (recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/credit-wise.git
cd credit
```

### 2. Install Dependencies

Using Bun:

```bash
bun install
```

Or using npm:

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Add your Gemini API key to the file:

```env
GEMINI_API_KEY=your_gemini_api_key
```

You can get an API key from [Google AI Studio](https://aistudio.google.com/).

### 4. Start the Development Server

Using Bun:

```bash
bun dev
```

Or using npm:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

| Script | Command | Description |
|---|---|---|
| Dev | `bun dev` / `npm run dev` | Start development server |
| Build | `bun run build` / `npm run build` | Create production build |
| Start | `bun run start` / `npm run start` | Run production server |
| Lint | `bun run lint` / `npm run lint` | Check code for linting issues |

## Application Routes

| Route | Description |
|---|---|
| `/` | Homepage with featured cards and AI chat preview |
| `/cards` | Browse, search, filter, and sort credit cards |
| `/assistant` | Chat with the AI credit card assistant |
| `/learn` | Learn about credit cards, interest, and credit scores |

## Contributing

Contributions and suggestions are always welcome!

1. Fork this repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your changes"`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).