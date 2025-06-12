import { cn } from "@/lib/utils";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> { }

export const Loader = ({ className, ...props }: LoaderProps) => (
    <div
        className={cn(
            "animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent",
            className
        )}
        {...props}
    />
);