import * as React from 'react';
import * as TS from "typestyle";
import * as colors from '../styles/colors';

import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { darken } from 'polished';
/**
 * Simple button component.
 * 
 * @class Button
 * @extends {Component}
 */
class Button extends React.Component {
  constructor(props) {
    super(props);

    this.el = null;

    this.defaultStyle.background = colors[this.props.bgColor];
    this.defaultStyle.color = colors[this.props.fontColor];
    this.defaultStyle.$nest = {
      "&:hover": {
        background: darken(0.1, colors[this.props.bgColor])
      }
    };
  }

  defaultStyle = {
    border: "none",
    borderRadius: "2px",
    cursor: "pointer",
    display: "inline-block",
    fontSize: "16px",
    lineHeight: "40px",
    fontWeight: "200",
    margin: "8px 0",
    outline: "none",
    padding: "0 12px",
    textTransform: "uppercase",
    transition: "all 300ms ease",
  };

  static defaultProps = {
    style: null,
    tooltip: null,
    children: null,

    type: 'button',
    bgColor: 'blue',
    fontColor: 'white',

    events: [
      ['click', 'onClick'],
      ['focus', 'onFocus'],
      ['hover', 'onHover']
    ]
  }

  static propTypes = {
    tooltip: PropTypes.string,
    type: PropTypes.string,
    children: PropTypes.any,
    bgColor: PropTypes.string,
    fontColor: PropTypes.string,
    style: PropTypes.object,
    events: PropTypes.array,
    style: PropTypes.object
  }

  componentDidMount() {
    //atach event listeners to the events on props.events with function passed on props
    this.attachEventHandlers(this.props);
  }

  renderStyle = () => {
    let style = {};
    if (this.props.style) {
      style = extendDeep(this.props.style, this.defaultStyle);
    } else {
      style = this.defaultStyle;
    }

    return TS.style(style);
  }

  attachEventHandlers(props) {
    props.events.forEach(event => {
      if (typeof props[event[1]] !== 'undefined') {
        this.el.addEventListener(event[0], props[event[1]]);
      }
    });
  }

  render() {
    return (
      <button ref={(item) => { this.el = item; }} className={this.renderStyle()} type={this.props.type} title={this.props.tooltip}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;