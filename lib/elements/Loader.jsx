import * as React from 'react';
import * as TS from "typestyle";

import PropTypes from 'prop-types';

/**
 * Componente contendo a tela de loading do sistema.
 * 
 * @class Loader
 * @extends {Component}
 */
class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  defaultStyle = {
    backgroundColor: 'rgba(255,255,255,0.8)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    zIndex: 9998,
    overflow: 'hidden',
    textAlign: 'center',
    opacity: 0.8,
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    cursor: 'none !important',
    $nest: {
      '& .center': {
        width: '100%',
        position: 'absolute',
        top: '45%'
      }
    }
  };

  static defaultProps = {
    children: null,
    loaded: true,
    showChildren: true,
    loadChildren: true,
    icon: <i className="fa fa-2x fa-spin fa-circle-o-notch" aria-hidden="true"></i>,
    title: null,
    text: null,
    style: null
  }

  static propTypes = {
    children: PropTypes.any,
    loaded: PropTypes.bool,
    loadChildren: PropTypes.bool,
    showChildren: PropTypes.bool,
    icon: PropTypes.element,
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    text: PropTypes.PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    style: PropTypes.object
  }

  /**
   * Return a element with the props text.
   * 
   * @returns 
   * @memberof Loader
   */
  renderText = () => {
    if (this.props.text) {
      let element;
      if (typeof this.props.text === 'string') {
        element = <p>{this.props.text}</p>;
      } else {
        element = this.props.text;
      }
      return element;
    }
  }

  /**
   * Return a element with the props title.
   * 
   * @returns 
   * @memberof Loader
   */
  renderTitle = () => {
    if (this.props.title) {
      let element;
      if (typeof this.props.title === 'string') {
        element = <h3>{this.props.title}</h3>;
      } else {
        element = this.props.title;
      }
      return element;
    }
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

  renderChildren = () => {
    return <div className={!this.props.loaded && !this.props.showChildren ? TS.style({ opacity: 0 }) : ""} >{this.props.children}</div>
  }

  render() {
    return (
      <div>
        {!this.props.loaded ?
          <div className={this.renderStyle()}>
            <div className="text-center">
              <div className="center">
                {this.renderTitle()}
                {this.renderText()}
                {this.props.icon}
              </div>
            </div>
          </div > :
          // Show children components only if loaded
          this.props.loadChildren ? null : this.renderChildren()}
        {/* Always show children components */}
        {this.props.loadChildren ? this.renderChildren() : null}
      </div>
    );
  }
}

function extendDeep(obj1, obj2) {
  for (var p in obj2) {
    try {
      // Property in destination object set; update its value.

      if (obj2[p].constructor === Object || obj2[p].constructor === Array) {
        if (obj2[p].constructor !== Array)
          obj1[p] = extendDeep(obj1[p], obj2[p]);
        else {
          let size = obj1[p].length > obj2[p].length ? obj1[p] : obj2[p];
          for (var i = 0; i < size; i++) {
            if (i < obj1[p].length) {
              if (i < obj2[p].length) {
                (obj1[p])[i] = extendDeep(obj1[p][i], obj2[p][i]);
              }
            } else {
              if (i < obj2[p].length)
                (obj1[p])[i] = extendDeep(null, obj2[p][i]);
            }
          }
        }
      } else {
        if (obj1[p] === undefined || obj1[p] === null) {
          obj1[p] = obj2[p];
        }
      }
    }
    catch (e) {
      // Property in destination object not set; create it and set its value.
      obj1[p] = obj2[p];
    }
  }

  return obj1;
}

export default Loader;