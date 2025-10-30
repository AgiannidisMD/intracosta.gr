import { useState } from 'react';

interface LoadMoreListProps {
  items: string[];
}

export default function LoadMoreList({ items }: LoadMoreListProps) {
  const [visible, setVisible] = useState(10);
  const showMore = () => setVisible((v) => v + 10);

  return (
    <div>
      <ul aria-live="polite">
        {items.slice(0, visible).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {visible < items.length && (
        <button onClick={showMore} className="mt-4">
          Load more
        </button>
      )}
    </div>
  );
}
