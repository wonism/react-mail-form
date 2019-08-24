# react-mail-form
> React component for simple contact form with zero dependencies

## Getting Started
```
$ npm i -S react-mail-form
```

## Development
```sh
$ npm run dev
```

- access [localhost:8888](http://localhost:8888)

## Production Bundle
```sh
$ npm run build
```

## How to Use
```jsx
import ReactContactForm from 'react-mail-form';

<ReactContactForm to="address@gmail.com" />
```

### Parameters
| Parameter           | Type            | Remarks         |
|:--------------------|:----------------|:----------------|
| to                  | string          | Required        |
| className           | string          | Optional        |
| titleMaxLength      | string / number | -               |
| titlePlaceholder    | string          | -               |
| contentsRows        | string / number | -               |
| contentsMaxLength   | string / number | -               |
| contentsPlaceholder | string          | -               |
| buttonText          | string          | -               |
