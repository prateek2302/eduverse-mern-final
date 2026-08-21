import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, Moon, Sun, Heart, Play, Star, Users, Clock, Award, 
  BookOpen, Video, CheckCircle2, ChevronDown, ChevronRight, 
  Menu, X, GraduationCap, TrendingUp, Layers, Briefcase, 
  BarChart3, Palette, Code2, Sparkles, ArrowRight, 
  LayoutDashboard, Plus, Edit3, Trash2, LogOut, User,
  FileText, MessageCircle, HelpCircle, Trophy, Timer,
  Filter, SlidersHorizontal, Bookmark, Share2, Globe
} from 'lucide-react';

// --- TYPES ---
type Lesson = { id: string; title: string; duration: string; type: 'video' | 'article' | 'quiz'; preview?: boolean };
type Module = { id: string; title: string; lessons: Lesson[] };
type Review = { id: string; name: string; avatar: string; rating: number; comment: string; date: string };
type Instructor = { name: string; initials: string; bio: string; students: string; courses: number; rating: number };
type Course = {
  id: string;
  title: string;
  description: string;
  longDesc: string;
  thumbnail: string;
  gradient: string;
  instructor: Instructor;
  rating: number;
  reviewsCount: number;
  students: number;
  price: number;
  originalPrice: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  modules: Module[];
  whatYouLearn: string[];
  reviews: Review[];
  language: string;
  lastUpdated: string;
  bestseller?: boolean;
};
type UserType = { id: string; name: string; email: string; initials: string; role: 'student' | 'instructor' | 'both' };
type Toast = { id: string; msg: string; type: 'success' | 'info' | 'error' };

// --- MOCK DATA ---
const CATEGORIES = [
  { id: 'Development', label: 'Development', icon: Code2, count: 342, color: 'bg-violet-500' },
  { id: 'Design', label: 'Design', icon: Palette, count: 128, color: 'bg-fuchsia-500' },
  { id: 'Business', label: 'Business', icon: Briefcase, count: 89, color: 'bg-amber-500' },
  { id: 'Marketing', label: 'Marketing', icon: TrendingUp, count: 76, color: 'bg-emerald-500' },
  { id: 'Data Science', label: 'Data Science', icon: BarChart3, count: 112, color: 'bg-blue-500' },
];

const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Complete React & Node.js Bootcamp 2025',
    description: 'Master full-stack development with React, Node, Express & MongoDB. Build 6 real projects.',
    longDesc: 'Go from zero to deployed full-stack apps. You’ll learn modern React 19, Server Components, Node.js, Express, MongoDB, authentication, payments, and deployment on Vercel.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800',
    gradient: 'from-violet-600 to-indigo-600',
    instructor: { name: 'Aarav Mehta', initials: 'AM', bio: 'Ex-FAANG engineer, 10+ years building scale systems. Taught 200k+ students.', students: '214k', courses: 12, rating: 4.8 },
    rating: 4.8, reviewsCount: 12432, students: 48290, price: 2499, originalPrice: 8999, duration: '54h 20m', level: 'Intermediate', category: 'Development',
    modules: [
      { id: 'm1', title: 'React Fundamentals & Hooks', lessons: [
        { id: 'l1', title: 'Why React in 2025?', duration: '08:12', type: 'video', preview: true },
        { id: 'l2', title: 'useState, useEffect deep dive', duration: '22:40', type: 'video' },
        { id: 'l3', title: 'Building custom hooks', duration: '18:05', type: 'video' },
        { id: 'l4', title: 'Article: React mental models', duration: '10 min', type: 'article' },
      ]},
      { id: 'm2', title: 'Advanced State & Performance', lessons: [
        { id: 'l5', title: 'Zustand vs Redux Toolkit', duration: '16:30', type: 'video' },
        { id: 'l6', title: 'Memoization masterclass', duration: '20:11', type: 'video' },
        { id: 'l7', title: 'Quiz: Performance', duration: '5 Qs', type: 'quiz' },
      ]},
      { id: 'm3', title: 'Node.js Backend & Auth', lessons: [
        { id: 'l8', title: 'Express + MongoDB setup', duration: '24:00', type: 'video' },
        { id: 'l9', title: 'JWT & OAuth flows', duration: '19:45', type: 'video' },
      ]},
      { id: 'm4', title: 'Deployment & Scaling', lessons: [
        { id: 'l10', title: 'Deploy to Vercel & Render', duration: '14:22', type: 'video' },
      ]},
    ],
    whatYouLearn: ['Build production React apps with Next.js', 'Design secure REST APIs with Node', 'Implement auth, payments, real-time features', 'Deploy & scale to 100k users'],
    reviews: [
      { id: 'r1', name: 'Sneha P.', avatar: 'SP', rating: 5, comment: 'Best React course I have taken. Projects are real-world.', date: '2 days ago' },
      { id: 'r2', name: 'Rohan K.', avatar: 'RK', rating: 4, comment: 'Depth is amazing, some modules fast but rewatched.', date: '1 week ago' },
    ],
    language: 'English, Hindi', lastUpdated: 'Oct 2025', bestseller: true,
  },
  {
    id: 'c2', title: 'UI/UX Design Mastery: Figma to Framer', description: 'Learn to design delightful products. Systems, research, prototyping & handoff.',
    longDesc: 'Complete product design workflow from user research to hi-fi prototype and developer handoff. Includes design system creation.',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800', gradient: 'from-fuchsia-600 to-pink-600',
    instructor: { name: 'Ananya Rao', initials: 'AR', bio: 'Product designer at Linear, ex-Notion. 8 yrs crafting design systems.', students: '98k', courses: 4, rating: 4.9 },
    rating: 4.9, reviewsCount: 8321, students: 21340, price: 1999, originalPrice: 5999, duration: '32h 10m', level: 'Beginner', category: 'Design',
    modules: [
      { id: 'm1', title: 'Foundations & Psychology', lessons: [
        { id: 'l1', title: 'Visual hierarchy & Gestalt', duration: '12:10', type: 'video', preview: true },
        { id: 'l2', title: 'Typography & color systems', duration: '19:00', type: 'video' },
        { id: 'l3', title: 'Design brief exercise', duration: '15 min', type: 'article' },
      ]},
      { id: 'm2', title: 'Figma Auto Layout 5.0', lessons: [
        { id: 'l4', title: 'Components & variants', duration: '22:15', type: 'video' },
        { id: 'l5', title: 'Building design system', duration: '30:00', type: 'video' },
      ]},
      { id: 'm3', title: 'Prototyping in Framer', lessons: [
        { id: 'l6', title: 'Interactive prototype', duration: '18:40', type: 'video' },
      ]},
    ],
    whatYouLearn: ['Research & wireframing', 'Build scalable design systems', 'Prototype & animate in Framer', 'Portfolio-ready case studies'],
    reviews: [{ id: 'r1', name: 'Ishita M.', avatar: 'IM', rating: 5, comment: 'So polished and practical. Got my first job!', date: '3 days ago' }],
    language: 'English', lastUpdated: 'Sep 2025', bestseller: true,
  },
  {
    id: 'c3', title: 'Python for Data Science & ML A-Z', description: 'Pandas, NumPy, Matplotlib, Scikit-Learn, projects on real datasets.',
    longDesc: 'End-to-end data science with Python. Clean, analyze, visualize and model data. Build ML pipelines.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800', gradient: 'from-blue-600 to-cyan-600',
    instructor: { name: 'Vikram Singh', initials: 'VS', bio: 'Data scientist, Kaggle Master, ML lead at Fintech unicorn.', students: '156k', courses: 6, rating: 4.7 },
    rating: 4.7, reviewsCount: 10211, students: 35200, price: 2999, originalPrice: 9999, duration: '48h 00m', level: 'Intermediate', category: 'Data Science',
    modules: [
      { id: 'm1', title: 'Python & Data Wrangling', lessons: [{ id: 'l1', title: 'Pandas deep dive', duration: '28:00', type: 'video', preview: true }]},
      { id: 'm2', title: 'EDA & Visualization', lessons: [{ id: 'l2', title: 'Matplotlib to Plotly', duration: '20:00', type: 'video' }]},
      { id: 'm3', title: 'Machine Learning', lessons: [{ id: 'l3', title: 'From linear to XGBoost', duration: '35:00', type: 'video' }]},
    ],
    whatYouLearn: ['Python for data analysis', 'Storytelling with visualizations', 'Build & deploy ML models', 'SQL + Python workflow'],
    reviews: [{ id: 'r1', name: 'Aditya L.', avatar: 'AL', rating: 5, comment: 'Projects are gold.', date: '5 days ago' }],
    language: 'English', lastUpdated: 'Aug 2025',
  },
  {
    id: 'c4', title: 'Digital Marketing: Performance & Brand', description: 'Meta, Google Ads, SEO, funnels, analytics - build a growth engine.',
    longDesc: 'Learn to run profitable campaigns across Meta & Google with ₹10L+ budget management simulations.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800', gradient: 'from-emerald-600 to-teal-600',
    instructor: { name: 'Nisha Gupta', initials: 'NG', bio: 'Growth at Zomato, scaled D2C to ₹50Cr ARR.', students: '74k', courses: 3, rating: 4.6 },
    rating: 4.6, reviewsCount: 4211, students: 12400, price: 1799, originalPrice: 4999, duration: '26h 15m', level: 'Beginner', category: 'Marketing',
    modules: [
      { id: 'm1', title: 'Growth Foundations', lessons: [{ id: 'l1', title: 'Funnel & ICP', duration: '15:00', type: 'video', preview: true }]},
      { id: 'm2', title: 'Paid Acquisition', lessons: [{ id: 'l2', title: 'Meta Ads Lab', duration: '40:00', type: 'video' }]},
    ],
    whatYouLearn: ['Meta & Google Ads', 'SEO content system', 'Analytics & attribution', 'Landing page CRO'],
    reviews: [{ id: 'r1', name: 'Karan S.', avatar: 'KS', rating: 4, comment: 'Very actionable.', date: '1 week ago' }],
    language: 'English, Hindi', lastUpdated: 'Sep 2025',
  },
  {
    id: 'c5', title: 'Business Strategy: Zero to One Playbook', description: 'Frameworks from top founders. Pricing, moats, hiring & fundraising.',
    longDesc: 'How to think like a founder. Live case studies from Indian unicorns.',
    thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800', gradient: 'from-amber-600 to-orange-600',
    instructor: { name: 'Rahul Bajaj', initials: 'RB', bio: '2x founder, YC alum, angel in 40+ startups.', students: '56k', courses: 2, rating: 4.8 },
    rating: 4.8, reviewsCount: 3210, students: 8900, price: 3499, originalPrice: 11999, duration: '18h 30m', level: 'Advanced', category: 'Business',
    modules: [{ id: 'm1', title: 'Ideas & Validation', lessons: [{ id: 'l1', title: 'Finding PMF', duration: '20:00', type: 'video' }]}],
    whatYouLearn: ['Validate ideas fast', 'Build moats', 'Fundraising narrative', 'Hire A-team'],
    reviews: [{ id: 'r1', name: 'Pooja J.', avatar: 'PJ', rating: 5, comment: 'Changed my perspective.', date: '2 weeks ago' }],
    language: 'English', lastUpdated: 'Oct 2025',
  },
  {
    id: 'c6', title: 'Next.js 15 & Tailwind Mastery', description: 'App Router, RSC, Actions, and stunning UI patterns.',
    longDesc: 'Build lightning fast, beautiful apps with Next.js 15 and Tailwind 4.',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800', gradient: 'from-slate-800 to-violet-700',
    instructor: { name: 'Aarav Mehta', initials: 'AM', bio: 'Ex-FAANG engineer', students: '214k', courses: 12, rating: 4.8 },
    rating: 4.9, reviewsCount: 5432, students: 18700, price: 2299, originalPrice: 6999, duration: '28h 45m', level: 'Intermediate', category: 'Development',
    modules: [{ id: 'm1', title: 'App Router', lessons: [{ id: 'l1', title: 'RSC explained', duration: '18:00', type: 'video', preview: true }]}],
    whatYouLearn: ['App Router & RSC', 'Server Actions', 'Tailwind patterns', 'Deploy edge'],
    reviews: [{ id: 'r1', name: 'Dev A.', avatar: 'DA', rating: 5, comment: 'Best Next.js course.', date: 'Yesterday' }],
    language: 'English', lastUpdated: 'Oct 2025', bestseller: true,
  },
  {
    id: 'c7', title: 'Brand Design & Identity Systems', description: 'Logo, type, color, guidelines - create iconic brands.',
    longDesc: 'End-to-end brand identity process used at Pentagram.',
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-6dd65b279390?q=80&w=800', gradient: 'from-pink-600 to-rose-600',
    instructor: { name: 'Ananya Rao', initials: 'AR', bio: 'Product designer at Linear', students: '98k', courses: 4, rating: 4.9 },
    rating: 4.7, reviewsCount: 2120, students: 6700, price: 0, originalPrice: 0, duration: '14h 20m', level: 'Beginner', category: 'Design',
    modules: [{ id: 'm1', title: 'Brand Strategy', lessons: [{ id: 'l1', title: 'Discovery', duration: '12:00', type: 'video' }]}],
    whatYouLearn: ['Brand strategy', 'Identity creation', 'Guidelines', 'Client presentation'],
    reviews: [], language: 'English', lastUpdated: 'Jul 2025',
  },
  {
    id: 'c8', title: 'SQL & Data Analytics Bootcamp', description: 'From SELECT to window functions, CTEs and real dashboards.',
    longDesc: 'Become analytics-ready with SQL, Sheets, and Looker.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800', gradient: 'from-indigo-600 to-blue-600',
    instructor: { name: 'Vikram Singh', initials: 'VS', bio: 'Data scientist', students: '156k', courses: 6, rating: 4.7 },
    rating: 4.6, reviewsCount: 3980, students: 14200, price: 1499, originalPrice: 3999, duration: '22h 10m', level: 'Beginner', category: 'Data Science',
    modules: [{ id: 'm1', title: 'SQL Fundamentals', lessons: [{ id: 'l1', title: 'Joins & aggregations', duration: '20:00', type: 'video' }]}],
    whatYouLearn: ['Advanced SQL', 'Dashboard design', 'Stakeholder storytelling'],
    reviews: [], language: 'English', lastUpdated: 'Aug 2025',
  },
  {
    id: 'c9', title: 'Copywriting that Converts', description: 'Write landing pages, ads, emails that print money.',
    longDesc: 'Psychology backed copy frameworks.',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800', gradient: 'from-teal-600 to-emerald-600',
    instructor: { name: 'Nisha Gupta', initials: 'NG', bio: 'Growth at Zomato', students: '74k', courses: 3, rating: 4.6 },
    rating: 4.8, reviewsCount: 1870, students: 5400, price: 999, originalPrice: 2999, duration: '12h 00m', level: 'Beginner', category: 'Marketing',
    modules: [{ id: 'm1', title: 'Frameworks', lessons: [{ id: 'l1', title: 'PAS & AIDA', duration: '15:00', type: 'video' }]}],
    whatYouLearn: ['Landing copy', 'Ad copy', 'Email sequences'],
    reviews: [], language: 'English', lastUpdated: 'Sep 2025',
  },
  {
    id: 'c10', title: 'Advanced TypeScript & System Design', description: 'Generics, design patterns, system design for frontend.',
    longDesc: 'Level up TS and architecture.',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800', gradient: 'from-zinc-800 to-zinc-600',
    instructor: { name: 'Aarav Mehta', initials: 'AM', bio: 'Ex-FAANG', students: '214k', courses: 12, rating: 4.8 },
    rating: 4.9, reviewsCount: 3421, students: 9800, price: 2799, originalPrice: 7999, duration: '30h 00m', level: 'Advanced', category: 'Development',
    modules: [{ id: 'm1', title: 'TS Deep', lessons: [{ id: 'l1', title: 'Generics', duration: '22:00', type: 'video' }]}],
    whatYouLearn: ['Advanced generics', 'System design', 'Testing'],
    reviews: [], language: 'English', lastUpdated: 'Oct 2025',
  },
  {
    id: 'c11', title: 'No-Code Product Builder (Bubble + AI)', description: 'Build and launch MVPs without code using AI tools.',
    longDesc: 'Ship in 7 days.',
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800', gradient: 'from-violet-600 to-fuchsia-600',
    instructor: { name: 'Rahul Bajaj', initials: 'RB', bio: '2x founder', students: '56k', courses: 2, rating: 4.8 },
    rating: 4.5, reviewsCount: 980, students: 3200, price: 1999, originalPrice: 4999, duration: '16h 40m', level: 'Beginner', category: 'Business',
    modules: [{ id: 'm1', title: 'Idea to MVP', lessons: [{ id: 'l1', title: 'Bubble basics', duration: '18:00', type: 'video' }]}],
    whatYouLearn: ['No-code stack', 'AI integrations', 'Launch'],
    reviews: [], language: 'English', lastUpdated: 'Sep 2025',
  },
  {
    id: 'c12', title: 'Figma Motion & Prototyping', description: 'Micro-interactions that delight users and boost conversion.',
    longDesc: 'Motion as a design tool.',
    thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=800', gradient: 'from-orange-600 to-amber-600',
    instructor: { name: 'Ananya Rao', initials: 'AR', bio: 'Product designer', students: '98k', courses: 4, rating: 4.9 },
    rating: 4.7, reviewsCount: 1650, students: 4100, price: 1299, originalPrice: 3499, duration: '10h 30m', level: 'Intermediate', category: 'Design',
    modules: [{ id: 'm1', title: 'Motion principles', lessons: [{ id: 'l1', title: 'Easing & timing', duration: '14:00', type: 'video' }]}],
    whatYouLearn: ['Motion design', 'Smart animate', 'Handoff'],
    reviews: [], language: 'English', lastUpdated: 'Aug 2025',
  },
];

const QUIZ_DATA: Record<string, { q: string; opts: string[]; ans: number }[]> = {
  c1: [
    { q: 'What hook replaces componentDidMount + componentDidUpdate?', opts: ['useEffect', 'useLayoutEffect', 'useMemo', 'useReducer'], ans: 0 },
    { q: 'Which is best for global async state?', opts: ['useState', 'Context + Zustand', 'useRef', 'useCallback'], ans: 1 },
    { q: 'How to prevent unnecessary re-renders?', opts: ['React.memo + useMemo', 'More useState', 'Inline functions', 'CSS'], ans: 0 },
  ],
  default: [
    { q: 'What makes a product great?', opts: ['Solving real pain', 'More features', 'Cheapest price', 'Complex UI'], ans: 0 },
    { q: 'Best way to learn?', opts: ['Passive watching', 'Build projects', 'Only theory', 'Skip docs'], ans: 1 },
    { q: 'What drives growth?', opts: ['Distribution', 'Luck only', 'Copy competitors', 'No measurement'], ans: 0 },
  ]
};

// --- MAIN APP ---
export default function App() {
  // Theme
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    const saved = localStorage.getItem('eduverse_theme') as any;
    if (saved) setTheme(saved);
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
  }, []);
  useEffect(() => { localStorage.setItem('eduverse_theme', theme); }, [theme]);

  // Core state
  const [view, setView] = useState<'home' | 'catalog' | 'detail' | 'learning' | 'player' | 'instructor'>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('c1');
  const [courses, setCourses] = useState<Course[]>(() => {
    const extra = localStorage.getItem('eduverse_extra_courses');
    if (extra) { try { return [...MOCK_COURSES, ...JSON.parse(extra)]; } catch { return MOCK_COURSES; } }
    return MOCK_COURSES;
  });
  const [user, setUser] = useState<UserType | null>(() => {
    const s = localStorage.getItem('eduverse_user');
    return s ? JSON.parse(s) : null;
  });
  const [enrolled, setEnrolled] = useState<string[]>(() => {
    const s = localStorage.getItem('eduverse_enrolled');
    return s ? JSON.parse(s) : ['c2'];
  });
  const [progress, setProgress] = useState<Record<string, number>>(() => {
    const s = localStorage.getItem('eduverse_progress');
    return s ? JSON.parse(s) : { c2: 42 };
  });
  const [completedLessons, setCompletedLessons] = useState<Record<string, string[]>>(() => {
    const s = localStorage.getItem('eduverse_completed');
    return s ? JSON.parse(s) : { c2: ['l1', 'l2'] };
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const s = localStorage.getItem('eduverse_wishlist');
    return s ? JSON.parse(s) : ['c1'];
  });
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showAuth, setShowAuth] = useState<'login' | 'signup' | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ category: 'All', level: 'All', price: 'All', sort: 'popular' });
  const [activeModule, setActiveModule] = useState<string | null>('m1');
  const [playerTab, setPlayerTab] = useState<'overview' | 'notes' | 'qa' | 'quiz'>('overview');
  const [playerLessonId, setPlayerLessonId] = useState<string>('l1');
  const [notes, setNotes] = useState<Record<string, string>>(() => {
    const s = localStorage.getItem('eduverse_notes');
    return s ? JSON.parse(s) : {};
  });
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Persist
  useEffect(() => { localStorage.setItem('eduverse_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('eduverse_enrolled', JSON.stringify(enrolled)); }, [enrolled]);
  useEffect(() => { localStorage.setItem('eduverse_progress', JSON.stringify(progress)); }, [progress]);
  useEffect(() => { localStorage.setItem('eduverse_completed', JSON.stringify(completedLessons)); }, [completedLessons]);
  useEffect(() => { localStorage.setItem('eduverse_wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('eduverse_notes', JSON.stringify(notes)); }, [notes]);

  // Helpers
  const addToast = (msg: string, type: Toast['type'] = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  };

  const selectedCourse = useMemo(() => courses.find(c => c.id === selectedCourseId) || courses[0], [courses, selectedCourseId]);

  const filteredCourses = useMemo(() => {
    let list = [...courses];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(c => c.title.toLowerCase().includes(q) || c.instructor.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));
    }
    if (filters.category !== 'All') list = list.filter(c => c.category === filters.category);
    if (filters.level !== 'All') list = list.filter(c => c.level === filters.level);
    if (filters.price !== 'All') {
      if (filters.price === 'Free') list = list.filter(c => c.price === 0);
      if (filters.price === 'Paid') list = list.filter(c => c.price > 0);
      if (filters.price === 'Under 2000') list = list.filter(c => c.price > 0 && c.price < 2000);
    }
    if (filters.sort === 'rating') list.sort((a,b) => b.rating - a.rating);
    if (filters.sort === 'popular') list.sort((a,b) => b.students - a.students);
    if (filters.sort === 'price-low') list.sort((a,b) => a.price - b.price);
    if (filters.sort === 'price-high') list.sort((a,b) => b.price - a.price);
    if (filters.sort === 'newest') list.sort((a,b) => a.id.localeCompare(b.id));
    return list;
  }, [courses, search, filters]);

  // Actions
  const handleEnroll = (courseId: string) => {
    // TODO: Replace with POST /api/enroll { courseId }
    if (!user) { setShowAuth('signup'); addToast('Create account to enroll', 'info'); return; }
    if (enrolled.includes(courseId)) {
      setView('learning'); addToast('Already enrolled, continue learning');
      return;
    }
    setEnrolled(e => [...e, courseId]);
    setProgress(p => ({ ...p, [courseId]: 0 }));
    addToast('Enrolled successfully! 🎉');
    setView('learning');
  };

  const toggleWishlist = (courseId: string) => {
    // TODO: Replace with POST /api/wishlist/toggle
    if (wishlist.includes(courseId)) {
      setWishlist(w => w.filter(id => id !== courseId));
      addToast('Removed from wishlist', 'info');
    } else {
      setWishlist(w => [...w, courseId]);
      addToast('Added to wishlist ❤️');
    }
  };

  const markLessonComplete = (courseId: string, lessonId: string) => {
    // TODO: Replace with POST /api/progress {courseId, lessonId, completed:true}
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    const total = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const already = completedLessons[courseId] || [];
    if (already.includes(lessonId)) return;
    const updated = { ...completedLessons, [courseId]: [...already, lessonId] };
    setCompletedLessons(updated);
    const newCompletedCount = updated[courseId].length;
    const pct = Math.round((newCompletedCount / total) * 100);
    setProgress(p => ({ ...p, [courseId]: pct }));
    addToast(pct === 100 ? 'Course completed! Certificate ready 🏆' : `Progress ${pct}% — keep going!`);
  };

  const handleCreateCourse = (form: any) => {
    // TODO: Replace with POST /api/instructor/courses
    const newCourse: Course = {
      id: 'c' + (courses.length + 1) + Date.now().toString().slice(-3),
      title: form.title,
      description: form.desc.slice(0, 120),
      longDesc: form.desc,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800',
      gradient: 'from-violet-600 to-indigo-600',
      instructor: { name: user?.name || 'Instructor', initials: user?.initials || 'IN', bio: 'Instructor on EduVerse', students: '0', courses: 1, rating: 5 },
      rating: 4.9, reviewsCount: 0, students: 0, price: Number(form.price) || 0, originalPrice: Number(form.price) * 2 || 0,
      duration: form.duration || '10h', level: form.level, category: form.category,
      modules: [
        { id: 'm1', title: 'Module 1: Introduction', lessons: [
          { id: 'l1', title: 'Welcome & Overview', duration: '08:00', type: 'video', preview: true },
          { id: 'l2', title: 'Setup', duration: '12:00', type: 'video' },
        ]},
        { id: 'm2', title: 'Module 2: Core Concepts', lessons: [
          { id: 'l3', title: 'Deep dive', duration: '20:00', type: 'video' },
          { id: 'l4', title: 'Quiz', duration: '5 Qs', type: 'quiz' },
        ]},
      ],
      whatYouLearn: form.learnings.split('\n').filter(Boolean).slice(0,4),
      reviews: [], language: 'English', lastUpdated: 'Just now', bestseller: false,
    };
    const updated = [...courses, newCourse];
    setCourses(updated);
    localStorage.setItem('eduverse_extra_courses', JSON.stringify(updated.slice(MOCK_COURSES.length)));
    addToast('Course published! Live in catalog 🚀');
    setView('catalog');
  };

  const totalLessons = (c: Course) => c.modules.reduce((a,m)=>a+m.lessons.length,0);

  // --- UI COMPONENTS ---
  const CourseCard = ({ course, compact }: { course: Course; compact?: boolean }) => (
    <div 
      onClick={() => { setSelectedCourseId(course.id); setView('detail'); window.scrollTo(0,0); }}
      className={`group relative flex flex-col bg-white dark:bg-zinc-900 rounded-[22px] border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all cursor-pointer ${compact ? '' : 'h-full'}`}
    >
      {course.bestseller && <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-amber-400 text-[11px] font-bold text-zinc-900 tracking-wide">Bestseller</span>}
      <button 
        onClick={(e)=>{ e.stopPropagation(); toggleWishlist(course.id); }}
        className="absolute top-3 right-3 z-10 w-8 h-8 grid place-items-center rounded-full bg-white/90 dark:bg-zinc-800 backdrop-blur shadow"
      >
        <Heart className={`w-4 h-4 ${wishlist.includes(course.id) ? 'fill-rose-500 stroke-rose-500' : 'stroke-zinc-600 dark:stroke-zinc-300'}`} />
      </button>
      <div className="relative aspect-[16/9] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-90 group-hover:opacity-100 transition duration-500`} />
        <div className="absolute inset-0 grid place-items-center">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur border border-white/30 grid place-items-center text-white font-bold text-xl">
            {course.category.slice(0,2).toUpperCase()}
          </div>
        </div>
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          <span className="px-2 py-1 rounded-full bg-zinc-900/80 text-white text-[11px] backdrop-blur flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
          <span className="px-2 py-1 rounded-full bg-zinc-900/80 text-white text-[11px] backdrop-blur">{course.level}</span>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"><BookOpen className="w-32 h-32 text-white" /></div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300">{course.category}</span>
          <span className="flex items-center gap-1 text-[11px] text-zinc-500"><Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />{course.rating} ({course.reviewsCount.toLocaleString()})</span>
        </div>
        <h3 className="font-semibold leading-tight line-clamp-2 text-[15px] dark:text-white mb-1 group-hover:text-violet-600 transition">{course.title}</h3>
        <p className="text-[13px] text-zinc-500 line-clamp-2 mb-3">{course.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 grid place-items-center text-[11px] font-bold">{course.instructor.initials}</div>
            <span className="text-[12px] text-zinc-600 dark:text-zinc-400 truncate max-w-[90px]">{course.instructor.name}</span>
          </div>
          <div className="text-right">
            {course.price === 0 ? <span className="font-bold text-emerald-600">Free</span> : (
              <><span className="font-bold dark:text-white">₹{course.price.toLocaleString('en-IN')}</span> <span className="text-[11px] line-through text-zinc-400">₹{course.originalPrice.toLocaleString('en-IN')}</span></>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`${theme} min-h-screen font-[Inter,system-ui,sans-serif] antialiased bg-[#fcfcfd] dark:bg-[#0a0a0b] text-zinc-900 dark:text-zinc-100 selection:bg-violet-200`}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,700&display=swap');
        *{font-family:Inter,system-ui} .display{font-family:Fraunces,serif} ::-webkit-scrollbar{width:6px;height:6px} ::-webkit-scrollbar-thumb{background:#d4d4d8;border-radius:10px} .dark ::-webkit-scrollbar-thumb{background:#3f3f46}
      `}</style>

      {/* HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 h-[64px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <button onClick={()=>{
              if(view==='home'){ window.scrollTo({top:0, behavior:'smooth'}); addToast('You are on Home','info'); }
              else { setView('home'); window.scrollTo(0,0); }
            }} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 grid place-items-center text-white font-bold">E</div>
              <span className="display text-[20px] font-bold tracking-tight">EduVerse</span>
              <span className="hidden md:inline text-[10px] px-1.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-200 font-bold -mt-3">LIVE</span>
            </button>
            <nav className="hidden lg:flex items-center gap-1 ml-2">
              {[
                {k:'home', l:'Home'}, {k:'catalog', l:'Courses'}, {k:'learning', l:'My Learning'}, {k:'instructor', l:'Teach'}
              ].map(it => (
                <button key={it.k} onClick={()=>{
                  if(view===it.k){ window.scrollTo({top:0, behavior:'smooth'}); addToast(`${it.l} refreshed`,'info'); }
                  else { setView(it.k as any); window.scrollTo(0,0); }
                }} className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition ${view===it.k ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}`}>{it.l}</button>
              ))}
            </nav>
          </div>

          <div className="flex-1 max-w-[420px] hidden md:flex items-center">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input ref={searchRef} value={search} onChange={e=>{ setSearch(e.target.value); if(view!=='catalog') setView('catalog'); }} placeholder="Search courses, instructors..." className="w-full h-9 pl-9 pr-3 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-transparent focus:border-violet-300 focus:bg-white dark:focus:bg-zinc-900 outline-none text-[13px]" />
              {search && <button onClick={()=>setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 grid place-items-center rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800"><X className="w-3 h-3" /></button>}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={()=>setTheme(theme==='dark'?'light':'dark')} className="w-9 h-9 grid place-items-center rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"><span className="sr-only">Toggle theme</span>{theme==='dark'?<Sun className="w-4 h-4" />:<Moon className="w-4 h-4" />}</button>
            <button onClick={()=>{ if(!user){ setShowAuth('login'); return;} setView('learning'); }} className="hidden md:grid w-9 h-9 place-items-center rounded-full bg-zinc-100 dark:bg-zinc-800 relative">
              <Bookmark className="w-4 h-4" />
              {wishlist.length>0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] grid place-items-center rounded-full">{wishlist.length}</span>}
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <button onClick={()=>setView('learning')} className="hidden md:flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                  <div className="w-7 h-7 rounded-full bg-violet-600 grid place-items-center text-[11px] font-bold text-white">{user.initials}</div>
                  <span className="text-[13px] font-medium max-w-[80px] truncate">{user.name}</span>
                </button>
                <button onClick={()=>{ setUser(null); localStorage.removeItem('eduverse_user'); addToast('Logged out'); setView('home'); }} className="w-9 h-9 grid place-items-center rounded-full border border-zinc-200 dark:border-zinc-700"><LogOut className="w-4 h-4" /></button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <button onClick={()=>setShowAuth('login')} className="px-4 h-9 rounded-full text-[13px] font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800">Log in</button>
                <button onClick={()=>setShowAuth('signup')} className="px-4 h-9 rounded-full bg-violet-600 text-white text-[13px] font-semibold hover:bg-violet-700 shadow-[0_6px_20px_rgba(99,102,241,0.35)]">Sign up</button>
              </div>
            )}

            <button onClick={()=>setMobileMenu(v=>!v)} className="lg:hidden w-9 h-9 grid place-items-center rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"><Menu className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input value={search} onChange={e=>{ setSearch(e.target.value); if(view!=='catalog') setView('catalog'); }} placeholder="Search courses..." className="w-full h-10 pl-9 pr-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-transparent focus:border-violet-300 outline-none text-[14px]" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                {k:'home', l:'Home'}, {k:'catalog', l:'Courses'}, {k:'learning', l:'My Learning'}, {k:'instructor', l:'Teach'}
              ].map(it => (
                <button key={it.k} onClick={()=>{ setView(it.k as any); setMobileMenu(false); }} className={`h-10 rounded-xl text-[14px] font-medium ${view===it.k ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-900'}`}>{it.l}</button>
              ))}
            </div>
            {!user && (
              <div className="flex gap-2 pt-2">
                <button onClick={()=>{ setShowAuth('login'); setMobileMenu(false); }} className="flex-1 h-10 rounded-xl border font-medium">Log in</button>
                <button onClick={()=>{ setShowAuth('signup'); setMobileMenu(false); }} className="flex-1 h-10 rounded-xl bg-violet-600 text-white font-semibold">Sign up</button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* VIEWS */}
      <main className="max-w-[1440px] mx-auto px-4 md:px-6 pb-24">
        {/* HOME */}
        {view === 'home' && (
          <div className="space-y-16 pt-6 md:pt-10">
            {/* Hero */}
            <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950 border border-violet-200 dark:border-violet-800 text-[12px] font-medium text-violet-700 dark:text-violet-300 mb-4">
                  <Sparkles className="w-3.5 h-3.5" /> New: AI Mentor + Certificates live
                </div>
                <h1 className="display text-[40px] md:text-[64px] leading-[0.9] tracking-[-0.03em] font-bold">
                  Learn without<br />
                  <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">limits, build</span><br />
                  without pause.
                </h1>
                <p className="mt-4 text-[16px] md:text-[18px] text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[560px]">
                  EduVerse is the modern edtech OS — curated courses, real projects, mentor Q&A, and proof of work. Trusted by 10k+ learners building in India & beyond.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button onClick={()=>setView('catalog')} className="h-11 px-6 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold flex items-center gap-2">Explore courses <ArrowRight className="w-4 h-4" /></button>
                  <button onClick={()=>{ setSelectedCourseId('c1'); setView('detail'); }} className="h-11 px-6 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-semibold">Watch preview</button>
                </div>
                <div className="mt-8 flex items-center gap-6">
                  <div className="flex -space-x-2">
                    {[ 'SP','RK','IM','AL' ].map(i => <div key={i} className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 grid place-items-center text-[11px] font-bold border-2 border-white dark:border-zinc-900">{i}</div>)}
                  </div>
                  <div className="text-[13px] leading-tight">
                    <div className="flex items-center gap-1 font-semibold"><Star className="w-4 h-4 fill-amber-400 stroke-amber-400" /> 4.8/5 from 12k reviews</div>
                    <div className="text-zinc-500">Loved by learners at Razorpay, Swiggy, etc.</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-br from-violet-200 via-indigo-200 to-fuchsia-200 dark:from-violet-900/40 dark:via-indigo-900/30 dark:to-fuchsia-900/30 rounded-[32px] blur-2xl" />
                <div className="relative bg-white dark:bg-zinc-900 rounded-[28px] border border-zinc-200 dark:border-zinc-800 shadow-[0_24px_80px_rgba(0,0,0,0.12)] overflow-hidden">
                  <div className="p-4 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2 text-[12px] font-medium"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />Live: React Bootcamp</div>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-500"><Users className="w-3.5 h-3.5" />2.4k watching</div>
                  </div>
                  <div className="w-full aspect-[16/10] bg-gradient-to-br from-violet-600 via-indigo-600 to-fuchsia-600 grid place-items-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white_0%,transparent_50%)] opacity-20" />
                    <div className="relative w-24 h-24 rounded-[20px] bg-white/15 backdrop-blur border border-white/20 grid place-items-center"><Code2 className="w-10 h-10 text-white" /></div>
                  </div>
                  <div className="p-4 grid grid-cols-3 gap-3">
                    {[
                      {k:'10k+', v:'Active students'}, {k:'94%', v:'Completion'}, {k:'4.8', v:'Avg rating'}
                    ].map(s => (
                      <div key={s.k} className="rounded-2xl bg-zinc-50 dark:bg-zinc-800 p-3">
                        <div className="text-[18px] font-bold">{s.k}</div>
                        <div className="text-[11px] text-zinc-500">{s.v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 pt-0">
                    <div className="rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-violet-600 grid place-items-center"><Play className="w-4 h-4 fill-white" /></div>
                        <div><div className="text-[13px] font-semibold">Continue: Figma Auto Layout</div><div className="text-[11px] opacity-70">12:40 left • Module 2</div></div>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-60" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                {label:'Learners worldwide', value:'10,240+'},
                {label:'Courses & projects', value:'120+'},
                {label:'Avg salary hike', value:'42%'},
                {label:'Doubt solved', value:'< 2h'},
              ].map(s => (
                <div key={s.label} className="rounded-[20px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5">
                  <div className="display text-[28px] font-bold">{s.value}</div>
                  <div className="text-[12px] text-zinc-500 mt-1">{s.label}</div>
                </div>
              ))}
            </section>

            {/* Categories */}
            <section>
              <div className="flex items-end justify-between mb-5">
                <h2 className="display text-[28px] md:text-[32px] font-bold tracking-tight">Browse by category</h2>
                <button onClick={()=>setView('catalog')} className="text-[13px] font-medium text-violet-600 hover:underline">View all →</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={()=>{ setFilters(f=>({...f, category:cat.id})); setView('catalog'); }} className="group text-left rounded-[20px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 hover:shadow-lg transition">
                    <div className={`w-10 h-10 rounded-xl ${cat.color} text-white grid place-items-center mb-3 group-hover:scale-110 transition`}><cat.icon className="w-5 h-5" /></div>
                    <div className="font-semibold text-[14px]">{cat.label}</div>
                    <div className="text-[12px] text-zinc-500">{cat.count} courses</div>
                  </button>
                ))}
              </div>
            </section>

            {/* Featured */}
            <section>
              <div className="flex items-end justify-between mb-5">
                <h2 className="display text-[28px] md:text-[32px] font-bold tracking-tight">Featured — staff picks</h2>
                <div className="hidden md:flex items-center gap-2 text-[12px] text-zinc-500"><Layers className="w-4 h-4" />Hand-curated for you</div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {courses.slice(0,6).map(c => <CourseCard key={c.id} course={c} />)}
              </div>
            </section>

            {/* Testimonials */}
            <section className="rounded-[28px] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 p-6 md:p-10">
              <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
                <div>
                  <h3 className="display text-[32px] leading-[0.95] font-bold">Learners ship faster with EduVerse</h3>
                  <p className="mt-3 text-[14px] opacity-70">Real outcomes, real projects. No fluff.</p>
                  <div className="mt-6 flex items-center gap-3">
                    <Award className="w-5 h-5" />
                    <span className="text-[13px]">Certificate + portfolio reviewed by mentors</span>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {name:'Priya S.', role:'Frontend @ Razorpay', text:'I built 3 production apps during the bootcamp. Got promoted in 4 months.'},
                    {name:'Kabir L.', role:'Founder, Clippr', text:'Best investment. Zero to first paying users with the no-code track.'},
                    {name:'Ankit R.', role:'Data analyst', text:'SQL + Python bootcamp made me interview-ready. Loved the real datasets.'},
                    {name:'Sara M.', role:'Product designer', text:'Design system course is chef’s kiss. My portfolio finally clicks.'},
                  ].map(t => (
                    <div key={t.name} className="rounded-2xl bg-white/10 dark:bg-zinc-900/10 backdrop-blur border border-white/10 dark:border-zinc-200 p-4">
                      <div className="flex gap-1 mb-2">{Array(5).fill(0).map((_,i)=><Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />)}</div>
                      <p className="text-[13px] leading-snug opacity-90">“{t.text}”</p>
                      <div className="mt-3 text-[12px] opacity-70">{t.name} — {t.role}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="rounded-[28px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="display text-[22px] font-bold">Start learning today, get 40% off</h4>
                <p className="text-[13px] text-zinc-500 mt-1">Mock checkout — enroll persists in localStorage as backend simulation.</p>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>setView('catalog')} className="h-11 px-6 rounded-full bg-violet-600 text-white font-semibold">Browse courses</button>
                <button onClick={()=>setShowAuth('signup')} className="h-11 px-6 rounded-full border border-zinc-200 dark:border-zinc-700 font-semibold">Create free account</button>
              </div>
            </section>
          </div>
        )}

        {/* CATALOG */}
        {view === 'catalog' && (
          <div className="pt-6 space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="display text-[28px] md:text-[36px] font-bold tracking-tight">Courses catalog</h1>
                <p className="text-[13px] text-zinc-500 mt-1">{filteredCourses.length} courses • Filters update instantly (mock backend via useState)</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center gap-2 px-3 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[12px]"><SlidersHorizontal className="w-4 h-4" />Sort</div>
                <select value={filters.sort} onChange={e=>setFilters(f=>({...f, sort:e.target.value}))} className="h-9 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-3 text-[13px] outline-none">
                  <option value="popular">Most popular</option>
                  <option value="rating">Highest rated</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                </select>
              </div>
            </div>

            <div className="grid lg:grid-cols-[260px_1fr] gap-6">
              {/* Filters */}
              <div className="lg:sticky lg:top-[80px] self-start rounded-[20px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2"><span className="font-semibold text-[13px]">Category</span><Filter className="w-4 h-4 text-zinc-400" /></div>
                  <div className="space-y-1">
                    {['All', ...CATEGORIES.map(c=>c.id)].map(cat => (
                      <button key={cat} onClick={()=>setFilters(f=>({...f, category:cat}))} className={`w-full text-left px-3 py-1.5 rounded-full text-[13px] ${filters.category===cat ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}`}>{cat}</button>
                    ))}
                  </div>
                </div>
                <div className="h-px bg-zinc-100 dark:bg-zinc-800" />
                <div>
                  <div className="font-semibold text-[13px] mb-2">Level</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['All','Beginner','Intermediate','Advanced'].map(l => (
                      <button key={l} onClick={()=>setFilters(f=>({...f, level:l}))} className={`px-3 py-1 rounded-full text-[12px] border ${filters.level===l ? 'bg-violet-600 border-violet-600 text-white' : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}>{l}</button>
                    ))}
                  </div>
                </div>
                <div className="h-px bg-zinc-100 dark:bg-zinc-800" />
                <div>
                  <div className="font-semibold text-[13px] mb-2">Price</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['All','Free','Under 2000','Paid'].map(p => (
                      <button key={p} onClick={()=>setFilters(f=>({...f, price:p}))} className={`px-3 py-1 rounded-full text-[12px] border ${filters.price===p ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white' : 'border-zinc-200 dark:border-zinc-700'}`}>{p}</button>
                    ))}
                  </div>
                </div>
                <button onClick={()=>{ setFilters({category:'All', level:'All', price:'All', sort:'popular'}); setSearch(''); addToast('Filters cleared','info'); }} className="w-full h-9 rounded-full border border-zinc-200 dark:border-zinc-700 text-[13px] font-medium">Clear all</button>
                <div className="text-[11px] text-zinc-500 leading-snug">/* TODO: Replace filters with GET /api/courses?category=&level=&search= */</div>
              </div>

              {/* Grid */}
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
                {filteredCourses.map(c => <CourseCard key={c.id} course={c} />)}
                {filteredCourses.length===0 && (
                  <div className="col-span-full py-16 text-center rounded-[20px] bg-white dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-700">
                    <Search className="w-8 h-8 mx-auto text-zinc-400 mb-2" />
                    <div className="font-semibold">No courses found</div>
                    <div className="text-[13px] text-zinc-500">Try different filters or search</div>
                    <button onClick={()=>{ setSearch(''); setFilters({category:'All', level:'All', price:'All', sort:'popular'}); }} className="mt-3 px-4 h-9 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-[13px]">Reset</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* DETAIL */}
        {view === 'detail' && (
          <div className="pt-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-[12px] text-zinc-500"><button onClick={()=>setView('home')} className="hover:underline">Home</button><ChevronRight className="w-3 h-3" /><button onClick={()=>setView('catalog')} className="hover:underline">Courses</button><ChevronRight className="w-3 h-3" /><span className="text-zinc-900 dark:text-zinc-100 font-medium truncate max-w-[200px]">{selectedCourse.title}</span></div>

              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-violet-600 text-white text-[11px] font-bold">{selectedCourse.category}</span>
                  {selectedCourse.bestseller && <span className="px-2.5 py-1 rounded-full bg-amber-400 text-zinc-900 text-[11px] font-bold">Bestseller</span>}
                  <span className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[11px]">{selectedCourse.level}</span>
                  <span className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[11px] flex items-center gap-1"><Globe className="w-3 h-3" />{selectedCourse.language}</span>
                </div>
                <h1 className="display text-[30px] md:text-[38px] leading-[0.95] font-bold tracking-tight">{selectedCourse.title}</h1>
                <p className="mt-3 text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed">{selectedCourse.longDesc}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-[13px]">
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />{selectedCourse.rating} ({selectedCourse.reviewsCount.toLocaleString()} reviews)</span>
                  <span className="flex items-center gap-1 text-zinc-500"><Users className="w-4 h-4" />{selectedCourse.students.toLocaleString()} students</span>
                  <span className="flex items-center gap-1 text-zinc-500"><Clock className="w-4 h-4" />{selectedCourse.duration}</span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 grid place-items-center text-[12px] font-bold">{selectedCourse.instructor.initials}</div>
                  <div className="text-[13px]"><span className="text-zinc-500">Instructor:</span> <span className="font-medium">{selectedCourse.instructor.name}</span></div>
                </div>
              </div>

              {/* Video preview */}
              <div className="rounded-[22px] overflow-hidden bg-zinc-950 border border-zinc-800 relative aspect-[16/9] group">
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedCourse.gradient} opacity-80`} />
                <div className="absolute inset-0 grid place-items-center opacity-20">
                  <BookOpen className="w-40 h-40 text-white" />
                </div>
                <button onClick={()=>{ setPlayerLessonId(selectedCourse.modules[0].lessons[0].id); setView('player'); }} className="absolute inset-0 grid place-items-center">
                  <span className="w-16 h-16 rounded-full bg-white text-zinc-900 grid place-items-center shadow-xl group-hover:scale-110 transition"><Play className="w-7 h-7 fill-zinc-900 ml-0.5" /></span>
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <div className="text-[13px] font-medium">Preview: {selectedCourse.modules[0].lessons.find(l=>l.preview)?.title}</div>
                  <div className="text-[11px] opacity-70">Free preview • 8 min</div>
                </div>
              </div>

              {/* What you'll learn */}
              <div className="rounded-[20px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5">
                <h3 className="font-semibold mb-3">What you'll learn</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {selectedCourse.whatYouLearn.map(t => (
                    <div key={t} className="flex gap-2 text-[13px]"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /><span>{t}</span></div>
                  ))}
                </div>
              </div>

              {/* Curriculum */}
              <div className="rounded-[20px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2">
                <div className="flex items-center justify-between px-3 py-2">
                  <h3 className="font-semibold">Curriculum • {selectedCourse.modules.length} modules • {totalLessons(selectedCourse)} lessons</h3>
                  <span className="text-[11px] text-zinc-500">{selectedCourse.duration} total</span>
                </div>
                <div className="space-y-1">
                  {selectedCourse.modules.map(m => (
                    <div key={m.id} className="rounded-xl border border-zinc-100 dark:border-zinc-800 overflow-hidden">
                      <button onClick={()=>setActiveModule(activeModule===m.id?null:m.id)} className="w-full flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        <span className="font-medium text-[13px] text-left">{m.title}</span>
                        <span className="flex items-center gap-2 text-[11px] text-zinc-500">{m.lessons.length} lessons {activeModule===m.id?<ChevronDown className="w-4 h-4"/>:<ChevronRight className="w-4 h-4"/>}</span>
                      </button>
                      {activeModule===m.id && (
                        <div className="divide-y divide-zinc-100 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                          {m.lessons.map(l => (
                            <div key={l.id} className="flex items-center justify-between px-4 py-2.5 text-[13px]">
                              <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 grid place-items-center">{l.type==='video'?<Video className="w-3.5 h-3.5" />:l.type==='quiz'?<HelpCircle className="w-3.5 h-3.5" />:<FileText className="w-3.5 h-3.5" />}</div><span className="truncate max-w-[220px]">{l.title}</span>{l.preview && <span className="px-1.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-200 text-[10px]">Preview</span>}</div>
                              <span className="text-[11px] text-zinc-500">{l.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructor & Reviews */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-[20px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5">
                  <h4 className="font-semibold mb-3">Instructor</h4>
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 grid place-items-center font-bold">{selectedCourse.instructor.initials}</div>
                    <div>
                      <div className="font-semibold text-[14px]">{selectedCourse.instructor.name}</div>
                      <div className="text-[12px] text-zinc-500">{selectedCourse.instructor.students} students • {selectedCourse.instructor.courses} courses • {selectedCourse.instructor.rating} rating</div>
                      <p className="mt-2 text-[13px] text-zinc-600 dark:text-zinc-400 leading-snug">{selectedCourse.instructor.bio}</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-[20px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5">
                  <h4 className="font-semibold mb-3">Reviews</h4>
                  <div className="space-y-3">
                    {selectedCourse.reviews.map(r => (
                      <div key={r.id} className="flex gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 grid place-items-center text-[11px] font-bold">{r.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2"><span className="font-medium text-[13px]">{r.name}</span><span className="flex">{Array(5).fill(0).map((_,i)=><Star key={i} className={`w-3 h-3 ${i<r.rating?'fill-amber-400 stroke-amber-400':'stroke-zinc-300'}`} />)}</span><span className="text-[11px] text-zinc-500">{r.date}</span></div>
                          <p className="text-[13px] text-zinc-600 dark:text-zinc-400 mt-1">{r.comment}</p>
                        </div>
                      </div>
                    ))}
                    {selectedCourse.reviews.length===0 && <div className="text-[13px] text-zinc-500">No reviews yet — be first!</div>}
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase card */}
            <div className="lg:sticky lg:top-[80px] self-start">
              <div className="rounded-[22px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
                <div className="p-5">
                  <div className="flex items-baseline gap-2">
                    {selectedCourse.price===0 ? <span className="text-[28px] font-bold text-emerald-600">Free</span> : <>
                      <span className="text-[28px] font-bold">₹{selectedCourse.price.toLocaleString('en-IN')}</span>
                      <span className="text-[14px] line-through text-zinc-400">₹{selectedCourse.originalPrice.toLocaleString('en-IN')}</span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-200 text-[11px] font-bold">{Math.round((1-selectedCourse.price/selectedCourse.originalPrice)*100)}% off</span>
                    </>}
                  </div>
                  <div className="mt-1 text-[12px] text-zinc-500 flex items-center gap-1"><Timer className="w-3.5 h-3.5" />3 days left at this price!</div>
                  <button onClick={()=>handleEnroll(selectedCourse.id)} className="mt-4 w-full h-11 rounded-full bg-violet-600 text-white font-semibold hover:bg-violet-700">
                    {enrolled.includes(selectedCourse.id) ? 'Go to course' : 'Enroll now'}
                  </button>
                  <button onClick={()=>toggleWishlist(selectedCourse.id)} className="mt-2 w-full h-11 rounded-full border border-zinc-200 dark:border-zinc-700 font-medium flex items-center justify-center gap-2">
                    <Heart className={`w-4 h-4 ${wishlist.includes(selectedCourse.id)?'fill-rose-500 stroke-rose-500':''}`} />{wishlist.includes(selectedCourse.id)?'Wishlisted':'Add to wishlist'}
                  </button>
                  <div className="mt-4 text-[11px] text-zinc-500 text-center">30-day money-back guarantee • Lifetime access</div>
                  <div className="mt-4 space-y-2 text-[13px]">
                    {[
                      {icon: Video, label: `${totalLessons(selectedCourse)} lessons`},
                      {icon: Clock, label: `${selectedCourse.duration} on-demand`},
                      {icon: FileText, label: '12 articles + resources'},
                      {icon: Trophy, label: 'Certificate of completion'},
                    ].map(i => (
                      <div key={i.label} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400"><i.icon className="w-4 h-4" />{i.label}</div>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button onClick={()=>addToast('Link copied','info')} className="flex-1 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[13px] flex items-center justify-center gap-1"><Share2 className="w-4 h-4" />Share</button>
                    <button onClick={()=>addToast('Gift flow coming soon','info')} className="flex-1 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[13px]">Gift</button>
                  </div>
                  <div className="mt-4 text-[11px] text-zinc-400">/* TODO: POST /api/enroll — mock persisted in localStorage */</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LEARNING */}
        {view === 'learning' && (
          <div className="pt-6 space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="display text-[30px] font-bold tracking-tight">My learning</h1>
                <p className="text-[13px] text-zinc-500 mt-1">{enrolled.length} enrolled • {Object.values(progress).filter(p=>p===100).length} certificates</p>
              </div>
              <button onClick={()=>setView('catalog')} className="h-9 px-4 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-[13px] font-medium">Browse more</button>
            </div>

            {enrolled.length===0 ? (
              <div className="rounded-[22px] bg-white dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-700 p-10 text-center">
                <BookOpen className="w-10 h-10 mx-auto text-zinc-400 mb-3" />
                <div className="font-semibold">No courses yet</div>
                <p className="text-[13px] text-zinc-500 mt-1">Enroll to see progress, notes, and certificates here.</p>
                <button onClick={()=>setView('catalog')} className="mt-4 h-10 px-5 rounded-full bg-violet-600 text-white font-medium">Explore catalog</button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {enrolled.map(id => {
                  const c = courses.find(x=>x.id===id);
                  if(!c) return null;
                  const pct = progress[id] ?? 0;
                  return (
                    <div key={id} className="rounded-[20px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                      <div className="relative h-[160px] overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient}`} />
                        <div className="absolute inset-0 grid place-items-center opacity-20"><BookOpen className="w-20 h-20 text-white" /></div>
                        <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-white/20 backdrop-blur text-white text-[10px] font-bold">{c.category}</div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="h-1.5 rounded-full bg-white/30 backdrop-blur overflow-hidden"><div className="h-full bg-white" style={{width:`${pct}%`}} /></div>
                          <div className="mt-1 flex justify-between text-[11px] text-white"><span>{pct}% complete</span><span>{totalLessons(c)} lessons</span></div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="font-semibold text-[14px] leading-tight line-clamp-2">{c.title}</div>
                        <div className="text-[12px] text-zinc-500 mt-1">{c.instructor.name} • {c.category}</div>
                        <div className="mt-3 flex gap-2">
                          <button onClick={()=>{ setSelectedCourseId(c.id); setPlayerLessonId(c.modules[0].lessons[0].id); setView('player'); }} className="flex-1 h-9 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-[13px] font-medium flex items-center justify-center gap-1"><Play className="w-4 h-4" />Continue</button>
                          <button onClick={()=>{ setSelectedCourseId(c.id); setView('detail'); }} className="h-9 px-4 rounded-full border border-zinc-200 dark:border-zinc-700 text-[13px]">Details</button>
                        </div>
                        {pct===100 && <div className="mt-3 rounded-xl bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-2.5 flex items-center gap-2 text-[12px]"><Trophy className="w-4 h-4 text-amber-600" />Certificate ready — <button onClick={()=>addToast('Certificate PDF downloaded (mock)')} className="underline font-medium">Download</button></div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Wishlist */}
            {wishlist.length>0 && (
              <div>
                <h3 className="font-semibold mb-3">Wishlist • {wishlist.length}</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {wishlist.map(id => { const c=courses.find(x=>x.id===id); return c ? <CourseCard key={id} course={c} compact /> : null; })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PLAYER */}
        {view === 'player' && (
          <div className="pt-4 grid lg:grid-cols-[1.25fr_0.75fr] gap-0 lg:gap-4 lg:pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[12px] text-zinc-500"><button onClick={()=>setView('learning')} className="hover:underline">My Learning</button><ChevronRight className="w-3 h-3" /><span className="truncate max-w-[240px] text-zinc-900 dark:text-zinc-100 font-medium">{selectedCourse.title}</span></div>
              <div className="rounded-[20px] overflow-hidden bg-black aspect-[16/9] relative grid place-items-center">
                {/* Mock video */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black" />
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedCourse.gradient} opacity-30`} />
                <div className="absolute inset-0 grid place-items-center opacity-10"><Video className="w-48 h-48 text-white" /></div>
                <div className="relative z-10 text-center text-white">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur border border-white/20 grid place-items-center mx-auto mb-4"><Play className="w-8 h-8 fill-white" /></div>
                  <div className="font-semibold">{selectedCourse.modules.flatMap(m=>m.lessons).find(l=>l.id===playerLessonId)?.title || 'Lesson'}</div>
                  <div className="text-[12px] opacity-70 mt-1">Video player mock — would be Mux / Cloudflare Stream</div>
                  <button onClick={()=>{ const cid=selectedCourse.id; const lid=playerLessonId; markLessonComplete(cid, lid); }} className="mt-4 px-4 h-8 rounded-full bg-white text-zinc-900 text-[13px] font-medium">Mark complete</button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20"><div className="h-full bg-violet-500" style={{width: `${progress[selectedCourse.id]||0}%`}} /></div>
              </div>

              <div className="rounded-[20px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="flex gap-1 p-1.5">
                  {[
                    {k:'overview', l:'Overview', icon: BookOpen},
                    {k:'notes', l:'Notes', icon: FileText},
                    {k:'qa', l:'Q&A', icon: MessageCircle},
                    {k:'quiz', l:'Quiz', icon: Trophy},
                  ].map(t => (
                    <button key={t.k} onClick={()=>setPlayerTab(t.k as any)} className={`flex-1 h-9 rounded-full text-[13px] font-medium flex items-center justify-center gap-1.5 ${playerTab===t.k ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}`}><t.icon className="w-4 h-4" />{t.l}</button>
                  ))}
                </div>
                <div className="p-5 border-t border-zinc-100 dark:border-zinc-800 min-h-[200px]">
                  {playerTab==='overview' && (
                    <div className="space-y-3">
                      <h4 className="font-semibold">About this lesson</h4>
                      <p className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed">{selectedCourse.longDesc}</p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800 p-3"><div className="text-[11px] text-zinc-500">Progress</div><div className="font-semibold">{progress[selectedCourse.id]||0}%</div></div>
                        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800 p-3"><div className="text-[11px] text-zinc-500">Completed</div><div className="font-semibold">{(completedLessons[selectedCourse.id]||[]).length}/{totalLessons(selectedCourse)}</div></div>
                        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800 p-3"><div className="text-[11px] text-zinc-500">Next</div><div className="font-semibold text-[12px] truncate">{selectedCourse.modules[1]?.title || 'Next module'}</div></div>
                      </div>
                      <div className="text-[11px] text-zinc-400">/* TODO: GET /api/courses/{id}/progress — persisted in localStorage here */</div>
                    </div>
                  )}
                  {playerTab==='notes' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between"><h4 className="font-semibold">Your notes</h4><span className="text-[11px] text-zinc-500">Auto-saved to localStorage</span></div>
                      <textarea value={notes[playerLessonId]||''} onChange={e=>setNotes(n=>({...n, [playerLessonId]: e.target.value}))} placeholder="Take notes for this lesson..." className="w-full min-h-[140px] rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-3 text-[13px] outline-none focus:border-violet-300" />
                      <button onClick={()=>addToast('Notes saved (localStorage)')} className="h-8 px-4 rounded-full bg-violet-600 text-white text-[13px] font-medium">Save notes</button>
                    </div>
                  )}
                  {playerTab==='qa' && (
                    <div className="space-y-3">
                      <h4 className="font-semibold">Q&A • Mentor replies &lt; 2h</h4>
                      <div className="space-y-2">
                        {[
                          {q:'How to handle auth in RSC?', a:'Use NextAuth with server actions, example in Module 3.'},
                          {q:'Best state lib for large apps?', a:'Zustand for most, Redux Toolkit if you need time-travel.'},
                        ].map((item,i)=>(
                          <div key={i} className="rounded-xl bg-zinc-50 dark:bg-zinc-800 p-3"><div className="text-[13px] font-medium">Q: {item.q}</div><div className="text-[13px] text-zinc-600 dark:text-zinc-400 mt-1">A: {item.a}</div></div>
                        ))}
                      </div>
                      <div className="flex gap-2"><input placeholder="Ask a question..." className="flex-1 h-9 rounded-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 text-[13px] outline-none" /><button onClick={()=>addToast('Question posted (mock)')} className="h-9 px-4 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-[13px]">Post</button></div>
                      <div className="text-[11px] text-zinc-400">/* TODO: POST /api/qa */</div>
                    </div>
                  )}
                  {playerTab==='quiz' && (
                    <div className="space-y-4">
                      <h4 className="font-semibold flex items-center gap-2"><Trophy className="w-4 h-4 text-amber-500" />Quiz — test your knowledge</h4>
                      {(QUIZ_DATA[selectedCourse.id] || QUIZ_DATA.default).map((q, idx) => (
                        <div key={idx} className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-3">
                          <div className="font-medium text-[13px] mb-2">{idx+1}. {q.q}</div>
                          <div className="space-y-1.5">
                            {q.opts.map((opt, oi) => (
                              <label key={oi} className={`flex items-center gap-2 px-3 py-2 rounded-full border text-[13px] cursor-pointer ${quizAnswers[idx]===oi ? 'border-violet-600 bg-violet-50 dark:bg-violet-950' : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}>
                                <input type="radio" name={`q${idx}`} checked={quizAnswers[idx]===oi} onChange={()=>setQuizAnswers(a=>({...a, [idx]: oi}))} className="accent-violet-600" />
                                {opt}
                                {quizSubmitted && oi===q.ans && <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto" />}
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                      {!quizSubmitted ? (
                        <button onClick={()=>setQuizSubmitted(true)} className="h-9 px-5 rounded-full bg-violet-600 text-white text-[13px] font-medium">Submit quiz</button>
                      ) : (
                        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 p-3 text-[13px]">
                          Score: {(QUIZ_DATA[selectedCourse.id] || QUIZ_DATA.default).reduce((acc,q,i)=> acc + (quizAnswers[i]===q.ans ? 1:0),0)} / {(QUIZ_DATA[selectedCourse.id] || QUIZ_DATA.default).length}
                          <button onClick={()=>{ setQuizAnswers({}); setQuizSubmitted(false); }} className="ml-3 underline">Retry</button>
                        </div>
                      )}
                      <div className="text-[11px] text-zinc-400">/* TODO: POST /api/quiz/submit — calculate server-side */</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Lesson sidebar */}
            <div className="rounded-[20px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 lg:sticky lg:top-[80px] self-start overflow-hidden mt-4 lg:mt-0">
              <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <div className="font-semibold text-[14px]">Course content</div>
                <div className="text-[11px] text-zinc-500">{progress[selectedCourse.id]||0}%</div>
              </div>
              <div className="max-h-[70vh] overflow-auto">
                {selectedCourse.modules.map(m => (
                  <div key={m.id} className="border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                    <div className="px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 text-[12px] font-semibold">{m.title}</div>
                    <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                      {m.lessons.map(l => {
                        const isActive = l.id===playerLessonId;
                        const done = (completedLessons[selectedCourse.id]||[]).includes(l.id);
                        return (
                          <button key={l.id} onClick={()=>{ setPlayerLessonId(l.id); setQuizSubmitted(false); setQuizAnswers({}); }} className={`w-full text-left flex items-center justify-between px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 ${isActive ? 'bg-violet-50 dark:bg-violet-950' : ''}`}>
                            <span className="flex items-center gap-2">
                              <span className={`w-5 h-5 rounded-full grid place-items-center border ${done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-zinc-300 dark:border-zinc-600'}`}>{done ? <CheckCircle2 className="w-3 h-3" /> : <Play className="w-3 h-3" />}</span>
                              <span className={`text-[13px] truncate max-w-[180px] ${isActive ? 'font-medium' : ''}`}>{l.title}</span>
                            </span>
                            <span className="text-[11px] text-zinc-500">{l.duration}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* INSTRUCTOR */}
        {view === 'instructor' && (
          <div className="pt-6 space-y-6">
            <div className="rounded-[24px] bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 md:p-8 flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h1 className="display text-[28px] font-bold">Instructor dashboard</h1>
                <p className="text-[13px] opacity-80 mt-1">Create, manage, and track your courses. Mock backend via localStorage.</p>
                <div className="mt-4 flex gap-2 text-[12px]">
                  <span className="px-3 py-1 rounded-full bg-white/20">Total students: {courses.reduce((a,c)=>a+c.students,0).toLocaleString()}</span>
                  <span className="px-3 py-1 rounded-full bg-white/20">Courses: {courses.length}</span>
                </div>
              </div>
              <div className="flex items-end"><div className="rounded-2xl bg-white text-zinc-900 px-4 py-3 text-[13px]"><div className="font-bold">Revenue (mock)</div><div className="text-[22px] font-bold">₹2,48,000</div><div className="text-[11px] text-zinc-500">+12% this month</div></div></div>
            </div>

            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
              {/* Create form */}
              <div className="rounded-[20px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5">
                <h3 className="font-semibold flex items-center gap-2"><Plus className="w-4 h-4" />Create new course</h3>
                <p className="text-[11px] text-zinc-500 mt-1">/* TODO: Replace with POST /api/instructor/courses + upload thumbnail */</p>
                <form onSubmit={e=>{
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget as HTMLFormElement);
                  const data = Object.fromEntries(fd.entries());
                  if(!user){ setShowAuth('signup'); return; }
                  if(!data.title || !data.desc){ addToast('Fill required fields','error'); return; }
                  handleCreateCourse(data);
                  (e.target as HTMLFormElement).reset();
                }} className="mt-4 space-y-3">
                  <input name="title" placeholder="Course title *" className="w-full h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 text-[13px] outline-none focus:border-violet-300" />
                  <div className="grid grid-cols-2 gap-3">
                    <select name="category" className="h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 text-[13px] outline-none">
                      {CATEGORIES.map(c=><option key={c.id} value={c.id}>{c.id}</option>)}
                    </select>
                    <select name="level" className="h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 text-[13px] outline-none">
                      <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input name="price" type="number" placeholder="Price INR (0 for free)" className="h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 text-[13px] outline-none" />
                    <input name="duration" placeholder="Duration e.g. 12h 30m" className="h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 text-[13px] outline-none" />
                  </div>
                  <textarea name="desc" placeholder="Course description * — what will students learn? Use new lines for bullet points" rows={4} className="w-full rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-3 text-[13px] outline-none focus:border-violet-300" />
                  <textarea name="learnings" placeholder="What you'll learn (one per line)" rows={3} className="w-full rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-3 text-[13px] outline-none" />
                  <button type="submit" className="w-full h-11 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold">Publish course</button>
                </form>
              </div>

              {/* Manage */}
              <div className="rounded-[20px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5">
                <h3 className="font-semibold flex items-center gap-2"><LayoutDashboard className="w-4 h-4" />Manage courses</h3>
                <div className="mt-4 space-y-2 max-h-[560px] overflow-auto pr-1">
                  {courses.slice(-8).reverse().map(c => (
                    <div key={c.id} className="flex items-center justify-between gap-3 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.gradient} grid place-items-center text-white font-bold text-[10px]`}>{c.category.slice(0,2)}</div>
                        <div className="min-w-0"><div className="font-medium text-[13px] truncate max-w-[180px]">{c.title}</div><div className="text-[11px] text-zinc-500">{c.category} • ₹{c.price} • {c.students} students</div></div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={()=>{ setSelectedCourseId(c.id); setView('detail'); }} className="w-7 h-7 grid place-items-center rounded-full bg-zinc-100 dark:bg-zinc-800"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button onClick={()=>{
                          if(courses.length<=1){ addToast('Keep at least 1 course','error'); return; }
                          const next = courses.filter(x=>x.id!==c.id);
                          setCourses(next);
                          localStorage.setItem('eduverse_extra_courses', JSON.stringify(next.slice(MOCK_COURSES.length)));
                          addToast('Course removed (mock)');
                        }} className="w-7 h-7 grid place-items-center rounded-full bg-rose-50 dark:bg-rose-950 text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-[11px] text-zinc-400">/* TODO: GET /api/instructor/courses, DELETE /api/courses/:id */</div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* AUTH MODAL */}
      {showAuth && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm grid place-items-center p-4">
          <div className="w-full max-w-[380px] rounded-[24px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-xl bg-violet-600 grid place-items-center text-white font-bold">E</div><span className="font-bold">EduVerse</span></div>
                <button onClick={()=>setShowAuth(null)} className="w-8 h-8 grid place-items-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"><X className="w-4 h-4" /></button>
              </div>
              <h2 className="display text-[22px] font-bold">{showAuth==='login' ? 'Welcome back' : 'Create account'}</h2>
              <p className="text-[13px] text-zinc-500 mt-1">{showAuth==='login' ? 'Log in to continue learning' : 'Join 10k+ learners — mock auth stored in localStorage'}</p>

              <form onSubmit={e=>{
                e.preventDefault();
                const fd = new FormData(e.currentTarget as HTMLFormElement);
                const email = String(fd.get('email')||'');
                const name = String(fd.get('name')|| email.split('@')[0]);
                const pwd = String(fd.get('password')||'');
                if(!email.includes('@') || pwd.length<4){ addToast('Enter valid email & 4+ char password','error'); return; }
                // TODO: Replace with POST /api/auth/login or /api/auth/signup
                const initials = name.split(' ').map((s:string)=>s[0]).join('').slice(0,2).toUpperCase() || 'U';
                const u: UserType = { id: 'u_'+Date.now(), name: name || 'Learner', email, initials, role: 'both' };
                setUser(u);
                addToast(showAuth==='login' ? `Welcome back, ${u.name}!` : `Account created for ${u.name} 🎉`);
                setShowAuth(null);
              }} className="mt-5 space-y-3">
                {showAuth==='signup' && <input name="name" placeholder="Full name" className="w-full h-11 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 text-[14px] outline-none focus:border-violet-300" />}
                <input name="email" type="email" placeholder="Email address" className="w-full h-11 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 text-[14px] outline-none focus:border-violet-300" />
                <input name="password" type="password" placeholder="Password (min 4 chars)" className="w-full h-11 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 text-[14px] outline-none focus:border-violet-300" />
                <button type="submit" className="w-full h-11 rounded-full bg-violet-600 text-white font-semibold hover:bg-violet-700">{showAuth==='login' ? 'Log in' : 'Create account'}</button>
                <div className="text-[12px] text-center text-zinc-500">/* TODO: JWT storage, POST /api/auth/* — mocked here */</div>
                <div className="text-[13px] text-center">
                  {showAuth==='login' ? <>No account? <button type="button" onClick={()=>setShowAuth('signup')} className="font-semibold text-violet-600 underline">Sign up</button></> : <>Have account? <button type="button" onClick={()=>setShowAuth('login')} className="font-semibold text-violet-600 underline">Log in</button></>}
                </div>
              </form>
            </div>
            <div className="px-6 py-3 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-500 text-center">Demo: any email + 4 char pwd works. Data in localStorage only.</div>
          </div>
        </div>
      )}

      {/* TOASTS */}
      <div className="fixed bottom-4 right-4 z-[200] space-y-2 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className={`pointer-events-auto min-w-[280px] max-w-[360px] rounded-full px-4 py-3 text-[13px] font-medium shadow-xl border backdrop-blur flex items-center gap-2 ${t.type==='error' ? 'bg-rose-600 text-white border-rose-500' : t.type==='info' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-800 dark:border-zinc-200' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100'}`}>
            {t.type==='success' ? '✅' : t.type==='error' ? '⚠️' : '💡'} {t.msg}
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-violet-600 grid place-items-center text-white font-bold">E</div><span className="font-bold">EduVerse</span><span className="text-[11px] text-zinc-500 ml-2">© 2025 • Crafted for demo — extend to MERN</span></div>
          <div className="flex gap-4 text-[12px] text-zinc-500"><span className="flex items-center gap-1"><GraduationCap className="w-4 h-4" />Learn</span><span>Teach</span><span>Support</span><span>Privacy</span></div>
        </div>
      </footer>
    </div>
  );
}
