import { HeadingProps } from "@/types/components/ui/heading.types"

type HeadingTag = `h${1 | 2 | 3 | 4 | 5 | 6}`;

export function Heading({level = 1, className, text, ...props}: HeadingProps){
    const Tag = `h${level}` as HeadingTag;
    return (
        <Tag className={className} {...props}>
            {text}
        </Tag>
    )
}