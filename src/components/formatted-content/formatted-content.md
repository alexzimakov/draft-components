```jsx
import { FormattedContent } from '../formatted-content';

<div style={{ display: 'grid', rowGap: 16 }}>
  <FormattedContent.LargeTitle>Large Title Text</FormattedContent.LargeTitle>
  <FormattedContent.Title1>Title 1 Text</FormattedContent.Title1>
  <FormattedContent.Title2>Title 2 Text</FormattedContent.Title2>
  <FormattedContent.Title3>Title 3 Text</FormattedContent.Title3>
  <FormattedContent.Headline>Headline Text</FormattedContent.Headline>
  <FormattedContent.Paragraph>
    <a href="https://www.lipsum.com" target="_blank">
      Lorem ipsum
    </a>{' '}
    dolor sit amet, consectetur adipisicing elit.
    <strong>Ad aliquid</strong>, autem beatae cum <em>deserunt eaque enim</em> eum
    eveniet excepturi fugiat <code>incidunt</code> ipsum laborum minus nam non numquam
    quaerat rem, repellendus.
  </FormattedContent.Paragraph>
  <FormattedContent.Subheadline>Subheadline Text</FormattedContent.Subheadline>
  <FormattedContent.Footnote>Footnote Text</FormattedContent.Footnote>
  <FormattedContent.Caption>Caption Text</FormattedContent.Caption>
</div>;
```

Formatted text

```jsx
import { FormattedContent } from '../formatted-content';

<FormattedContent>
  <h1>HTML basics</h1>
  <p>
    HTML (<b>H</b>ypertext <b>M</b>arkup <b>L</b>anguage) is the code that is
    used to structure a web page and its content. For example, content could be
    structured within a set of paragraphs, a list of bulleted points, or using
    images and data tables. As the title suggests, this article will give you a
    basic understanding of HTML and its functions.
  </p>
  <h2>So what is HTML?</h2>
  <p>
    HTML is a markup language that defines the structure of your content. HTML
    consists of a series of elements, which you use to enclose, or wrap,
    different parts of the content to make it appear a certain way, or act a
    certain way. The enclosing tags can make a word or image hyperlink to
    somewhere else, can italicize words, can make the font bigger or smaller,
    and so on. For example, take the following line of content:
  </p>
  <h3>Anatomy of an HTML element</h3>
  <p>The main parts of our element are as follows:</p>
  <ol>
    <li>
      <strong>The opening tag:</strong> This consists of the name of the element
      (in this case, <code>p</code>), wrapped in opening and closing{' '}
      <strong>angle brackets</strong>. This states where the element begins or
      starts to take effect — in this case where the paragraph begins.
    </li>
    <li>
      <strong>The closing tag:</strong> This is the same as the opening tag,
      except that it includes a <em>forward</em> slash before the element name.
      This states where the element ends — in this case where the paragraph
      ends. Failing to add a closing tag is one of the standard beginner errors
      and can lead to strange results.
    </li>
    <li>
      <strong>The content:</strong> This is the content of the element, which in
      this case, is just text.
    </li>
    <li>
      <strong>The element:</strong> The opening tag, the closing tag, and the
      content together comprise the element.
    </li>
  </ol>
  <p>
    Attributes contain extra information about the element that you don't want
    to appear in the actual content. Here, <code>class</code> is the attribute
    name and <code>editor-note</code> is the attribute value. The{' '}
    <code>class</code> attribute allows you to give the element a non-unique
    identifier that can be used to target it (and any other elements with the
    same <code>class</code> value) with style information and other things.
  </p>
  <h4>An attribute should always have the following:</h4>
  <ul>
    <li>
      A space between it and the element name (or the previous attribute, if the
      element already has one or more attributes).
    </li>
    <li>The attribute name followed by an equal sign.</li>
    <li>The attribute value wrapped by opening and closing quotation marks.</li>
  </ul>
  <FormattedContent.Caption>
    MDN Web Docs. HTML basics.
    <br />[<a href="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics">
      https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics
    </a>]
  </FormattedContent.Caption>
</FormattedContent>;
```
