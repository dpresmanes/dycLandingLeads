declare module 'lucide-react' {
  import { ComponentType, SVGProps } from 'react';

  export interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    absoluteStrokeWidth?: boolean;
    className?: string;
  }

  export type LucideIcon = ComponentType<LucideProps>;

  // Common icons used in the project
  export const User: LucideIcon;
  export const Briefcase: LucideIcon;
  export const MessageCircle: LucideIcon;
  export const ArrowLeft: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const Zap: LucideIcon;
  export const Clock: LucideIcon;
  export const Target: LucideIcon;
  export const Menu: LucideIcon;
  export const X: LucideIcon;
  export const ArrowDown: LucideIcon;
  export const Search: LucideIcon;
  export const Lightbulb: LucideIcon;
  export const Rocket: LucideIcon;
  export const BarChart3: LucideIcon;
  export const ShoppingCart: LucideIcon;
  export const TrendingUp: LucideIcon;
  export const Users: LucideIcon;
  export const MessageSquare: LucideIcon;
  export const Shield: LucideIcon;
  export const Lock: LucideIcon;
  export const Eye: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const Star: LucideIcon;
  export const Quote: LucideIcon;
  export const Twitter: LucideIcon;
  export const Facebook: LucideIcon;
  export const Instagram: LucideIcon;
  export const Linkedin: LucideIcon;
  export const Globe: LucideIcon;
  export const Calculator: LucideIcon;
  export const CheckCircle: LucideIcon;
  export const CheckSquare: LucideIcon;
  export const Brain: LucideIcon;
  export const Facebook: LucideIcon;
  export const ArrowUpRight: LucideIcon;
  export const MapPin: LucideIcon;
  export const Smartphone: LucideIcon;
  export const Download: LucideIcon;
  export const QrCode: LucideIcon;
  export const Building2: LucideIcon;
  export const Phone: LucideIcon;
  export const Mail: LucideIcon;
  export const Send: LucideIcon;
  export const DollarSign: LucideIcon;
  export const ShoppingBag: LucideIcon;
  export const GraduationCap: LucideIcon;
  export const Heart: LucideIcon;
  export const Home: LucideIcon;
  export const Utensils: LucideIcon;

  // Export all other icons as a generic type
  const lucideReact: {
    [key: string]: LucideIcon;
  };

  export default lucideReact;
}