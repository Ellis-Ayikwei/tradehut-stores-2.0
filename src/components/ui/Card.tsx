interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children, className = '' }: CardProps) {
    return <div className={`glass-morphism border-2 border-primary-300 rounded-xl p-6 ${className}`}>{children}</div>;
}
