type props = {
    text: string;
    varient?: "heading" | "subHeading" | "body" | "sm" | "xs";
    color?: "primary" | "success" | "mute" | "white" | "danger" | "link";
    opacity?: "25" | "50" | "75" | "100";
};

const colorClasses = {
    primary: {
        "25": "text-black/25",
        "50": "text-black/50",
        "75": "text-black/75",
        "100": "text-black",
    },
    success: {
        "25": "text-green-600/25",
        "50": "text-green-600/50",
        "75": "text-green-600/75",
        "100": "text-green-600",
    },
    mute: {
        "25": "text-gray-500/25",
        "50": "text-gray-500/50",
        "75": "text-gray-500/75",
        "100": "text-gray-500",
    },
    white: {
        "25": "text-white/25",
        "50": "text-white/50",
        "75": "text-white/75",
        "100": "text-white",
    },
    danger: {
        "25": "text-red-600/25",
        "50": "text-red-600/50",
        "75": "text-red-600/75",
        "100": "text-red-600",
    },
    link: {
        "25": "text-blue-600/25",
        "50": "text-blue-600/50",
        "75": "text-blue-600/75",
        "100": "text-blue-600",
    },
} as const;

const variantMap = {
    heading: { tag: "h1", size: "text-3xl font-bold" },
    subHeading: { tag: "h2", size: "text-xl font-semibold" },
    body: { tag: "p", size: "text-base" },
    sm: { tag: "p", size: "text-sm" },
    xs: { tag: "p", size: "text-xs" },
} as const;

export const Text = ({ text, varient = "body", color = "primary", opacity = "100" }: props) => {
    const { tag: Tag, size } = variantMap[varient];
    const colorClass = colorClasses[color][opacity];

    return <Tag className={`${size} ${colorClass}`}>{text}</Tag>;
};