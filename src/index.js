import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import Vue from 'vue'
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

const ForwardRef = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="demo-forwardRef">
      demo-forwardRef
    </div>
  )
})

class ClassComponent1 extends React.PureComponent {
  static propTypes = {
    arr: PropTypes.array,
  }

  static defaultProps = {
    arr: ['foo', 'bar', 'baz'],
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.asc) {
      return {
        arr: nextProps.arr.slice(),
      }
    }
    return {
      arr: nextProps.arr.slice().reverse(),
    }
  }

  state = {
    counter: 0,
    asc: true,
    arr: [],
    hasError: false,
    errorInfo: null,
  }

  btnRef = React.createRef()
  forwardRef = React.createRef()

  handleClick = () => {
    // effectTag |= Callback
    this.setState(
      (prevState, nextProps) => ({
        counter: prevState.counter + 1,
        asc: !prevState.asc,
        arr: !prevState.asc
          ? nextProps.arr.slice()
          : nextProps.arr.slice().reverse(),
      }),
      () => {
        console.log('did setState')
        console.log(this.btnRef.current)
        console.log(this.forwardRef.current)
      }
    )
  }

  render() {
    if (this.state.hasError) {
      console.log('has error')
      return <div>error</div>
    }
    // arr
    const arr = this.state.arr.map((text, index) => {
      if (index === 0) {
        return <span key={text}>{text}</span>
      }
      return (
        <React.Fragment key={text}>
          <br />
          <span>{text}</span>
        </React.Fragment>
      )
    })
    // render
    return (
      <div className="demo-classComponent1">
        <button
          ref={this.btnRef}
          style={{ border: '1px solid teal', outline: 0 }}
          onClick={this.handleClick}
        >
          click {this.state.counter} times
        </button>
        <p className="arr">{arr}</p>
        <ForwardRef ref={this.forwardRef} />
        {this.props.children}
      </div>
    )
  }

  // effectTag |= Update
  componentDidMount() {
    console.log('did mount')
  }

  // effectTag |= Snapshot
  getSnapshotBeforeUpdate(prevProps, prevState) {
    return {
      snapshot: 'zyy',
    }
  }

  // effectTag |= Update
  componentDidUpdate(prevProps, prevState, snapshot) {}

  componentDidCatch(error, info) {
    console.log('did catch')
    this.setState({
      hasError: true,
      errorInfo: info,
    })
  }
}

class ClassComponent2 extends React.PureComponent {
  render() {
    return <div className="demo-classComponent2">asdf</div>
  }
}

function FunctionalComponent1() {
  return <div className="demo-functionalComponent1">fc</div>
}

function FunctionalComponent2() {
  return <ClassComponent2 />
}

let modalRoot = document.querySelector('#modal-root')
if (!modalRoot) {
  modalRoot = document.createElement('div')
  modalRoot.id = 'modal-root'
  document.body.appendChild(modalRoot)
}

function PortalComponent() {
  return ReactDOM.createPortal(
    <div className="demo-modal">demo-modal</div>,
    modalRoot
  )
}

function Err() {
  // throw new Error('bang')
  return ''
}

// TODO: switching from a direct text child to a normal child, or to empty

function App() {
  return (
    <React.Fragment>
      <ClassComponent1>
        <Err />
      </ClassComponent1>
      <FunctionalComponent1 />
      <FunctionalComponent2 />
      <PortalComponent />
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
// registerServiceWorker();
