import { Button } from "@/app/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface SectionHeaderProps {
    title: string;
    actionText?: string;
    actionLink?: string;
}

export function SectionHeader({ title, actionText = "See All", actionLink = "#" }: SectionHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6" >
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h2>
            <Link href={actionLink}>
                <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-transparent px-0 font-medium hover:cursor-pointer">
                    {actionText} <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
            </Link>
        </div>
    )
}
