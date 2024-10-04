import { Extension } from "@tiptap/core";
export interface SuggestionItem {
    title: string;
    description: string;
    icon: any;
}
declare const SlashCommand: Extension<any, any>;
export default SlashCommand;
