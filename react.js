// The app state will be stored here
let hooks = []

// Index of the current visited hook
// Everytime 'useState' is called, it's value is incremented
let i = 0

// Store a initial state in the 'hooks' array
function useState(init) {
    // Stores the current index locally
    const _i = i

    // If the value don't exist, use the inital value
    const state = hooks[_i] || init

    // Stores globally
    hooks[_i] = state

    // Gets a new state and stores in the global environment
    function setState (newState) {
        hooks[_i] = newState
    }

    // Increment index to be used by the next hook
    i++

    // Returns a tuple with the state and the update function
    return [state, setState]
}

// Renders a component in a given DOM element
function render (component, root) {
    // Clear the index counter
    i = 0

    // Stores the app's actual state
    const oldHooks = JSON.stringify(hooks)

    // Clear root element and append the given component to it
    root.innerHTML = ''
    root.appendChild(component())

    // A silly way to check if state has changed, comparing the local copy with
    // the actual value on every 1 ms
    const tick = setInterval(() => {
        if (oldHooks !== JSON.stringify(hooks)) {
            clearInterval(tick)
            render(component, root)
        }
    }, 1)
}

// Receives a tag name, attributes object and children components, and returns a
// component
function createComponent (name, props, ...children) {
    // Create a base node with it's name
    const node = document.createElement(name)

    // Checks if has given any props
    if (props)
        // Iterate through the props object, setting the given values to the node
        Object.entries(props).forEach(([k, v]) => {
            // Adds an event listener if the prop is a function
            if (typeof v == 'function')
                node.addEventListener(k, v)
            // Otherwise set as a normal atrribute
            else
                node.setAttribute(k, v)
        })

    // Iterate through it's children values, being a function or a plain value
    children.forEach(child => {
        // If is a function, then execute and append it to the node
        if (typeof child === 'function')
            return node.appendChild(child())
        // Otherwise, convert it to a string and set as the node text
        else
            return node.textContent = child.toString()
    })

    // Returns the mounted HTML node
    return node
}

export default {
    createComponent,
    useState,
    render
}
