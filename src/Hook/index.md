# what are hooks

Hooks are functions that let you "hook into"
React state and lifecycle features
from function components.

Hooks let you organize side effects in a component by what pieces are related
(such as adding and removing a subscription),
rather than forcing asplit based on lifecycle methods.

## useState

```js
const [state, setState] = useState(initialState);
```

### Using Multiple State Variables

You can use the State Hook more than once in a single component.
But you don't have to use many state variables.
State variables can hold objects and arrays just fine,
so you can still group related data together.
However, unlink `this.setState` in a class,
updating a state variable always replaces it instead of merging it.

### Functional updates

You can pass a function to setState. The function will receive the previous value, and return an updated value.

### Lazy initialization

You can provice a funtion as initialState, which will be executed only on the initial render.

## useEffect

```js
useEffect(didUpdate);
```

useEffect adds the ability to perform side effects to a function component
it serves the same purpose as cDM, cDU and cWU in React classes.
Data fetching, setting up a subscription,
and manually changing the DOM in react componennts are all examples of side effects.

By default, useEffect runs both after the first render and after every update.

The function passed to useEffect is going to be different on every render.
This is what lets us read the state from inside the effect without worring about it getting stale.
Every time we re-render, we schedule a different effect, replacing the previous one.

Unlike cDM or cDU, useEffect don't block the brower from updating the screen.

### Cleaning up an effect

useEffect may returns a function that React will call to cleans up the effect.
React will performs the cleanup when the component unmounts.
React also cleans up effects from the previous render before running the effects next time.

### Timing of effects

Unlink cDM and cDU, the function passed to useEffect fires after layout and paint, during a deferred event.
So it will not block the brower from updating the screen.
But it's guaranteed to fire before any new renders.
React will always flush a previous render's effects before starting a new update.

### Conditionally firing an effect

The default behavior for effects is to fire the effect after every completed render.

You can tell React to skip applying an effect if vertain values haven't changed between re-renders.

To implement this, pass a second argument to useEffect that is the array of values that the effect depends on.

Passing in an empty array [] tells React that your effect doesn't depend on any values from the components,
so that effect would run only on mount and clean up on unmount; it won't run on updates.

# Rules of Hooks

## Only call Hooks at the top level.

Don't call Hooks inside loops, conditions, or nested functions.

By following this rule, you ensure that Hooks are called in the same order each time a component renders.
Thats what allows React to correctly preserve the state of Hooks between multiple useState and useEffect calls.

## Only call Hooks from React function components.

Don't call Hooks from regular JavaScript functions. Instead, you can:

Call Hooks from React function components.
Call Hooks from custom Hooks.

# Building Your Own Hooks

Traditionally in React, we've had two popular ways to share stateful logic between components:
render props and higer-order components.

A custom Hook is a JavaScript function whose name starts with 'use' and that may call other Hooks.

Custom Hooks are a mechanism to reuse stateful logic, every time you use a custom Hook,
all state and effects inside of it are fully isolated.

You can write custom Hooks that cover a wide range of use cases like
form handling, animation, declarative subscriptions, timers, and probably many more.
