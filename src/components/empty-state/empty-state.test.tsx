import { it } from 'vitest';
import { EmptyState } from './empty-state.js';
import { render, screen } from '../../test/test-utils.js';

it('renders without errors', () => {
  const image = <img data-testid="empty-state-image" src="https://test.local/image.png" alt="" />;
  const heading = 'Empty state heading';
  const description = 'Empty state description';
  const primaryAction = 'Primary action';
  const secondaryAction = 'Secondary action';
  const content = 'Empty state content';
  render(
    <EmptyState
      image={image}
      title={heading}
      message={description}
      primaryAction={<button>{primaryAction}</button>}
      secondaryAction={<button>{secondaryAction}</button>}
    >
      {content}
    </EmptyState>,
  );

  screen.getByTestId('empty-state-image');
  screen.getByText(heading);
  screen.getByText(description);
  screen.getByText(primaryAction);
  screen.getByText(secondaryAction);
  screen.getByText(content);
});

it('renders without errors without the image', () => {
  render(
    <EmptyState
      title="Empty state heading"
      message="Empty state description"
      primaryAction={<button>Primary action</button>}
      secondaryAction={<button>Secondary action</button>}
    >
      Empty state content
    </EmptyState>,
  );
});

it('renders without errors without the heading', () => {
  render(
    <EmptyState
      image={<img src="https://test.local/image.png" alt="" />}
      message="Empty state description"
      primaryAction={<button>Primary action</button>}
      secondaryAction={<button>Secondary action</button>}
    >
      Empty state content
    </EmptyState>,
  );
});

it('renders without errors without the description', () => {
  render(
    <EmptyState
      image={<img src="https://test.local/image.png" alt="" />}
      title="Empty state heading"
      primaryAction={<button>Primary action</button>}
      secondaryAction={<button>Secondary action</button>}
    >
      Empty state content
    </EmptyState>,
  );
});

it('renders without errors without the primary action', () => {
  render(
    <EmptyState
      image={<img src="https://test.local/image.png" alt="" />}
      title="Empty state heading"
      message="Empty state description"
      secondaryAction={<button>Secondary action</button>}
    >
      Empty state content
    </EmptyState>,
  );
});

it('renders without errors without the secondary action', () => {
  render(
    <EmptyState
      image={<img src="https://test.local/image.png" alt="" />}
      title="Empty state heading"
      message="Empty state description"
      primaryAction={<button>Primary action</button>}
    >
      Empty state content
    </EmptyState>,
  );
});

it('renders without errors without children', () => {
  render(
    <EmptyState
      image={<img src="https://test.local/image.png" alt="" />}
      title="Empty state heading"
      message="Empty state description"
      primaryAction={<button>Primary action</button>}
      secondaryAction={<button>Secondary action</button>}
    />,
  );
});
