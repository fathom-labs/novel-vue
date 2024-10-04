import { PropType } from "vue";
import { Editor, Range } from "@tiptap/core";
import { SuggestionItem } from "./slashExtension";
declare function onKeyDown(e: KeyboardEvent): boolean | undefined;
declare const _default: import("vue").DefineComponent<{
    items: {
        type: PropType<SuggestionItem[]>;
        required: true;
    };
    command: {
        type: FunctionConstructor;
        required: true;
    };
    editor: {
        type: PropType<Editor>;
        required: true;
    };
    range: {
        type: PropType<Range>;
        required: true;
    };
}, {
    onKeyDown: typeof onKeyDown;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    items: {
        type: PropType<SuggestionItem[]>;
        required: true;
    };
    command: {
        type: FunctionConstructor;
        required: true;
    };
    editor: {
        type: PropType<Editor>;
        required: true;
    };
    range: {
        type: PropType<Range>;
        required: true;
    };
}>>, {}, {}>;
export default _default;
