# desktop.skapi.com

## Dev notes

- For pop ups, try to nest inside relative positioned parent, and position from there:
  ```
  .parent {
    position: relative;

    .child {
        position: absolute;
    }
  }
  ```
- For hovers, you can use css .hoverDiv:hover + popUp
  ```
  .sibling:hover + .popUp {
    display: block;
    position: absolute;
  }
  ```

- The combination:
  ```
  .parent {
    position: relative;

    .sibling:hover + .popUp {
        display: block;
        position: absolute;
    }
  }
  ```