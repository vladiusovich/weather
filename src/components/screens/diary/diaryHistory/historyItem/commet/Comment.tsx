import UI from "@components/ui";
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
        <UI.YStack gap={"$1"}>
            <UI.Typo.Text fontSize={"$3"} color={"$color10"}>
                Comment:
            </UI.Typo.Text>
            <UI.Paper py={8} px={8} rounded={8} bg="$background02">
                <UI.Typo.Text fontSize={"$2"} color={"$color11"}>
                    {data.trim()}
                </UI.Typo.Text>
            </UI.Paper>

        </UI.YStack>
    );
};

export default Comment;
