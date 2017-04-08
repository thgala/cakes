export function globalLoaderShow() {
  return {
    type: 'layout/GLOBAL_LOADER_SHOW'
  };
}

export function globalLoaderHide() {
  return {
    type: 'layout/GLOBAL_LOADER_HIDE'
  };
}

export function addBodyClass(className) {
  document.body.classList.add(className);
  return { type: '' };
}

export function removeBodyClass(className) {
  document.body.classList.remove(className);
  return { type: '' };
}

export function addHtmlClass(className) {
  document.getElementsByTagName('html')[0].classList
    .add(className);
  return { type: '' };
}
export function removeHtmlClass(className) {
  document.getElementsByTagName('html')[0].classList
    .remove(className);
  return { type: '' };
}
