import React from 'react'
import ReactDOM from 'react-dom'
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

class ClassComponent1 extends React.Component {
  state = {
    counter: 0,
    asc: true,
    arr: [],
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
  handleClick = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
      asc: !prevState.asc,
    }))
  }
  render() {
    return (
      <div className="classComponent1">
        <button style={{ border: '1px solid teal' }} onClick={this.handleClick}>
          click {this.state.counter} times
        </button>
        <p className="more">
          {this.state.arr.map((text, index) => {
            if (index === 0) {
              return <span key={text}>{text}</span>
            }
            return (
              <React.Fragment key={text}>
                <br />
                <span>{text}</span>
              </React.Fragment>
            )
          })}
        </p>
      </div>
    )
  }
}

class ClassComponent2 extends React.Component {
  render() {
    return <div className="classComponent2">asdf</div>
  }
}

function FunctionalComponent1() {
  return <div className="functionalComponent1" />
}

function FunctionalComponent2() {
  return <ClassComponent2 />
}

function App() {
  return (
    <React.Fragment>
      <ClassComponent1 arr={['foo', 'bar', 'baz']} />
      <FunctionalComponent1 />
      <FunctionalComponent2 />
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
// registerServiceWorker();
