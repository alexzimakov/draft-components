export type ChangeObserverCallback = () => void;

export type ChangeObserverDestructor = () => void;

export function observeElementChange(
  element: Element,
  callback: ChangeObserverCallback,
): ChangeObserverDestructor {
  const elementMutationObserver = new MutationObserver(() => {
    callback();
  });
  elementMutationObserver.observe(element, {
    subtree: true,
    childList: true,
    characterData: true,
  });

  return () => {
    elementMutationObserver.disconnect();
  };
}
