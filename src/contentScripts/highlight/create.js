import highlight from './highlight/index.js';

import getAllFound from '../highlights/getAllFound.js';
import { store } from '../utils/storageManager.js';

async function create(color, selection = window.getSelection()) {
  const selectionString = selection.toString();
  if (!selectionString) return;

  let container = selection.getRangeAt(0).commonAncestorContainer;

  // Sometimes the element will only be text. Get the parent in that case
  // TODO: Is this really necessary?
  while (!container.innerHTML) {
      container = container.parentNode;
  }

  const highlightIndex = await store(selection, container, location.hostname + location.pathname, location.href, color.color, color.textColor);
  highlight(selectionString, container, selection, color.color, color.textColor, highlightIndex);

  // eslint-disable-next-line no-console
  const b = {"highlights":Array.from(getAllFound()), "hostname":location.hostname, "location":location.pathname, "title":document.title, "currentline":selectionString};

  const request = new XMLHttpRequest();
  request.open("POST", `http://localhost:8000/`, true);
  request.send(`${JSON.stringify(b)}`);
}

export default create;
