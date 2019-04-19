declare module 'react-mail-form' {
    export interface ReactMailFormProps {
        to: string;
        className?: string;
        titleMaxLength?: string | number;
        titlePlaceholder?: string;
        contentsRows?: string | number;
        contentsMaxLength?: string | number;
        contentsPlaceholder?: string;
        buttonText?: string;
    }

    const k: ReactMailFormProps;
    export = k;
}
