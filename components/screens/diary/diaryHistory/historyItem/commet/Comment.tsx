import UI from "@/components/ui";
import React from "react";

interface CommentProps {
    data?: string | null;
}

const Comment: React.FC<CommentProps> = ({
    data,
}) => {
    if (!data) {
        return null;
    }

    return (
        <UI.XStack>
            <UI.Typo.Text fontSize={"$1"} color={"$color11"}>
                {data}
            </UI.Typo.Text>
        </UI.XStack>
    );
};

export default Comment;
