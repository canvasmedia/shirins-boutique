import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight size={11} className="text-taupe" />}
            {item.href && i < items.length - 1 ? (
              <Link
                href={item.href}
                className="text-[11px] font-montserrat text-taupe hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[11px] font-montserrat text-ink font-medium">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
