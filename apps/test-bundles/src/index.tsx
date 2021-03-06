import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DefaultButton } from '@fluentui/react';
import './version';

function start(): void {
  const div: HTMLElement = document.createElement('div');

  document.body.appendChild(div);
  ReactDOM.render(
    <DefaultButton
      iconProps={{ iconName: 'Snow' }}
      text="hi"
      menuProps={{
        items: [
          { key: 'a', name: 'Item a' },
          { key: 'c', name: 'Item b' },
          { key: 'b', name: 'Item c' },
        ],
      }}
    />,
    div,
  );
}

if (document?.body) {
  start();
} else {
  window.onload = start;
}
