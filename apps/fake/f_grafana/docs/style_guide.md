
# css书写风格
# sass文件组织架构
# css最佳实践

## normalize, reset
- html
```
html {
  // Sets a specific default `font-size` for user with `rem` type scales.
  font-size: $font-size-root;
  // As a side-effect of setting the @viewport above,
  // IE11 & Edge make the scrollbar overlap the content and automatically hide itself when not in use.
  // Unfortunately, the auto-showing of the scrollbar is sometimes too sensitive,
  // thus making it hard to click on stuff near the right edge of the page.
  // So we add this style to force IE11 & Edge to use a "normal", non-overlapping, non-auto-hiding scrollbar.
  // See https://github.com/twbs/bootstrap/issues/18543
  -ms-overflow-style: scrollbar;
  // Changes the default tap highlight to be completely transparent in iOS.
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  height: 100%;
}
```

- body
```
body {
  // Make the `body` use the `font-size-root`
  font-family: $font-family-base;
  font-size: $font-size-base;
  line-height: $line-height-base;
  // Go easy on the eyes and use something other than `#000` for text
  color: $body-color;
  // By default, `<body>` has no `background-color` so we set one as a best practice.
  background-color: $body-bg;
  height: 100%;
  width: 100%;
  position: absolute;
}
```

- tabindex

```
[tabindex="-1"]:focus {
    outline: none !important;
}
```



- typography
```
// Remove top margins from headings
//
// By default, `<h1>`-`<h6>` all receive top and bottom margins. We nuke the top
// margin for easier control within type scales as it avoids margin collapsing.
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}
```

- pagraph
```
// Reset margins on paragraphs
//
// Similarly, the top margin on `<p>`s get reset. However, we also reset the
// bottom margin to use `rem` units instead of `em`.
p {
  margin-top: 0;
  margin-bottom: 1rem;
}
```

- abbr
```
// Abbreviations and acronyms
abbr[title] {
  cursor: help;
  border-bottom: 1px dotted $abbr-border-color;
}
```

- address

```
address {
    margin-bottom: 1rem;
    font-style: normal;
    line-height: inherit;
}
```

- ol,ul,dd
```
ol,
ul,
dl {
    margin-top: 0;
    margin-bottom: 0;
}

ol ol,
ul ul,
ol ul,
ul ol {
    margin-bottom: 0;
}

dt {
    font-weight: $dt-font-weight;
}

dd {
    margin-bottom: 0.5rem;
    margin-left: 0; // Undo browser default
}
```


- blockquote
```
blockquote {
    margin: 0 0 1rem;
}
```

- a link
```
a {
  color: $link-color;
  text-decoration: $link-decoration;

  @include hover-focus {
    color: $link-hover-color;
    text-decoration: $link-hover-decoration;
  }

  &:focus {
    @include tab-focus();
  }
}
```

## sass mixin

