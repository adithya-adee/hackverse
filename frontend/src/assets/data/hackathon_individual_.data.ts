// DTO Interface
export interface FindHackathonDto {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  registrationDate: Date;
  location?: string;
  maxTeamSize: number;
  mode: "ONLINE" | "OFFLINE" | "HYBRID";
  status: "UPCOMING" | "LIVE" | "COMPLETED";
  bannerImageUrl?: string;
  createdBy: {
    id: string;
    name: string;
    profileImageUrl?: string;
  };
  registeredParticipants: number;
  tags: string[];
  tabs: {
    title: string;
    content: string; // Markdown content
  }[];
}

// Sample JSON Data for all hackathons from your uploaded data

// AI for Good Hackathon 2024
const aiHackathon: FindHackathonDto = {
  id: "hack-550e8400-e29b-41d4-a716-446655440001",
  title: "AI for Good Hackathon 2024",
  description:
    "Join us for a 48-hour hackathon focused on building AI solutions that make a positive impact on society. Whether it's healthcare, education, environment, or social justice - let's code for change!",
  startDate: new Date("2024-03-15T18:00:00.000Z"),
  endDate: new Date("2024-03-17T18:00:00.000Z"),
  registrationDate: new Date("2024-02-15T09:00:00.000Z"),
  location: "Online",
  maxTeamSize: 4,
  mode: "ONLINE",
  status: "COMPLETED",
  bannerImageUrl:
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200",
  createdBy: {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Sarah Johnson",
    profileImageUrl:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
  },
  registeredParticipants: 156,
  tags: ["AI", "Machine Learning", "Social Impact", "Healthcare", "Education"],
  tabs: [
    {
      title: "About",
      content:
        "# Welcome to AI for Good Hackathon 2024\n\nThis hackathon focuses on leveraging artificial intelligence to solve real-world problems and create positive social impact.\n\n## What we're looking for:\n- Innovative AI solutions\n- Real-world problem solving\n- Social impact focus\n- Creative use of technology",
    },
    {
      title: "Rules",
      content:
        "# Hackathon Rules\n\n## Participation\n- Teams of 1-4 members\n- All skill levels welcome\n- Must register before deadline\n\n## Submission Requirements\n- Working prototype or demo\n- Source code on GitHub\n- Project presentation (5 minutes)\n- Written description of impact\n\n## Judging Criteria\n- Innovation (25%)\n- Technical Implementation (25%)\n- Social Impact (25%)\n- Presentation (25%)",
    },
    {
      title: "Prizes",
      content:
        "# Prizes & Recognition\n\n## 🥇 First Place: $5,000\n- Cash prize for the team\n- Mentorship opportunity with industry experts\n- Featured on our platform\n\n## 🥈 Second Place: $3,000\n- Cash prize for the team\n- Access to startup accelerator program\n\n## 🥉 Third Place: $1,000\n- Cash prize for the team\n- 1-year premium platform access\n\n## Special Categories\n- **Best Student Team**: $1,000\n- **Most Innovative Use of AI**: $500\n- **Best Social Impact**: $500",
    },
  ],
};

// Web3 & Blockchain Challenge
const web3Hackathon: FindHackathonDto = {
  id: "hack-550e8400-e29b-41d4-a716-446655440002",
  title: "Web3 & Blockchain Challenge",
  description:
    "Explore the future of decentralized applications! Build innovative solutions using blockchain technology, smart contracts, and Web3 protocols.",
  startDate: new Date("2024-04-20T09:00:00.000Z"),
  endDate: new Date("2024-04-22T21:00:00.000Z"),
  registrationDate: new Date("2024-03-20T09:00:00.000Z"),
  location: "Virtual",
  maxTeamSize: 5,
  mode: "ONLINE",
  status: "COMPLETED",
  bannerImageUrl:
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200",
  createdBy: {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Sarah Johnson",
    profileImageUrl:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
  },
  registeredParticipants: 234,
  tags: ["Web3", "Blockchain", "Smart Contracts", "DeFi", "NFT"],
  tabs: [
    {
      title: "Challenge Details",
      content:
        "# Web3 & Blockchain Challenge\n\nBuild the next generation of decentralized applications using cutting-edge blockchain technology.\n\n## Focus Areas:\n- DeFi (Decentralized Finance)\n- NFT Marketplaces\n- DAOs (Decentralized Autonomous Organizations)\n- Cross-chain solutions\n- Web3 social platforms\n\n## Supported Blockchains:\n- Ethereum\n- Polygon\n- Solana\n- Binance Smart Chain\n- Avalanche",
    },
    {
      title: "Resources",
      content:
        "# Development Resources\n\n## APIs & Tools\n- Alchemy API for blockchain data\n- MetaMask integration guides\n- OpenZeppelin contracts library\n- Hardhat development environment\n- IPFS for decentralized storage\n\n## Workshops\n- Smart Contract Development (Day 1, 2 PM UTC)\n- DeFi Protocol Design (Day 1, 6 PM UTC)\n- Frontend Integration (Day 2, 10 AM UTC)\n\n## Mentors Available\n- Blockchain architects\n- Smart contract auditors\n- Web3 UX designers",
    },
  ],
};

// Climate Tech Innovation Summit
const climateHackathon: FindHackathonDto = {
  id: "hack-550e8400-e29b-41d4-a716-446655440003",
  title: "Climate Tech Innovation Summit",
  description:
    "Address climate change through technology! Build solutions for renewable energy, carbon tracking, sustainable agriculture, or environmental monitoring.",
  startDate: new Date("2024-05-10T08:00:00.000Z"),
  endDate: new Date("2024-05-12T20:00:00.000Z"),
  registrationDate: new Date("2024-04-10T09:00:00.000Z"),
  location: "New York, NY",
  maxTeamSize: 6,
  mode: "HYBRID",
  status: "COMPLETED",
  bannerImageUrl:
    "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=1200",
  createdBy: {
    id: "550e8400-e29b-41d4-a716-446655440004",
    name: "Michael Chen",
    profileImageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  },
  registeredParticipants: 189,
  tags: [
    "Climate Tech",
    "Sustainability",
    "Green Energy",
    "Carbon Tracking",
    "IoT",
  ],
  tabs: [
    {
      title: "Mission",
      content:
        "# Fighting Climate Change Through Innovation\n\nJoin us in developing technology solutions to combat climate change and promote environmental sustainability.\n\n## Key Challenge Areas:\n- **Renewable Energy**: Smart grid solutions, energy storage optimization\n- **Carbon Management**: Tracking, reporting, and offset solutions\n- **Sustainable Agriculture**: Precision farming, crop monitoring\n- **Environmental Monitoring**: Air quality sensors, ecosystem tracking\n- **Circular Economy**: Waste reduction, recycling optimization",
    },
    {
      title: "Venue & Schedule",
      content:
        "# Event Information\n\n## 📍 Venue\n**Climate Tech Hub NYC**\n123 Innovation Drive\nNew York, NY 10001\n\n## 📅 Schedule\n\n### Friday, May 10\n- 8:00 AM - Registration & Breakfast\n- 9:00 AM - Opening Ceremony\n- 10:00 AM - Team Formation\n- 12:00 PM - Hacking Begins\n\n### Saturday, May 11\n- 9:00 AM - Mentor Sessions\n- 12:00 PM - Lunch & Networking\n- 6:00 PM - Progress Check-in\n\n### Sunday, May 12\n- 10:00 AM - Final Sprint\n- 3:00 PM - Submissions Due\n- 4:00 PM - Presentations\n- 7:00 PM - Awards Ceremony",
    },
  ],
};

// HealthTech Revolution 2024
const healthHackathon: FindHackathonDto = {
  id: "hack-550e8400-e29b-41d4-a716-446655440004",
  title: "HealthTech Revolution 2024",
  description:
    "Transform healthcare with cutting-edge technology. Build solutions for telemedicine, health monitoring, medical AI, or patient care management.",
  startDate: new Date("2024-06-01T10:00:00.000Z"),
  endDate: new Date("2024-06-03T18:00:00.000Z"),
  registrationDate: new Date("2024-05-01T09:00:00.000Z"),
  location: "San Francisco, CA",
  maxTeamSize: 4,
  mode: "OFFLINE",
  status: "UPCOMING",
  bannerImageUrl:
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200",
  createdBy: {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "Dr. Emily Rodriguez",
    profileImageUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150",
  },
  registeredParticipants: 87,
  tags: ["HealthTech", "Telemedicine", "Medical AI", "IoT", "Digital Health"],
  tabs: [
    {
      title: "Healthcare Innovation",
      content:
        "# Revolutionizing Healthcare Through Technology\n\nJoin healthcare professionals, developers, and innovators to build the future of healthcare technology.\n\n## Focus Areas:\n\n### 🏥 Telemedicine\n- Remote consultation platforms\n- Virtual health monitoring\n- Digital therapeutics\n\n### 🤖 Medical AI\n- Diagnostic assistance tools\n- Drug discovery platforms\n- Predictive analytics\n\n### 📱 Digital Health\n- Patient engagement apps\n- Health data visualization\n- Wearable device integration\n\n### 🔒 Health Data Security\n- HIPAA-compliant solutions\n- Blockchain for medical records\n- Privacy-preserving analytics",
    },
    {
      title: "Expert Partners",
      content:
        "# Healthcare Industry Partners\n\n## 🏥 Medical Institutions\n- UCSF Medical Center\n- Stanford Healthcare\n- Kaiser Permanente\n\n## 💊 Pharmaceutical Partners\n- Pfizer Innovation Labs\n- Johnson & Johnson Innovation\n- Roche Diagnostics\n\n## 💻 Technology Partners\n- Google Health\n- Microsoft Healthcare Bot\n- AWS Health Lake\n\n## 👨‍⚕️ Expert Mentors\n- Board-certified physicians\n- Healthcare IT specialists\n- Regulatory compliance experts\n- Digital health entrepreneurs",
    },
  ],
};

// Mobile App Innovation Challenge
const mobileHackathon: FindHackathonDto = {
  id: "hack-550e8400-e29b-41d4-a716-446655440005",
  title: "Mobile App Innovation Challenge",
  description:
    "Create the next breakthrough mobile application! Focus on user experience, performance, and solving real-world problems through mobile technology.",
  startDate: new Date("2024-07-15T12:00:00.000Z"),
  endDate: new Date("2024-07-17T12:00:00.000Z"),
  registrationDate: new Date("2024-06-15T10:00:00.000Z"),
  location: "Online",
  maxTeamSize: 4,
  mode: "ONLINE",
  status: "UPCOMING",
  bannerImageUrl:
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200",
  createdBy: {
    id: "550e8400-e29b-41d4-a716-446655440005",
    name: "Alex Kim",
    profileImageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
  },
  registeredParticipants: 142,
  tags: [
    "Mobile Development",
    "React Native",
    "Flutter",
    "iOS",
    "Android",
    "UX/UI",
  ],
  tabs: [
    {
      title: "Challenge Overview",
      content:
        "# Mobile App Innovation Challenge\n\nBuild innovative mobile applications that solve real-world problems with exceptional user experience.\n\n## Categories:\n\n### 📱 Productivity Apps\n- Task management solutions\n- Collaboration tools\n- Time tracking applications\n\n### 🎮 Entertainment & Gaming\n- Casual mobile games\n- Social entertainment platforms\n- AR/VR experiences\n\n### 🛍️ E-commerce & Marketplace\n- Shopping experiences\n- Peer-to-peer marketplaces\n- Payment solutions\n\n### 🎓 Education & Learning\n- Language learning apps\n- Skill development platforms\n- Educational games",
    },
    {
      title: "Development Guidelines",
      content:
        "# Development Requirements\n\n## Supported Platforms\n- **iOS**: Swift, SwiftUI, UIKit\n- **Android**: Kotlin, Java, Jetpack Compose\n- **Cross-platform**: React Native, Flutter, Xamarin\n\n## Submission Requirements\n- Working mobile app (iOS/Android)\n- Source code repository\n- App demo video (max 3 minutes)\n- Technical documentation\n- User guide/README\n\n## Evaluation Criteria\n- **User Experience (30%)**: Intuitive design, smooth interactions\n- **Technical Implementation (25%)**: Code quality, performance\n- **Innovation (25%)**: Unique features, creative solutions\n- **Market Potential (20%)**: Real-world applicability, scalability\n\n## Resources\n- Free design assets from Figma Community\n- Backend services (Firebase, AWS Free Tier)\n- Beta testing with TestFlight/Google Play Console",
    },
  ],
};

// EdTech Future Builders
const edtechHackathon: FindHackathonDto = {
  id: "hack-550e8400-e29b-41d4-a716-446655440006",
  title: "EdTech Future Builders",
  description:
    "Revolutionize education through technology! Build platforms, tools, or applications that enhance learning experiences for students and educators.",
  startDate: new Date("2024-08-10T09:00:00.000Z"),
  endDate: new Date("2024-08-12T17:00:00.000Z"),
  registrationDate: new Date("2024-07-10T08:00:00.000Z"),
  location: "Boston, MA",
  maxTeamSize: 5,
  mode: "HYBRID",
  status: "UPCOMING",
  bannerImageUrl:
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200",
  createdBy: {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Jennifer Walsh",
    profileImageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
  },
  registeredParticipants: 98,
  tags: ["EdTech", "E-Learning", "Educational Games", "LMS", "Virtual Reality"],
  tabs: [
    {
      title: "Education Revolution",
      content:
        "# Transforming Education Through Technology\n\nJoin educators, developers, and innovators to build the future of educational technology.\n\n## Challenge Tracks:\n\n### 🎓 K-12 Education\n- Interactive learning platforms\n- Classroom management tools\n- Parent-teacher communication\n- Student assessment systems\n\n### 🏫 Higher Education\n- Online course platforms\n- Research collaboration tools\n- Campus management solutions\n- Career guidance systems\n\n### 👨‍💼 Professional Development\n- Skill-based learning paths\n- Corporate training platforms\n- Certification management\n- Micro-learning solutions\n\n### ♿ Accessibility in Education\n- Tools for students with disabilities\n- Multilingual learning platforms\n- Adaptive learning technologies",
    },
    {
      title: "Educational Partners",
      content:
        "# Partner Institutions & Resources\n\n## 🏫 Academic Partners\n- Harvard Graduate School of Education\n- MIT Open Learning\n- Boston University School of Education\n- Northeastern University\n\n## 📚 Content Partners\n- Khan Academy\n- Coursera for Business\n- edX\n- Pearson Education\n\n## 🛠️ Technology Resources\n- Learning Management System APIs\n- Educational content databases\n- Student information system integrations\n- Assessment and analytics tools\n\n## 👩‍🏫 Expert Mentors\n- Educational technology researchers\n- K-12 teachers and administrators\n- Online learning specialists\n- UX designers focused on education",
    },
  ],
};

// FinTech Forward Summit
const fintechHackathon: FindHackathonDto = {
  id: "hack-550e8400-e29b-41d4-a716-446655440007",
  title: "FinTech Forward Summit",
  description:
    "Innovate in financial technology! Develop solutions for secure transactions, personal finance, blockchain in finance, or investment platforms.",
  startDate: new Date("2024-09-05T09:00:00.000Z"),
  endDate: new Date("2024-09-07T18:00:00.000Z"),
  registrationDate: new Date("2024-08-05T09:00:00.000Z"),
  location: "London, UK",
  maxTeamSize: 4,
  mode: "OFFLINE",
  status: "UPCOMING",
  bannerImageUrl:
    "https://images.unsplash.com/photo-1590283084650-f80e9a8f4c7d?w=1200",
  createdBy: {
    id: "550e8400-e29b-41d4-a716-446655440006",
    name: "David Thompson",
    profileImageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
  },
  registeredParticipants: 67,
  tags: [
    "FinTech",
    "Banking",
    "Payments",
    "Investment",
    "RegTech",
    "InsurTech",
  ],
  tabs: [
    {
      title: "Financial Innovation",
      content:
        "# The Future of Financial Technology\n\nBuild cutting-edge financial solutions that reshape how people interact with money and financial services.\n\n## Innovation Areas:\n\n### 💳 Digital Payments\n- Contactless payment solutions\n- Cross-border remittances\n- Cryptocurrency integration\n- Mobile wallet innovations\n\n### 🏦 Digital Banking\n- Neobank platforms\n- Open banking APIs\n- Account aggregation\n- Financial chatbots\n\n### 📈 Investment & Trading\n- Robo-advisors\n- Social trading platforms\n- Portfolio management tools\n- Risk assessment algorithms\n\n### 🛡️ Security & Compliance\n- Fraud detection systems\n- KYC/AML automation\n- Regulatory reporting tools\n- Cybersecurity solutions",
    },
    {
      title: "Industry Support",
      content:
        "# Financial Industry Partners\n\n## 🏦 Banking Partners\n- Barclays\n- HSBC Innovation\n- Lloyds Banking Group\n- Santander InnoVentures\n\n## 💳 Payment Processors\n- Visa Innovation Centers\n- Mastercard Start Path\n- PayPal Developer Platform\n- Stripe Connect\n\n## 📊 Financial Data Providers\n- Bloomberg Terminal API\n- Refinitiv (formerly Reuters)\n- S&P Capital IQ\n- Alpha Vantage\n\n## 🏛️ Regulatory Bodies\n- Financial Conduct Authority (FCA)\n- Bank of England\n- Payment Systems Regulator\n\n## 💼 Mentorship\n- Senior banking executives\n- FinTech startup founders\n- Regulatory compliance experts\n- Venture capital investors",
    },
  ],
};

export const sampleHackathonData = {
  aiHackathon,
  web3Hackathon,
  climateHackathon,
  healthHackathon,
  mobileHackathon,
  edtechHackathon,
  fintechHackathon,
};
