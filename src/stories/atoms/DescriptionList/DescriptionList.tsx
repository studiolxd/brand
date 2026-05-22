import './DescriptionList.css';

export interface DescriptionListProps {
  children: React.ReactNode;
  className?: string;
}

export function DescriptionList({ children, className }: DescriptionListProps) {
  const classes = ['description-list', className].filter(Boolean).join(' ');
  return <dl className={classes}>{children}</dl>;
}
