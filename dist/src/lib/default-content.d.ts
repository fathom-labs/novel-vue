export declare const defaultEditorContent: {
    type: string;
    content: ({
        type: string;
        attrs: {
            level: number;
            language?: undefined;
            tight?: undefined;
            start?: undefined;
        };
        content: {
            type: string;
            text: string;
        }[];
    } | {
        type: string;
        content: ({
            type: string;
            marks: {
                type: string;
                attrs: {
                    href: string;
                    target: string;
                    class: string;
                };
            }[];
            text: string;
        } | {
            type: string;
            text: string;
            marks?: undefined;
        })[];
        attrs?: undefined;
    } | {
        type: string;
        attrs: {
            language: null;
            level?: undefined;
            tight?: undefined;
            start?: undefined;
        };
        content: {
            type: string;
            text: string;
        }[];
    } | {
        type: string;
        attrs: {
            tight: boolean;
            start: number;
            level?: undefined;
            language?: undefined;
        };
        content: {
            type: string;
            content: {
                type: string;
                content: ({
                    type: string;
                    text: string;
                    marks?: undefined;
                } | {
                    type: string;
                    marks: {
                        type: string;
                    }[];
                    text: string;
                })[];
            }[];
        }[];
    } | {
        type: string;
        attrs?: undefined;
        content?: undefined;
    } | {
        type: string;
        content: {
            type: string;
            attrs: {
                checked: boolean;
            };
            content: {
                type: string;
                content: ({
                    type: string;
                    text: string;
                    marks?: undefined;
                } | {
                    type: string;
                    marks: {
                        type: string;
                        attrs: {
                            href: string;
                            target: string;
                            class: string;
                        };
                    }[];
                    text: string;
                })[];
            }[];
        }[];
        attrs?: undefined;
    })[];
};
