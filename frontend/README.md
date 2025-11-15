# EcoBarter - Waste Management & Reward Platform


EcoBarter is a comprehensive waste management platform that connects rural farmers with collection agents through a voice-enabled reporting system. Farmers report recyclable waste and earn tree seedlings and compost credits as rewards, promoting environmental sustainability and circular economy practices.

## 🌟 Key Features

### For Farmers
- **Voice-Enabled Reporting**: Record waste details using voice (powered by OpenAI Whisper)
- **Multiple Waste Types**: Support for plastic bottles, agrochemical containers, metal cans, glass, and more
- **Real-Time Rewards Tracking**: Monitor earned tree seedlings and compost credits
- **Collection History**: View all past and pending waste reports
- **Location-Based Pickup**: Specify pickup locations for convenient collection

### For Collection Agents
- **Pending Requests Dashboard**: View all pending waste collection requests
- **Collection Management**: Start and complete collections with a click
- **Automatic Reward Distribution**: System automatically calculates and assigns rewards
- **Performance Tracking**: Monitor completed collections and total waste collected

### Platform Features
- **Secure Authentication**: Email-based signup/login with role-based access
- **Real-Time Updates**: Live dashboard updates using Supabase Realtime
- **Responsive Design**: Mobile-first design built with Tailwind CSS
- **Dark/Light Mode Support**: Full theme customization
- **Voice-to-Text AI**: Automatic transcription of voice reports

## 🏗️ Technology Stack

### Frontend
- **React 18.3.1** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality component library
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **date-fns** - Date formatting utilities
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

### Backend (Lovable Cloud)
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Row-Level Security (RLS)
  - Authentication & Authorization
  - Edge Functions (Serverless)
  - Real-time subscriptions

### AI Integration
- **OpenAI Whisper** - Voice-to-text transcription
- **Edge Functions** - Serverless API endpoints

## 📁 Project Structure

```
ecobarter/
├── public/
│   ├── robots.txt              # SEO crawler configuration
│   ├── favicon.ico             # App icon
│           
│
├── src/
│   ├── assets/                 # Static assets
│   │   ├── hero-image.jpg     # Landing page hero image
│   │   ├── tree-icon.png      # Tree seedlings icon
│   │   └── waste-icon.png     # Waste collection icon
│   │
│   ├── components/
│   │   ├── dashboard/         # Dashboard-specific components
│   │   │   ├── AgentDashboard.tsx          # Agent role dashboard
│   │   │   ├── CollectionRequestsList.tsx  # Pending collection requests
│   │   │   ├── FarmerDashboard.tsx         # Farmer role dashboard
│   │   │   ├── WasteHistoryList.tsx        # Waste report history
│   │   │   └── WasteReportForm.tsx         # Waste submission form w/ voice
│   │   │
│   │   └── ui/                # shadcn/ui components (50+ components)
│   │       ├── button.tsx     # Button component
│   │       ├── card.tsx       # Card component
│   │       ├── input.tsx      # Input component
│   │       ├── select.tsx     # Select dropdown
│   │       ├── textarea.tsx   # Text area
│   │       ├── badge.tsx      # Badge component
│   │       ├── toast.tsx      # Toast notifications
│   │       └── ...            # Additional UI components
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── use-mobile.tsx     # Mobile detection hook
│   │   └── use-toast.ts       # Toast notification hook
│   │
│   ├── integrations/
│   │   └── supabase/          # Supabase integration (auto-generated)
│   │       ├── client.ts      # Supabase client configuration
│   │       └── types.ts       # Database type definitions
│   │
│   ├── lib/
│   │   └── utils.ts           # Utility functions (cn, etc.)
│   │
│   ├── pages/                 # Route pages
│   │   ├── Auth.tsx           # Authentication page (login/signup)
│   │   ├── Dashboard.tsx      # Main dashboard (role-based routing)
│   │   ├── Index.tsx          # Landing page
│   │   └── NotFound.tsx       # 404 error page
│   │
│   ├── utils/
│   │   └── audioRecorder.ts   # Audio recording utility
│   │
│   ├── App.tsx                # Main app component
│   ├── App.css                # Global styles
│   ├── index.css              # Tailwind & design tokens
│   ├── main.tsx               # App entry point
│   └── vite-env.d.ts          # Vite type definitions
│
├── supabase/
│   ├── functions/             # Edge functions
│   │   └── transcribe-audio/  # Voice transcription function
│   │       └── index.ts       # Whisper API integration
│   │
│   ├── migrations/            # Database migrations
│   │   └── *.sql              # Migration files
│   │
│   └── config.toml            # Supabase configuration
│
├── .env                       # Environment variables (auto-generated)
├── components.json            # shadcn/ui configuration
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML entry point
├── package.json               # Dependencies
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
└── README.md                  # This file
```

## 🗄️ Database Schema

### Tables

#### `profiles`
User profile information
- `id` (uuid, PK) - References auth.users
- `full_name` (text, required)
- `role` (app_role enum, required) - User role type
- `location` (text, nullable)
- `phone` (text, nullable)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**RLS Policies:**
- Users can view all profiles
- Users can insert/update own profile

#### `user_roles`
Role management table for secure role-based access
- `id` (uuid, PK)
- `user_id` (uuid, required) - References auth.users
- `role` (app_role enum, required)
- `created_at` (timestamp)

**RLS Policies:**
- Users can view their own roles only

#### `waste_reports`
Waste collection reports submitted by farmers
- `id` (uuid, PK)
- `farmer_id` (uuid, required)
- `waste_type` (waste_type enum, required)
- `quantity` (integer, required)
- `description` (text, nullable)
- `location` (text, nullable)
- `voice_recording_url` (text, nullable)
- `status` (collection_status enum) - pending/in_progress/completed
- `created_at` (timestamp)
- `updated_at` (timestamp)

**RLS Policies:**
- Farmers can create and view their own reports
- Agents can view all pending reports
- Agents can update report status

#### `collections`
Collection records when agents pick up waste
- `id` (uuid, PK)
- `waste_report_id` (uuid, required)
- `agent_id` (uuid, required)
- `collected_at` (timestamp, nullable)
- `notes` (text, nullable)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**RLS Policies:**
- Agents can create collections
- Users can view their related collections

#### `rewards`
Reward points earned by farmers
- `id` (uuid, PK)
- `farmer_id` (uuid, required)
- `collection_id` (uuid, required)
- `tree_seedlings` (integer, default: 0)
- `compost_credits` (integer, default: 0)
- `created_at` (timestamp)

**RLS Policies:**
- Farmers can view their own rewards
- System can create rewards

### Custom Types

```sql
-- User role types
CREATE TYPE app_role AS ENUM ('farmer', 'agent');

-- Waste types
CREATE TYPE waste_type AS ENUM (
  'plastic_bottles',
  'agrochemical_containers', 
  'plastic_bags',
  'metal_cans',
  'glass',
  'other'
);

-- Collection status
CREATE TYPE collection_status AS ENUM ('pending', 'in_progress', 'completed');
```

### Database Functions

#### `has_role(user_id uuid, role app_role)`
Security definer function to check user roles without recursive RLS issues.

#### `handle_new_user()`
Trigger function that automatically creates profile and assigns role when a new user signs up.

#### `update_updated_at_column()`
Trigger function that automatically updates the `updated_at` timestamp.

## 🔧 Edge Functions

### `transcribe-audio`
Transcribes audio recordings to text using OpenAI Whisper API.

**Endpoint:** `/functions/v1/transcribe-audio`

**Request:**
```json
{
  "audio": "base64_encoded_audio_data"
}
```

**Response:**
```json
{
  "text": "transcribed text from audio"
}
```

**Features:**
- Chunked base64 processing to prevent memory issues
- Supports WebM audio format
- OpenAI Whisper-1 model integration
- CORS enabled for client access

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Ajoke752/green-voice-swap.git
cd ecobarter
```

2. **Install dependencies**
```bash
npm install
```



5. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📱 Application Workflow

### Farmer Journey
1. Sign up as a farmer with email/password
2. Access farmer dashboard showing:
   - Total tree seedlings earned
   - Total compost credits earned
   - Pending waste reports count
3. Submit waste report:
   - Select waste type from dropdown
   - Enter quantity
   - Optional: Use voice recording to describe waste
   - Add location details
4. View report history and status updates
5. Receive rewards automatically when collection is completed

### Agent Journey
1. Sign up as a collection agent
2. Access agent dashboard showing:
   - Pending collection requests
   - Completed collections count
   - Total waste collected (kg)
3. View all pending waste reports with farmer details
4. Start collection (marks as "in progress")
5. Complete collection:
   - System automatically calculates rewards
   - Updates report status to "completed"
   - Assigns tree seedlings & compost credits to farmer

### Reward Calculation
- **Tree Seedlings**: 1 seedling per 5 items collected
- **Compost Credits**: 1 credit per 3 items collected

## 🎨 Design System

The project uses a comprehensive design system with semantic tokens:

### Color Tokens
All colors use HSL format and are defined in `src/index.css`:
- `--primary` - Main brand color
- `--secondary` - Secondary accent
- `--accent` - Highlight color
- `--background` - Background color
- `--foreground` - Text color
- `--muted` - Muted elements
- `--card` - Card backgrounds

### Custom Styles
- `shadow-soft` - Subtle shadow
- `shadow-glow` - Glowing effect
- Custom gradients via `--gradient-primary`

## 🔐 Security

### Authentication
- Email/password authentication
- Auto-confirm email signups enabled
- Session-based authentication with Supabase Auth

### Authorization
- Role-based access control (RBAC) with `farmer` and `agent` roles
- Roles stored in separate `user_roles` table
- Security definer function `has_role()` prevents privilege escalation

### Row-Level Security (RLS)
All tables have RLS enabled with strict policies:
- Farmers can only access their own data
- Agents can access all pending reports but cannot modify farmer data
- Rewards are system-generated only
- Proper foreign key references avoiding auth.users direct access

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- TypeScript strict mode enabled
- ESLint with React hooks rules
- Prettier-compatible formatting
- Component-based architecture

### Adding New Features

1. **Database Changes**: Use Lovable's migration tool or create SQL files in `supabase/migrations/`
2. **New Components**: Create in `src/components/` with proper TypeScript types
3. **New Pages**: Add to `src/pages/` and configure routes in `src/App.tsx`
4. **Edge Functions**: Create in `supabase/functions/` and configure in `supabase/config.toml`

## 🌐 API Integration

### Supabase Client
```typescript
import { supabase } from "@/integrations/supabase/client";
```

### Edge Function Invocation
```typescript
const { data, error } = await supabase.functions.invoke('transcribe-audio', {
  body: { audio: base64Audio }
});
```

### Database Queries
```typescript
// Insert waste report
const { data, error } = await supabase
  .from("waste_reports")
  .insert({
    farmer_id: userId,
    waste_type: "plastic_bottles",
    quantity: 10,
    status: "pending"
  });
```




```bash
# Build the project
npm run build




## 🧪 Testing

### Manual Testing Checklist
- [ ] Farmer signup and login
- [ ] Agent signup and login
- [ ] Voice recording and transcription
- [ ] Waste report submission
- [ ] Collection request lifecycle (pending → in_progress → completed)
- [ ] Reward calculation and display
- [ ] Dashboard statistics accuracy
- [ ] Mobile responsiveness

## 📝 Environment Variables

Auto-generated by Lovable Cloud (do not edit `.env` manually):

```bash
VITE_SUPABASE_URL=<auto_generated>
VITE_SUPABASE_PUBLISHABLE_KEY=<auto_generated>
VITE_SUPABASE_PROJECT_ID=<auto_generated>
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is created with Lovable and can be used according to your preferences.

#b99-46ed-8699-78aee998e147)

## 🎯 Future Roadmap

- [ ] SMS notifications for farmers
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Geolocation-based agent assignment
- [ ] Multi-language support
- [ ] Blockchain-based reward tracking
- [ ] Community marketplace for rewards

---
