import React from 'react';

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

interface ReactMailFormState {
  title: string;
  contents: string;
}

export default class ReactMailForm extends React.Component<ReactMailFormProps, ReactMailFormState> {
  public state: ReactMailFormState = {
    title: '',
    contents: '',
  };

  public constructor(props: ReactMailFormProps) {
    super(props);
    const { to } = this.props;

    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(to)) {
      throw new Error('Invalid email address');
    }
  }

  public render(): React.ReactElement {
    const {
      to,
      className = '',
      titleMaxLength = 50,
      titlePlaceholder = 'Title...',
      contentsRows = 8,
      contentsMaxLength = 500,
      contentsPlaceholder = 'Contents...',
      buttonText = 'Send E-mail',
    } = this.props;
    const { title, contents } = this.state;

    return (
      <div className={className}>
        <input
          type="email"
          value={title}
          onChange={this.handleTitle}
          maxLength={Number(titleMaxLength)}
          placeholder={titlePlaceholder}
        />
        <textarea
          value={contents}
          onChange={this.handleContents}
          rows={Number(contentsRows)}
          maxLength={Number(contentsMaxLength)}
          placeholder={contentsPlaceholder}
        />
        <a
          href={`mailto:${to}?subject=${title}&body=${contents.replace(/\n/g, '%0D%0A')}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {buttonText}
        </a>
      </div>
    );
  }

  private handleTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ title: e.target.value });
  };

  private handleContents = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({ contents: e.target.value });
  };
}
