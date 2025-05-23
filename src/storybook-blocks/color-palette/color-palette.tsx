import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import './color-palette.css';

type ColorItem = {
  color: string;
  label: ReactNode;
};

export function ColorPalette({
  className,
  colors,
}: {
  className?: string;
  colors: ColorItem[];
}) {
  return (
    <div className={classNames('dc-color-palette', className)}>
      <dl className="dc-color-palette__items">
        {colors.map((item, index) => (
          <ColorPaletteRow key={`${item.color}-${index}`} item={item} />
        ))}
      </dl>
    </div>
  );
}

function ColorPaletteRow({
  item,
}: {
  item: ColorItem;
}) {
  const color = item.color;
  const label = item.label;
  const sampleRef = useRef<HTMLDivElement | null>(null);
  const [computedColor, setComputedColor] = useState('');

  useLayoutEffect(() => {
    const sample = sampleRef.current;
    if (sample) {
      const computedColor = window.getComputedStyle(sample).backgroundColor;
      setComputedColor(computedColor);
    }
  }, []);

  return (
    <>
      <dt className="dc-color-palette__item-label">
        {label}
      </dt>
      <dd className="dc-color-palette__item-color">
        <figure className="dc-color-item">
          <div className="dc-color-item__sample">
            <div ref={sampleRef} style={{ background: color }} />
          </div>
          {computedColor && (
            <figcaption className="dc-color-item__color">
              {color}
              <code>{computedColor}</code>
            </figcaption>
          )}
        </figure>
      </dd>
    </>
  );
}
