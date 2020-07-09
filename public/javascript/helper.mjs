export const createElement = ({ tagName, className, attributes = {} }) => {
  const element = document.createElement(tagName);

  if (className) {
    addClass(element, className);
  }

  Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));

  return element;
};

export const addClass = (element, className) => {
  const classNames = formatClassNames(className);
  element.classList.add(...classNames);
};

export const removeClass = (element, className) => {
  const classNames = formatClassNames(className);
  element.classList.remove(...classNames);
};

export const formatClassNames = className => className.split(" ").filter(Boolean);
