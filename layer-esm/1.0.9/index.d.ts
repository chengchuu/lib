type LayerType = 0 | 1 | 2 | 3 | 4;
type LayerOffsetKeyword = "auto" | "t" | "r" | "b" | "l" | "lt" | "lb" | "rt" | "rb";
type LayerOffset = LayerOffsetKeyword | string | number | [string | number, string | number];
type LayerArea = string | number | [string | number, string | number];
type LayerTitle = false | string | [string, string];
type LayerShade = boolean | number | [number, string];
type LayerTipDirection = 1 | 2 | 3 | 4;
interface LayerTabItem {
    title: string;
    content: string;
}
interface LayerOptions {
    type?: LayerType;
    title?: LayerTitle;
    content?: string | HTMLElement | [string, string?] | [string, HTMLElement | string];
    shade?: LayerShade;
    shadeClose?: boolean;
    fixed?: boolean;
    move?: boolean | string;
    moveType?: 0 | 1;
    resize?: boolean;
    closeBtn?: boolean | 0 | 1 | 2;
    time?: number;
    zIndex?: number;
    maxWidth?: number;
    anim?: number;
    isOutAnim?: boolean;
    icon?: number;
    area?: LayerArea;
    offset?: LayerOffset;
    btn?: false | string | string[];
    btnAlign?: "l" | "c" | "r" | string;
    skin?: string;
    className?: string;
    id?: string;
    scrollbar?: boolean;
    minStack?: boolean;
    maxmin?: boolean;
    shadeStyle?: string;
    tips?: LayerTipDirection | [LayerTipDirection, string];
    follow?: HTMLElement | string;
    formType?: 0 | 1 | 2;
    value?: string;
    maxlength?: number;
    success?: (layero: HTMLElement, index: number) => void;
    end?: () => void;
    yes?: (index: number, layero: HTMLElement) => void;
    btn2?: (index: number, layero: HTMLElement) => boolean | void;
    cancel?: (index: number, layero: HTMLElement) => boolean | void;
    change?: (index: number) => void;
    tab?: LayerTabItem[];
}
interface LayerPromptOptions extends Omit<LayerOptions, "content" | "type"> {
    formType?: 0 | 1 | 2;
    value?: string;
}
interface LayerTipsOptions extends Omit<LayerOptions, "content" | "type" | "follow"> {
    tips?: LayerTipDirection | [LayerTipDirection, string];
}
interface LayerTabOptions extends Omit<LayerOptions, "content" | "type" | "title"> {
    tab: LayerTabItem[];
}
interface LayerStyleOptions {
    width?: string | number;
    height?: string | number;
    top?: string | number;
    left?: string | number;
    right?: string | number;
    bottom?: string | number;
    position?: string;
    overflow?: string;
}

declare const config: (options?: Partial<LayerOptions>) => {
    v: string;
    readonly index: number;
    readonly zIndex: number;
    config: any;
    ready: (callback?: () => void) => any;
    open: (options?: LayerOptions) => number;
    close: (index: number, callback?: () => void) => void;
    closeAll: (type?: string | (() => void), callback?: () => void) => void;
    alert: (content: string, options?: LayerOptions | ((index: number, layero: HTMLElement) => void) | undefined, yes?: ((index: number, layero: HTMLElement) => void) | undefined) => number;
    confirm: (content: string, options?: LayerOptions | ((index: number, layero: HTMLElement) => void) | undefined, yes?: ((index: number, layero: HTMLElement) => void) | undefined, cancel?: ((index: number, layero: HTMLElement) => void) | undefined) => number;
    msg: (content: string, options?: LayerOptions | (() => void), end?: () => void) => number;
    load: (icon?: number, options?: LayerOptions) => number;
    tips: (content: string, follow: string | HTMLElement, options?: LayerTipsOptions) => number;
    prompt: (options?: LayerPromptOptions, yes?: ((value: string, index: number, input: HTMLInputElement | HTMLTextAreaElement) => void) | undefined) => number;
    tab: (options: LayerTabOptions) => number;
    title: (name: string, index?: number) => void;
    style: (index: number, options: LayerStyleOptions) => void;
    setTop: (indexOrElement: number | HTMLElement) => number;
    getChildFrame: (selector: string, index?: number) => HTMLElement | null;
    getFrameIndex: (name: string) => number | null;
    iframeAuto: (index: number) => void;
    iframeSrc: (index: number, url: string) => void;
    min: (index: number, options?: Partial<LayerOptions>) => void;
    restore: (index: number) => void;
    full: (index: number) => void;
};
declare const ready: (callback?: () => void) => {
    v: string;
    readonly index: number;
    readonly zIndex: number;
    config: (options?: Partial<LayerOptions>) => any;
    ready: any;
    open: (options?: LayerOptions) => number;
    close: (index: number, callback?: () => void) => void;
    closeAll: (type?: string | (() => void), callback?: () => void) => void;
    alert: (content: string, options?: LayerOptions | ((index: number, layero: HTMLElement) => void) | undefined, yes?: ((index: number, layero: HTMLElement) => void) | undefined) => number;
    confirm: (content: string, options?: LayerOptions | ((index: number, layero: HTMLElement) => void) | undefined, yes?: ((index: number, layero: HTMLElement) => void) | undefined, cancel?: ((index: number, layero: HTMLElement) => void) | undefined) => number;
    msg: (content: string, options?: LayerOptions | (() => void), end?: () => void) => number;
    load: (icon?: number, options?: LayerOptions) => number;
    tips: (content: string, follow: string | HTMLElement, options?: LayerTipsOptions) => number;
    prompt: (options?: LayerPromptOptions, yes?: ((value: string, index: number, input: HTMLInputElement | HTMLTextAreaElement) => void) | undefined) => number;
    tab: (options: LayerTabOptions) => number;
    title: (name: string, index?: number) => void;
    style: (index: number, options: LayerStyleOptions) => void;
    setTop: (indexOrElement: number | HTMLElement) => number;
    getChildFrame: (selector: string, index?: number) => HTMLElement | null;
    getFrameIndex: (name: string) => number | null;
    iframeAuto: (index: number) => void;
    iframeSrc: (index: number, url: string) => void;
    min: (index: number, options?: Partial<LayerOptions>) => void;
    restore: (index: number) => void;
    full: (index: number) => void;
};
declare const open: (options?: LayerOptions) => number;
declare const setTop: (indexOrElement: number | HTMLElement) => number;
declare const title: (name: string, index?: number) => void;
declare const style: (index: number, options: LayerStyleOptions) => void;
declare const getChildFrame: (selector: string, index?: number) => HTMLElement | null;
declare const getFrameIndex: (name: string) => number | null;
declare const iframeAuto: (index: number) => void;
declare const iframeSrc: (index: number, url: string) => void;
declare const min: (index: number, options?: Partial<LayerOptions>) => void;
declare const restore: (index: number) => void;
declare const full: (index: number) => void;
declare const close: (index: number, callback?: () => void) => void;
declare const closeAll: (type?: string | (() => void), callback?: () => void) => void;
declare const alert: (content: string, options?: LayerOptions | ((index: number, layero: HTMLElement) => void) | undefined, yes?: ((index: number, layero: HTMLElement) => void) | undefined) => number;
declare const confirm: (content: string, options?: LayerOptions | ((index: number, layero: HTMLElement) => void) | undefined, yes?: ((index: number, layero: HTMLElement) => void) | undefined, cancel?: ((index: number, layero: HTMLElement) => void) | undefined) => number;
declare const msg: (content: string, options?: LayerOptions | (() => void), end?: () => void) => number;
declare const load: (icon?: number, options?: LayerOptions) => number;
declare const tips: (content: string, follow: string | HTMLElement, options?: LayerTipsOptions) => number;
declare const prompt: (options?: LayerPromptOptions, yes?: ((value: string, index: number, input: HTMLInputElement | HTMLTextAreaElement) => void) | undefined) => number;
declare const tab: (options: LayerTabOptions) => number;
declare const layer: {
    v: string;
    readonly index: number;
    readonly zIndex: number;
    config: (options?: Partial<LayerOptions>) => any;
    ready: (callback?: () => void) => any;
    open: (options?: LayerOptions) => number;
    close: (index: number, callback?: () => void) => void;
    closeAll: (type?: string | (() => void), callback?: () => void) => void;
    alert: (content: string, options?: LayerOptions | ((index: number, layero: HTMLElement) => void) | undefined, yes?: ((index: number, layero: HTMLElement) => void) | undefined) => number;
    confirm: (content: string, options?: LayerOptions | ((index: number, layero: HTMLElement) => void) | undefined, yes?: ((index: number, layero: HTMLElement) => void) | undefined, cancel?: ((index: number, layero: HTMLElement) => void) | undefined) => number;
    msg: (content: string, options?: LayerOptions | (() => void), end?: () => void) => number;
    load: (icon?: number, options?: LayerOptions) => number;
    tips: (content: string, follow: string | HTMLElement, options?: LayerTipsOptions) => number;
    prompt: (options?: LayerPromptOptions, yes?: ((value: string, index: number, input: HTMLInputElement | HTMLTextAreaElement) => void) | undefined) => number;
    tab: (options: LayerTabOptions) => number;
    title: (name: string, index?: number) => void;
    style: (index: number, options: LayerStyleOptions) => void;
    setTop: (indexOrElement: number | HTMLElement) => number;
    getChildFrame: (selector: string, index?: number) => HTMLElement | null;
    getFrameIndex: (name: string) => number | null;
    iframeAuto: (index: number) => void;
    iframeSrc: (index: number, url: string) => void;
    min: (index: number, options?: Partial<LayerOptions>) => void;
    restore: (index: number) => void;
    full: (index: number) => void;
};

export { alert, close, closeAll, config, confirm, layer as default, full, getChildFrame, getFrameIndex, iframeAuto, iframeSrc, load, min, msg, open, prompt, ready, restore, setTop, style, tab, tips, title };
