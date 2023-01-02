import { render, screen } from '@testing-library/react';
import { EmptyState } from './empty-state';

it('renders without errors', () => {
  const image = <img src="https://test.local/image.png" alt="" />;
  const heading = 'Empty state heading';
  const description = 'Empty state description';
  const primaryAction = 'Primary action';
  const secondaryAction = 'Secondary action';
  const content = 'Empty state content';
  render(
    <EmptyState
      image={image}
      heading={heading}
      description={description}
      primaryAction={<button>{primaryAction}</button>}
      secondaryAction={<button>{secondaryAction}</button>}
    >
      {content}
    </EmptyState>
  );

  screen.getByRole('img');
  screen.getByText(heading);
  screen.getByText(description);
  screen.getByText(primaryAction);
  screen.getByText(secondaryAction);
  screen.getByText(content);
});

it('renders without errors without the image', () => {
  render(<EmptyState
    heading="Empty state heading"
    description="Empty state description"
    primaryAction={<button>Primary action</button>}
    secondaryAction={<button>Secondary action</button>}
  >
    Empty state content
  </EmptyState>);
});

it('renders without errors without the heading', () => {
  render(<EmptyState
    image={<img src="https://test.local/image.png" alt="" />}
    description="Empty state description"
    primaryAction={<button>Primary action</button>}
    secondaryAction={<button>Secondary action</button>}
  >
    Empty state content
  </EmptyState>);
});

it('renders without errors without the description', () => {
  render(<EmptyState
    image={<img src="https://test.local/image.png" alt="" />}
    heading="Empty state heading"
    primaryAction={<button>Primary action</button>}
    secondaryAction={<button>Secondary action</button>}
  >
    Empty state content
  </EmptyState>);
});

it('renders without errors without the primary action', () => {
  render(<EmptyState
    image={<img src="https://test.local/image.png" alt="" />}
    heading="Empty state heading"
    description="Empty state description"
    secondaryAction={<button>Secondary action</button>}
  >
    Empty state content
  </EmptyState>);
});

it('renders without errors without the secondary action', () => {
  render(<EmptyState
    image={<img src="https://test.local/image.png" alt="" />}
    heading="Empty state heading"
    description="Empty state description"
    primaryAction={<button>Primary action</button>}
  >
    Empty state content
  </EmptyState>);
});

it('renders without errors without children', () => {
  render(<EmptyState
    image={<img src="https://test.local/image.png" alt="" />}
    heading="Empty state heading"
    description="Empty state description"
    primaryAction={<button>Primary action</button>}
    secondaryAction={<button>Secondary action</button>}
  />);
});
