import React from 'react';
import { shallow } from 'enzyme';
import ReactMailForm from '.';

const email = 'yocee57@gmail.com';

const render = (to, props = {}) => shallow(<ReactMailForm to={to} {...props} />);

describe('Rendering', () => {
  it('Component could not be rendered without `to` prop.', () => {
    expect(render).toThrowError();
  });

  it('Component will be rendered with `to` prop.', () => {
    const component = render(email);

    expect(component.exists('div')).toBe(true);

    const div = component.find('div');
    expect(div.hasClass('')).toBe(true);

    expect(div.exists('input')).toBe(true);
    expect(div.exists('textarea')).toBe(true);
    expect(div.exists('a')).toBe(true);
  });

  it('`className` can be affected to `<div>` element.', () => {
    expect(render(email, { className: 'class-name' }).find('div').hasClass('class-name')).toBe(true);
    expect(render(email, { className: 'react-mail-form' }).find('div').hasClass('react-mail-form')).toBe(true);
  });

  it('`<a>` has a text. and it can be set by `buttonText` prop.', () => {
    expect(render(email).find('a').text()).toBe('Send E-mail');
    expect(render(email, { buttonText: 'Contact' }).find('a').text()).toBe('Contact');
    expect(render(email, { buttonText: 'Submit' }).find('a').text()).toBe('Submit');
  });

  it('`titleMaxLength` can be string or number. but, `maxLength` in `<input>` will be number.', () => {
    expect(typeof render(email).find('input').props().maxLength).toBe('number');
    expect(render(email).find('input').props().maxLength).toBe(50);
    expect(render(email, { titleMaxLength: '100' }).find('input').props().maxLength).toBe(100);
    expect(render(email, { titleMaxLength: 100 }).find('input').props().maxLength).toBe(100);
    expect(render(email, { titleMaxLength: '10' }).find('input').props().maxLength).toBe(10);
    expect(render(email, { titleMaxLength: 10 }).find('input').props().maxLength).toBe(10);
  });

  it('`titlePlaceholder` is the placeholder of `<input>`.', () => {
    expect(render(email).find('input').props().placeholder).toBe('Title...');
    expect(render(email, { titlePlaceholder: 'This is placeholder' }).find('input').props().placeholder).toBe('This is placeholder');
  });

  it('`contentsRows` can be string or number. but, `rows` in `<textarea>` will be number.', () => {
    expect(typeof render(email).find('textarea').props().rows).toBe('number');
    expect(render(email).find('textarea').props().rows).toBe(8);
    expect(render(email, { contentsRows: '10' }).find('textarea').props().rows).toBe(10);
    expect(render(email, { contentsRows: 10 }).find('textarea').props().rows).toBe(10);
    expect(render(email, { contentsRows: '5' }).find('textarea').props().rows).toBe(5);
    expect(render(email, { contentsRows: 5 }).find('textarea').props().rows).toBe(5);
  });

  it('`contentsMaxLength` can be string or number. but, `maxLength` in `<textarea>` will be number.', () => {
    expect(typeof render(email).find('textarea').props().maxLength).toBe('number');
    expect(render(email).find('textarea').props().maxLength).toBe(500);
    expect(render(email, { contentsMaxLength: '100' }).find('textarea').props().maxLength).toBe(100);
    expect(render(email, { contentsMaxLength: 100 }).find('textarea').props().maxLength).toBe(100);
    expect(render(email, { contentsMaxLength: '10' }).find('textarea').props().maxLength).toBe(10);
    expect(render(email, { contentsMaxLength: 10 }).find('textarea').props().maxLength).toBe(10);
  });

  it('`contentsPlaceholder` is the placeholder of `<textarea>`.', () => {
    expect(render(email).find('textarea').props().placeholder).toBe('Contents...');
    expect(render(email, { contentsPlaceholder: 'This is placeholder' }).find('textarea').props().placeholder).toBe('This is placeholder');
  });
});

describe('Event', () => {
  it('If key event is fired on `<input>`, The state will be changed.', () => {
    const component = render(email);

    const event = { target: { value: 'Changed' } };
    component.find('input').simulate('change', event);

    expect(component.state().title).toBe('Changed');
  });

  it('If key event is fired on `<textarea>`, The state will be changed.', () => {
    const component = render(email);

    const event = { target: { value: 'Changed' } };
    component.find('textarea').simulate('change', event);

    expect(component.state().contents).toBe('Changed');
  });
});
